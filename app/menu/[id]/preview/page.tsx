"use client";

import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

interface Params {
  params: { id: string };
}

export default async function MenuPreview({ params }: Params) {
  const { id } = params;

  try {
    // Connect to the database
    const client = await clientPromise;
    const db = client.db();

    // Fetch the menu item
    const menuItem = await db.collection("menus").findOne({ _id: new ObjectId(id) });

    // Handle menu not found
    if (!menuItem) {
      return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold text-red-500">Menu not found</h1>
        </div>
      );
    }

    return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">{menuItem.name}</h1>
        <p>{menuItem.address}</p>

        <h2 className="text-xl mt-4">Menu Items:</h2>
        {menuItem.categories.map((category: string) => (
          <div key={category}>
            <h3 className="text-lg font-semibold">{category}</h3>
            <ul className="list-disc pl-5">
              {menuItem.menu[category].map((item: { name: string; price: number; description: string }) => (
                <li key={item.name}>
                  {item.name}: ₹{item.price} - {item.description}
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
  } catch (error) {
    console.error("Error fetching menu:", error);
    return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-red-500">Error fetching menu data</h1>
      </div>
    );
  }
}
