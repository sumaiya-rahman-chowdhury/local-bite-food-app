import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    type: {
      type: String,
      enum: ["paid", "donation"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: function () {
        return this.type === "paid";
      },
      min: 0,
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);
export default Food;
