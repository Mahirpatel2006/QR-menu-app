import React from 'react';

export default function Step1({ formData, updateFormData }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Your Business Type</h2>
      <div className="space-y-4">
        <label className="block">
          <input
            type="radio"
            value="restaurant"
            checked={formData.businessType === 'restaurant'}
            onChange={(e) => updateFormData('businessType', e.target.value)}
          />
          Restaurant
        </label>
        <label className="block">
          <input
            type="radio"
            value="food_stall"
            checked={formData.businessType === 'food_stall'}
            onChange={(e) => updateFormData('businessType', e.target.value)}
          />
          Food Stall
        </label>
      </div>
    </div>
  );
}
