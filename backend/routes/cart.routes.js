import express from "express";
import Cart from "../models/cart.model.js";
import { verifyToken } from "../middleares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart || { userId: req.user.id, items: [] });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch cart", details: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { _id, title, price, quantity, imageUrl } = req.body;

    if (!_id || quantity < 1) {
      return res.status(400).json({ error: "Invalid product data" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const existingItem = cart.items.find((item) => item._id.equals(_id));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ _id, title, price, quantity, imageUrl });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add item to cart", details: err.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    const itemId = req.params.id;

    if (!itemId || typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find((item) => item._id.equals(itemId));
    if (item) {
      item.quantity = quantity;
      await cart.save();
      return res.json(cart);
    }

    res.status(404).json({ error: "Item not found in cart" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update cart", details: err.message });
  }
});
router.delete("/clear-cart", verifyToken, async (req, res) => {
  try {
    console.log(req.user.id);
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    cart.items = [];
    await cart.save();
    console.log("Cart cleared successfully", cart);
    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to clear cart", details: err.message });
  }
});
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const updatedItems = cart.items.filter(
      (item) => !item._id.equals(req.params.id)
    );
    cart.items = updatedItems;
    await cart.save();

    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to remove item from cart", details: err.message });
  }
});

export default router;
