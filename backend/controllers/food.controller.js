import Food from "../models/food.model.js";

export const createFoodPost = async (req, res) => {
  try {
    const { imageUrl, quantity, type, title, description, price } = req.body;
    console.log(
      imageUrl,
      quantity,
      type,
      title,
      description,
      price,
      req.user.id
    );
    const newPost = await Food.create({
      imageUrl,
      quantity,
      type,
      title,
      description,
      price,
      postedBy: req.user.id,
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error creating food post:", err);
    res.status(500).json({ message: "Could not create food post" });
  }
};
export const getFoodPost = async (req, res) => {
  try {
    const { type, postedBy, search, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (type) {
      filter.type = type;
    }
    if (postedBy) {
      filter.postedBy = postedBy;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const foodPosts = await Food.find(filter)
      .populate("postedBy", "name email avatarUrl")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    const total = await Food.countDocuments(filter);

    res.status(200).json({
      foodPosts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch food posts" });
  }
};
export const getFoodDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const details = await Food.findById(id).populate("postedBy", "name email");
    if (!details) {
      return res.status(404).json({ message: "Food post not found" });
    }
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch food posts" });
  }
};
