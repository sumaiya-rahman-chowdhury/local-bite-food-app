import express from "express";
import Stripe from "stripe";
import Food from "../models/food.model.js";
import { verifyToken } from "../middleares/verifyToken.js";
import bodyParser from "body-parser";
import { sendEmail } from "../utils/email.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const router = express.Router();

router.post("/create-checkout-session", verifyToken, async (req, res) => {
  const { cartItems } = req.body;

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: "bdt",
      product_data: {
        name: item.title,
        images: [item.imageUrl],
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/payment-success`,
    cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    billing_address_collection: "auto",
    phone_number_collection: {
      enabled: true,
    },
    customer_email: req.user.email,
  });

  res.json({ url: session.url });
});

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✅ Customer Email:", session.customer_email);
      try {
        await sendEmail({
          to: session.customer_email || "fallback@example.com",
          subject: "🎉 Payment Successful - Local Bite",
          text: "Thank you for your order!",
          html: `
            <h2>Thanks for ordering with Local Bite!</h2>
            <p>Your payment was successful. Here are your details:</p>
            <ul>
              <li><strong>Amount:</strong> ${(
                session.amount_total / 100
              ).toFixed(2)} BDT</li>
              <li><strong>Order ID:</strong> ${session.id}</li>
            </ul>
            <p>We'll process your order shortly. 🍽️</p>
          `,
        });
        console.log("✅ Confirmation email sent");
      } catch (emailError) {
        console.error(" Failed to send email:", emailError);
      }
    }

    res.status(200).json({ received: true });
  }
);

router.post("/mark-paid", async (req, res) => {
  const { foodId } = req.body;
  await FoodModel.findByIdAndUpdate(foodId, { status: "paid" });
  res.json({ message: "Marked as paid" });
});

export default router;
