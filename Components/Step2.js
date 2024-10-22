import React from 'react';

export default function Step2({ formData, updateFormData }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#2c3e50] mb-6">Enter Your Business Details</h2>
      
      <div className="mb-6">
        <label className="block text-lg font-semibold text-[#2c3e50] mb-2">Business Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#ff6f61] transition"
          placeholder="Enter business name"
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold text-[#2c3e50] mb-2">Business Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => updateFormData('address', e.target.value)}
          className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#ff6f61] transition"
          placeholder="Enter business address"
        />
      </div>
    </div>
  );
}
