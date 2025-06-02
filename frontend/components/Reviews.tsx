"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Alice Johnson",
    rating: 5,
    comment: "Absolutely delicious! The food was fresh and full of flavor.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Mark Patel",
    rating: 4,
    comment: "Great service and taste. Would definitely recommend!",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Sara Lee",
    rating: 5,
    comment: "Local Bite never disappoints. Quick delivery and tasty meals.",
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ReviewSection = () => {
  return (
    <section className="bg-white py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-[#4A8B2C] my-10 text-center"
      >
        Customer Reviews
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-xl shadow-md p-6 w-full max-w-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-12 h-12 rounded-full">
                <Image
                  fill
                  src={review.avatar}
                  alt={review.name}
                  className="object-fit-cover rounded-full"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-700">
                  {review.name}
                </h4>
                <div className="text-yellow-400">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">{review.comment}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
