import React from 'react';

export default function Step3({ formData, updateFormData }) {
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 300 * 1024) {
      updateFormData('logo', file);
    } else {
      alert('Logo size should not exceed 300KB.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload Your Logo</h2>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleLogoChange}
        className="mb-4"
      />
      {formData.logo && (
        <img
          src={URL.createObjectURL(formData.logo)}
          alt="Logo Preview"
          className="w-32 h-32 object-cover mt-4"
        />
      )}
    </div>
  );
}
