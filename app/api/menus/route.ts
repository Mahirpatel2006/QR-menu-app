import { MongoClient } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  const formData = await req.json();

  try {
    const client: MongoClient = await clientPromise;
    const db = client.db();

    // Insert the form data into the 'menus' collection
    const result = await db.collection('menus').insertOne(formData);

    // Return the ID of the newly created menu
    return new Response(JSON.stringify({ id: result.insertedId }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error saving menu:', error);
    return new Response(JSON.stringify({ error: 'Failed to create menu.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
