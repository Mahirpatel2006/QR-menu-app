'use client';

import { useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion for animations

const Step4 = ({ formData, updateFormData }) => {
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState(formData.categories || []);

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      updateFormData('categories', updatedCategories);
      setNewCategory('');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#2c3e50] mb-6">Step 4: Add Categories</h2>

      {/* Input for Category */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter a category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#ff6f61] transition"
        />
      </div>

      {/* Add Category Button */}
      <button
        onClick={handleAddCategory}
        className="w-full bg-[#ff6f61] text-white py-3 rounded-md hover:bg-[#ff8a76] transition transform hover:scale-105"
      >
        Add Category
      </button>

      {/* Display the Added Categories */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-[#2c3e50] mb-4">Added Categories:</h3>
        {categories.length > 0 ? (
          <motion.ul 
            className="grid grid-cols-1 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category, index) => (
              <motion.li 
                key={index} 
                className="bg-white shadow-md rounded-lg p-4 transition transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {category}
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <p className="text-gray-500">No categories added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Step4;
