"use client";
import { motion, Variants } from "framer-motion";

interface image {
  id: string;
  url: string;
  alt: string;
}
interface images {
  images: image[];
}

function Banner({ images }: images) {
  // Properly typed animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingCircle: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.1,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const // Explicitly typed as allowed value
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="relative min-h-[500px] bg-[url('https://res.cloudinary.com/ddwb8h3lt/image/upload/v1746985200/local-bite-assets/y5hkp3f4vigtaqlwisvv.jpg')] border border-gray-200 overflow-hidden shadow-sm bg-center bg-cover"
    >
      {/* Dark Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-black"
      />

      {/* Floating Food Elements */}
      <motion.div
        variants={floatingCircle}
        className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF8C42] rounded-full"
      />
      <motion.div
        variants={floatingCircle}
        transition={{ delay: 0.3 }}
        className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#4A8B2C] rounded-full"
      />

      {/* Content Container */}
      <div className="relative z-10 p-8 md:p-12">
        <motion.div variants={container} className="max-w-2xl mx-auto text-center">
          {/* Tagline */}
          <motion.h1 
            variants={item}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Share Food. Build Community.
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={item}
            className="text-lg text-white mb-8 max-w-lg mx-auto"
          >
            Join thousands helping reduce food waste while connecting with neighbors
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#4A8B2C] hover:bg-[#3E7A25] text-white font-medium py-3 px-8 rounded-full transition-colors shadow-md"
            >
              Post Your Surplus
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/90 hover:bg-white text-[#4A8B2C] font-medium py-3 px-8 rounded-full transition-colors"
            >
              How It Works
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats in Cards */}
        <motion.div 
          variants={container}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {[
            { value: "1,200+", label: "Meals Shared" },
            { value: "500+", label: "Active Members" },
            { value: "3 Tons", label: "Food Saved" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white p-4 rounded-lg border border-gray-100 shadow-xs text-center"
            >
              <p className="text-2xl font-bold text-[#FF8C42]">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated Gradient Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#4A8B2C] to-[#FF8C42] origin-left"
      />
    </motion.div>
  );
}

export default Banner;