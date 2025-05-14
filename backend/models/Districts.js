import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const District = mongoose.model("District", districtSchema);
export default District;
