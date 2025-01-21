"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

interface Params {
  menuId: string;
}

interface MenuData {
  name: string;
  logo: string;
  items: string[]; // Define items explicitly if included
}

const MenuSuccessPage = ({ params }: { params: Params }) => {
  const { menuId } = params;
  const menuLink = `http://localhost:3000/menu/${menuId}`; // Update for production
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // Fetch menu data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/menus/${menuId}`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data: MenuData = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Error fetching menu data.");
      }
    };

    fetchData();
  }, [menuId]);

  // Track window size for Confetti
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const link = document.createElement("a");
      link.download = "menu-qr-code.png";
      link.href = pngUrl;
      link.click();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden">
      {/* Confetti Effect */}
      {windowSize.width > 0 && (
        <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={300} recycle={false} />
      )}

      {/* Background Decorative Shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <svg className="absolute -top-40 -left-40 opacity-20" width="700" height="700" viewBox="0 0 700 700">
          <circle cx="350" cy="350" r="350" fill="#ff6f61" />
        </svg>
        <svg className="absolute bottom-0 right-0 opacity-20" width="500" height="500" viewBox="0 0 500 500">
          <rect width="500" height="500" fill="#2c3e50" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg w-full text-center bg-white p-10 rounded-2xl shadow-lg">
        <motion.h1 
          className="text-3xl font-bold text-[#2c3e50]"
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          Menu Created Successfully!
        </motion.h1>
        <motion.p 
          className="mt-4 text-lg text-gray-600"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your menu link is:
        </motion.p>
        <motion.a
          href={menuLink}
          className="mt-2 text-blue-500 hover:underline inline-block"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {menuLink}
        </motion.a>

        {/* QR Code Section */}
        <motion.div 
          className="mt-8 flex flex-col items-center"
          ref={canvasRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <QRCodeCanvas value={menuLink} size={256} className="shadow-lg rounded-lg" />
          <motion.button
            onClick={handleDownload}
            className="mt-6 bg-[#ff6f61] text-white py-3 px-6 rounded-md hover:bg-[#ff8a76] transition transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            Download QR Code
          </motion.button>
        </motion.div>

        {/* Display menu data or error message */}
        {error ? (
          <motion.div 
            className="mt-4 text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        ) : (
          menuData && (
            <motion.div 
              className="mt-6 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h2 className="text-lg font-semibold text-[#2c3e50]">Menu Details</h2>
              <p className="mt-1 text-gray-600">Items: {menuData.items.join(", ")}</p>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default MenuSuccessPage;
