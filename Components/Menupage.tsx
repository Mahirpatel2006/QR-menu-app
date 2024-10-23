// MenuPage.tsx
'use client';

const MenuPage = ({ formData }:any) => {
  const { businessType, name, address, logo, categories, menu } = formData;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      {/* Business Header */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{name}</h1>
            <p className="text-gray-600">{address}</p>
            <p className="text-gray-500 italic">{businessType}</p>
          </div>
          {logo && (
            <div className="w-32 h-32">
              <img
                src={URL.createObjectURL(logo)} // Display the uploaded logo
                alt={`${name} Logo`}
                className="object-cover w-full h-full rounded-full shadow-md"
              />
            </div>
          )}
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-4xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Menu</h2>

        {/* Categories and Menu Items */}
        {categories.map((category:any, index:any) => (
          <div key={index} className="mb-12">
            <h3 className="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">{category}</h3>

            <ul>
              {menu[category]?.length > 0 ? (
                menu[category].map((item:any, itemIndex:any) => (
                  <li
                    key={itemIndex}
                    className="flex justify-between items-center py-4 border-b border-gray-200"
                  >
                    <div>
                      <p className="text-xl font-medium text-gray-800">{item.name}</p>
                      {item.description && (
                        <p className="text-sm text-gray-500">{item.description}</p>
                      )}
                    </div>
                    <p className="text-lg font-semibold text-gray-900">${item.price}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 italic">No items in this category yet.</p>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
     