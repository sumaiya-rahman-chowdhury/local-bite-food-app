import District from "../models/Districts.js";

export const getDistricts = async (req, res) => {
  try {
    const districts = await District.find().sort({ name: 1 }); // alphabetically
    res.json(districts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch districts" });
  }
};
