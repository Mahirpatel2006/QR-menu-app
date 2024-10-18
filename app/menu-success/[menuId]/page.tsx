// app/menu-success/[menuId]/page.tsx
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const MenuSuccessPage = async ({ params }) => {
  const { menuId } = params; // Get menuId from URL

  // Construct the menu link
  const menuLink = `http://localhost:3000/menu/${menuId}`;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Menu Created Successfully!</h1>
      <p className="mt-4">Your menu link is:</p>
      <a href={menuLink} className="mt-2 text-blue-500 hover:underline">
        {menuLink}
      </a>
    </div>
  );
};

export default MenuSuccessPage;
