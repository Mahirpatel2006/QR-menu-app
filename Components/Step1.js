import React from 'react';
import { motion } from 'framer-motion';

export default function Step1({ formData, updateFormData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-bold text-[#2c3e50] mb-6">Select Your Business Type</h2>

      <div className="space-y-6">
        <label className="block relative cursor-pointer">
          <input
            type="radio"
            value="restaurant"
            checked={formData.businessType === 'restaurant'}
            onChange={(e) => updateFormData('businessType', e.target.value)}
            className="hidden peer"
          />
          <div className="block p-6 rounded-lg border-2 border-[#bdc3c7] bg-white peer-checked:bg-[#ff6f61] peer-checked:border-[#ff6f61] peer-checked:text-white text-[#2c3e50] transition-colors duration-300">
            <span className="font-semibold">Restaurant</span>
          </div>
        </label>

        <label className="block relative cursor-pointer">
          <input
            type="radio"
            value="food_stall"
            checked={formData.businessType === 'food_stall'}
            onChange={(e) => updateFormData('businessType', e.target.value)}
            className="hidden peer"
          />
          <div className="block p-6 rounded-lg border-2 border-[#bdc3c7] bg-white peer-checked:bg-[#ff6f61] peer-checked:border-[#ff6f61] peer-checked:text-white text-[#2c3e50] transition-colors duration-300">
            <span className="font-semibold">Food Stall</span>
          </div>
        </label>
      </div>
    </motion.div>
  );
}
