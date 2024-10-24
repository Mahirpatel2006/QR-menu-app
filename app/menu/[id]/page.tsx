import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

const MenuPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const client = await clientPromise;
  const db = client.db();

  // Fetch the menu data from MongoDB using the provided id
  const menuItem = await db.collection('menus').findOne({ _id: new ObjectId(id) });

  if (!menuItem) {
    return <p>Menu not found</p>;
  }

  // Access the fields with the correct key names
  const restaurantName = menuItem?.name || 'Unknown Restaurant';
  const restaurantAddress = menuItem?.address || 'Address not available';
  const restaurantLogo = menuItem?.logo || '/path-to-default-logo.jpg';

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-red-100 to-yellow-100">
      <div className="container mx-auto px-4 lg:px-10 py-8">
        {/* Top section with banner and logo */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden relative mb-8">
          <img 
            src="/BANNER.png" // Placeholder, update with actual banner image path
            alt="Banner Image" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-t from-black opacity-50"></div>
          <div className="absolute top-14 left-0 w-full h-64 flex flex-col items-center justify-center">
            {/* Restaurant Logo */}
            <img 
              src={restaurantLogo} 
              alt="Restaurant Logo" 
              className="h-20 rounded-full border-4 border-white shadow-lg"
            />
            {/* Restaurant Name */}
            <h1 className="text-3xl text-white font-bold mt-2">{restaurantName}</h1>
          </div>
        </div>
        {/* Menu Categories and Items */}
        <div className="lg:flex gap-8">
          {/* Left Side - Categories */}
          <div className="lg:w-1/4 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">Menu Categories</h2>
            <ul className="flex overflow-x-auto space-x-4 lg:flex-col lg:space-x-0 lg:space-y-4 pb-2">
              {menuItem.categories.length ? (
                menuItem.categories.map((category: string, index: number) => (
                  <li key={index} className="flex-shrink-0 lg:flex-grow">
                    <a 
                      href={`#${category.replace(/\s+/g, '-').toLowerCase()}`} 
                      className="block p-2 border rounded bg-gradient-to-r from-orange-400 to-red-400 text-white whitespace-nowrap shadow hover:shadow-md transition-shadow"
                    >
                      {category}
                    </a>
                  </li>
                ))
              ) : (
                <p>No categories available.</p>
              )}
            </ul>
          </div>

          {/* Right Side - Menu Items */}
          <div className="lg:w-3/4 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">Our Menu</h2>
            
            {/* Display each category */}
            {menuItem.categories.length ? (
              menuItem.categories.map((category: string) => {
                const items = menuItem.menu[category] || [];

                return (
                  <div key={category} className="mb-8">
                    <h3 
                      id={category.replace(/\s+/g, '-').toLowerCase()} 
                      className="text-2xl font-semibold text-orange-500 mb-4 border-b-2 pb-2 border-dashed border-orange-300"
                    >
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                      {items.length > 0 ? (
                        items.map((item: { name: string; description?: string; price: number }, idx: number) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-r from-white to-orange-50 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full"
                          >
                            <h4 className="text-lg font-bold text-red-600 mb-2">{item.name}</h4>
                            <p className="text-gray-600 text-sm mb-4">
                              {item.description || 'Delicious food description here.'}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-green-600 font-bold">₹{item.price}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No items available for this category.</p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No menu categories available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
