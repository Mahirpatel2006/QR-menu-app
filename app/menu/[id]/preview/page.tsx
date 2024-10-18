import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export default async function MenuPreview({ params }) {
  const { id } = params;
  const client = await clientPromise;
  const db = client.db();

  const menuItem = await db.collection('menus').findOne({ _id: new ObjectId(id) });

  if (!menuItem) {
    return <div>Menu not found</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">{menuItem.name}</h1>
      <p>{menuItem.address}</p>
      <h2 className="text-xl mt-4">Menu Items:</h2>
      {menuItem.categories.map((category) => (
        <div key={category}>
          <h3 className="text-lg font-semibold">{category}</h3>
          <ul>
            {menuItem.menu[category].map((item) => (
              <li key={item.name}>
                {item.name}: ${item.price} - {item.description}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Add payment button */}
      <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md">
        Proceed to Payment
      </button>
    </div>
  );
}
