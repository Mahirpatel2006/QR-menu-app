import React from 'react';

export default function Step2({ formData, updateFormData }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Enter Your Business Details</h2>
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          className="border border-gray-300 p-2 w-full"
          placeholder="Enter business name"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => updateFormData('address', e.target.value)}
          className="border border-gray-300 p-2 w-full"
          placeholder="Enter business address"
        />
      </div>
    </div>
  );
}
