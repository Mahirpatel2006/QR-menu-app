"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Step1 from "@/Components/Step1";
import Step2 from "@/Components/Step2";
import Step3 from "@/Components/Step3";
import Step4 from "@/Components/Step4";
import Step5 from "@/Components/Step5";
import { useRouter } from "next/navigation";

// Define a type for menu items
interface MenuItem {
  name: string;
  price: number;
  description: string;
}

interface FormData {
  businessType: string;
  name: string;
  address: string;
  logo: File | null;
  categories: string[];
  menu: MenuItem[]; // Use an array of MenuItem instead of an empty object
  menuId: string;
}

// Razorpay Response Interface
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    businessType: "",
    name: "",
    address: "",
    logo: null,
    categories: [],
    menu: [], // Initialize as an empty array
    menuId: "",
  });

  const steps = 5;
  const paymentAmount = 5000;
  const router = useRouter();

  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      document.body.appendChild(script);
    };

    loadRazorpay();
  }, []);

  const handleNextStep = () => setStep((prevStep) => prevStep + 1);
  const handlePreviousStep = () => setStep((prevStep) => prevStep - 1);

  const updateFormData = (field: keyof FormData, value: string | File | string[] | MenuItem[] | null) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const savedMenuId = await saveMenuToDatabase();
    if (savedMenuId) {
      await handlePayment(savedMenuId);
    }
  };

  const saveMenuToDatabase = async () => {
    try {
      const response = await fetch("/api/menus", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error saving menu:", errorData);
        return null;
      }

      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error("Error during menu submission:", error);
      return null;
    }
  };

  const handlePayment = async (menuId: string) => {
    if (!razorpayLoaded) {
      console.error("Razorpay SDK not loaded.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/razorpay-order", {
        method: "POST",
        body: JSON.stringify({ amount: paymentAmount }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating Razorpay order:", errorData);
        return;
      }

      const data = await response.json();
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Your Company Name",
        description: "Purchase Description",
        order_id: data.id,
        handler: async function (response: RazorpayResponse) {
          console.log("Payment successful:", response);
          router.push(`/menu-success/${menuId}`);
        },
        prefill: {
          name: "Your Name",
          email: "your-email@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Your Address",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment processing error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#f0f4f8]">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <svg
          className="absolute -top-20 -left-20 opacity-20"
          width="500"
          height="500"
          viewBox="0 0 500 500"
        >
          <circle cx="250" cy="350" r="250" fill="#ff6f61" />
        </svg>
        <svg
          className="absolute bottom-0 right-0 opacity-20"
          width="400"
          height="400"
          viewBox="0 0 400 400"
        >
          <rect width="400" height="400" fill="#2c3e50" />
        </svg>
      </div>

      {/* Form Container */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold text-center mb-6">Create Your Menu</h1>

          {/* Circular Progress Bar */}
          <div className="mb-4 flex items-center justify-center">
            <div className="relative">
              <svg className="w-16 h-16">
                <circle
                  className="text-gray-300"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="28"
                  cx="32"
                  cy="32"
                />
                <motion.circle
                  className="text-blue-500"
                  strokeWidth="4"
                  strokeDasharray="176"
                  strokeDashoffset={176 - (step / steps) * 176}
                  stroke="currentColor"
                  fill="transparent"
                  r="28"
                  cx="32"
                  cy="32"
                  initial={{ strokeDashoffset: 176 }}
                  animate={{ strokeDashoffset: 176 - (step / steps) * 176 }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-600">
                  {step}/{steps}
                </span>
              </div>
            </div>
          </div>

          {/* Step Forms */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {step === 1 && <Step1 formData={formData} updateFormData={updateFormData} />}
            {step === 2 && <Step2 formData={formData} updateFormData={updateFormData} />}
            {step === 3 && <Step3 formData={formData} updateFormData={updateFormData} />}
            {step === 4 && <Step4 formData={formData} updateFormData={updateFormData} />}
            {step === 5 && <Step5 formData={formData} updateFormData={updateFormData} />}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button
                onClick={handlePreviousStep}
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
              >
                Back
              </button>
            )}
            {step < steps && (
              <button
                onClick={handleNextStep}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Next
              </button>
            )}
            {step === steps && (
              <button
              onClick={() => handleSubmit()}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              disabled={!razorpayLoaded || loading} // Disable the button when loading
            >
              {loading ? "Processing..." : "Submit & Pay"}
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
