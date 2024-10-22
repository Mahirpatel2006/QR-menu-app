'use client';

import { useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion for animations

export default function Step5({ formData, updateFormData }) {
  const [selectedCategory, setSelectedCategory] = useState(formData.categories[0] || '');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [menu, setMenu] = useState(formData.menu || {});

  const addItem = () => {
    if (!selectedCategory || !itemName || !itemPrice) return;

    const newItem = {
      name: itemName,
      description: itemDescription,
      price: itemPrice,
    };

    const updatedMenu = {
      ...menu,
      [selectedCategory]: [...(menu[selectedCategory] || []), newItem],
    };

    setMenu(updatedMenu);
    updateFormData('menu', updatedMenu);

    // Clear inputs
    setItemName('');
    setItemDescription('');
    setItemPrice('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#2c3e50] mb-6">Add Menu Items</h2>

      {/* Select Category */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-[#2c3e50] mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#ff6f61] transition"
        >
          {formData.categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Add Item Details */}
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Item Name"
        className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#ff6f61] transition"
      />
      <textarea
        value={itemDescription}
        onChange={(e) => setItemDescription(e.target.value)}
        placeholder="Item Description (Optional)"
        className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#ff6f61] transition"
      />
      <input
        type="number"
        value={itemPrice}
        onChange={(e) => setItemPrice(e.target.value)}
        placeholder="Price"
        className="border border-gray-300 rounded-md p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-[#ff6f61] transition"
      />

      <button 
        onClick={addItem} 
        className="w-full bg-[#ff6f61] text-white py-3 rounded-md hover:bg-[#ff8a76] transition transform hover:scale-105"
      >
        Add Item
      </button>

      {/* Display Menu for Current Category */}
      <h3 className="text-xl font-bold text-[#2c3e50] mt-8">Menu for {selectedCategory}</h3>
      
      <motion.ul
        className="mt-4 grid grid-cols-1 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {menu[selectedCategory]?.map((item, index) => (
          <motion.li 
            key={index} 
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center transition transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div>
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-600">{item.description || 'No description'}</p>
            </div>
            <span className="text-lg font-semibold text-[#ff6f61]">₹{item.price}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
