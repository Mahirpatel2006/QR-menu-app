// app/menu/[id]/page.tsx
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

const MenuPage = async ({ params }) => {
  const { id } = params;

  const client = await clientPromise;
  const db = client.db();

  // Fetch the menu data from MongoDB using the provided id
  const menuItem = await db.collection('menus').findOne({ _id: new ObjectId(id) });

  if (!menuItem) {
    return <p>Menu not found</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-4">{menuItem.name}</h1>
      
      <h2 className="text-lg font-semibold mb-2">Menu Items:</h2>

      {menuItem.categories.length > 0 ? (
        menuItem.categories.map((category) => {
          // Access items for each category
          const items = menuItem.menu[category]; // Get items under the specific category
          return (
            <div key={category} className="mb-4">
              <h3 className="text-md font-semibold">{category}</h3>
              <ul className="list-disc list-inside">
                {items && items.length > 0 ? (
                  items.map((item, index) => (
                    <li key={index} className="mb-2">
                      <span className="font-medium">{item.name}</span>: <span>${item.price}</span>
                    </li>
                  ))
                ) : (
                  <p>No items available for this category.</p>
                )}
              </ul>
            </div>
          );
        })
      ) : (
        <p>No categories available for this menu.</p>
      )}
    </div>
  );
};

export default MenuPage;
