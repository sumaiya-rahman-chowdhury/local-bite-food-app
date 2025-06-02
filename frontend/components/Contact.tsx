"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const ContactUs = () => {
  const [view, setView] = useState<"send message" | "contact information">(
    "send message"
  );

  return (
    <div className="relative bg-white overflow-hidden mt-10">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#4A8B2C] mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We{`'`}d love to hear from you! Reach out with questions, feedback,
            or partnership opportunities.
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className="bg-green-100 rounded-full p-1 flex space-x-2">
            <button
              onClick={() => setView("send message")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                view === "send message"
                  ? "bg-[#4A8B2C] text-white"
                  : "text-[#4A8B2C] hover:bg-[#4A8B2C]/10"
              }`}
            >
              Send Message
            </button>
            <button
              onClick={() => setView("contact information")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                view === "contact information"
                  ? "bg-[#4A8B2C] text-white"
                  : "text-[#4A8B2C] hover:bg-[#4A8B2C]/10"
              }`}
            >
              Contact Information
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-1 gap-12 justify-center">
          {view === "send message" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <form className="space-y-6 text-black">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8B2C] focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8B2C] focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="text-green-900 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8B2C] focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="support">Support</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8B2C] focus:border-transparent"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#4A8B2C] hover:bg-[#3E7A25] text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          )}

          {view === "contact information" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <ContactInfo icon={<Mail />} title="Email">
                    <p>contact@localbite.com</p>
                    <p>support@localbite.com</p>
                  </ContactInfo>
                  <ContactInfo icon={<Phone />} title="Phone">
                    <p>+1 (555) 123-4567</p>
                    <p>Mon-Fri: 9am-5pm</p>
                  </ContactInfo>
                  <ContactInfo icon={<MapPin />} title="Address">
                    <p>123 Food Sharing Way</p>
                    <p>San Francisco, CA 94107</p>
                  </ContactInfo>
                  <ContactInfo icon={<Clock />} title="Hours">
                    <p>Monday-Friday: 9am-5pm</p>
                    <p>Saturday: 10am-2pm</p>
                    <p>Sunday: Closed</p>
                  </ContactInfo>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const ContactInfo = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-4">
    <div className="p-2 bg-[#4A8B2C]/10 rounded-full text-[#4A8B2C]">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <div className="text-gray-600">{children}</div>
    </div>
  </div>
);

export default ContactUs;
