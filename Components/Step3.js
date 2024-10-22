import React, { useState } from 'react';

export default function Step3({ formData, updateFormData }) {
  const [uploading, setUploading] = useState(false);

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 300 * 1024) {
      try {
        setUploading(true);
        const base64String = await convertToBase64(file);
        updateFormData('logo', base64String); // Save the base64 string instead of the file object
      } catch (error) {
        alert('Failed to upload logo.');
      } finally {
        setUploading(false);
      }
    } else {
      alert('Logo size should not exceed 300KB.');
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // base64 string
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#2c3e50] mb-6">Upload Your Logo</h2>

      <div className="mb-6">
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleLogoChange}
          disabled={uploading}
          className="block w-full text-sm text-gray-500 
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-[#ff6f61] file:text-white
          hover:file:bg-[#ff8a76] transition"
        />
        <p className="text-sm text-gray-500 mt-2">
          * Please upload a logo smaller than 300KB (PNG or JPEG)
        </p>
      </div>

      {uploading && <p>Uploading...</p>}

      {formData.logo && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-[#2c3e50] mb-2">Logo Preview:</h3>
          <img
            src={formData.logo}
            alt="Logo Preview"
            className="w-32 h-32 object-cover border border-gray-300 rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
