'use client'; // Ensure this is a Client Component

import { useState } from 'react'; // Import useState

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
      <h2 className="text-xl font-semibold mb-4">Add Menu Items</h2>

      {/* Select Category */}
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 w-full"
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
        className="border p-2 w-full mb-2"
      />
      <textarea
        value={itemDescription}
        onChange={(e) => setItemDescription(e.target.value)}
        placeholder="Item Description (Optional)"
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        value={itemPrice}
        onChange={(e) => setItemPrice(e.target.value)}
        placeholder="Price"
        className="border p-2 w-full mb-2"
      />

      <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Add Item
      </button>

      {/* Display Menu for Current Category */}
      <h3 className="text-lg font-semibold mt-6">Menu for {selectedCategory}</h3>
      <ul className="mt-4">
        {menu[selectedCategory]?.map((item, index) => (
          <li key={index} className="text-gray-700">
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
