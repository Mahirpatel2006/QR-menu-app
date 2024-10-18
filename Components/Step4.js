// Step4.tsx
'use client';

import { useState } from 'react';

const Step4 = ({ formData, updateFormData }) => {
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState(formData.categories || []);

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      updateFormData('categories', updatedCategories); // Update categories in formData
      setNewCategory('');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Step 4: Add Categories</h2>

      <input
        type="text"
        placeholder="Enter a category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
      />

      <button
        onClick={handleAddCategory}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all mb-6"
      >
        Add Category
      </button>

      {/* Display the added categories */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Added Categories:</h3>
        {categories.length > 0 ? (
          <ul className="list-disc list-inside">
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No categories added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Step4;
