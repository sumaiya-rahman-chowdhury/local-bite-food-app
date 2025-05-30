import Food from "../models/food.model.js";
import FoodRequest from "../models/food.request.model.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/email.js";

export const handleFoodRequest = async (req, res) => {
  try {
    const { foodId } = req.body;
    const requesterId = req.user.id;
    const food = await Food.findById(foodId).populate("postedBy");
    const requester = await User.findById(requesterId).select("-password");

    if (!food || !food.postedBy || !requester) {
      return res.status(404).json({ message: "Invalid request" });
    }
    const request = await FoodRequest.create({
      food: foodId,
      requester: requester._id,
    });
    await sendEmail({
      to: food.postedBy.email,
      subject: "New Food Request!",
      text: `Hello ${food.postedBy.name || "Donor"},
      
${requester.name} has requested your food item: "${food.title}".

Contact them at:
Email: ${requester.email}
Phone: ${requester.phone || "N/A"}

Please coordinate pickup at your convenience.

- Local Bite`,
    });
    return res.status(200).json({
      message: "Request sent and email delivered to donor.",
      request: { food, requester },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const acceptReq = async (req, res) => {
  const { requestId } = req.body;
  const request = await FoodRequest.findById(requestId)
    .populate("requester", "-password")
    .populate({
      path: "food",
      populate: {
        path: "postedBy",
        select: "name phone email",
      },
    });

  if (!request) return res.status(404).json({ message: "Request not found" });

  request.status = "accepted";
  await request.save();

  sendEmail({
    to: request.requester.email,
    subject: "Your Food Request was Accepted",
    text: `Hi ${request.requester.name},\n\nYour request for "${request.food.title}" was accepted! Please contact the donor:\n\nName: ${request.food.postedBy.name}\nPhone: ${request.food.postedBy.phone}\n\nto arrange pickup.`,
  });

  res.status(200).json({ message: "Request accepted" }, request);
};
export const getAllReq = async (req, res) => {
  try {
    const userId = req.user.id;
    const userPosts = await Food.find({ postedBy: userId });
    const foodIds = userPosts.map((post) => post._id);
    const allRequests = await FoodRequest.find({
      food: { $in: foodIds },
      status: "pending",
    })
      .populate("food")
      .populate("requester", "-password");
    res.status(200).json({
      posts: userPosts,
      requests: allRequests,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Try Again" });
  }
};
