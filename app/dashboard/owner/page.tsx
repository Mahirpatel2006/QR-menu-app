"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Step1 from "@/Components/Step1";
import Step2 from "@/Components/Step2";
import Step3 from "@/Components/Step3";
import Step4 from "@/Components/Step4";
import Step5 from "@/Components/Step5";
import { useRouter } from 'next/navigation';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [formData, setFormData] = useState({
    businessType: "",
    name: "",
    address: "",
    logo: null,
    categories: [],
    menu: {},
    menuId: "" // To store the menu ID after submission
  });

  const steps = 5; // Total number of steps
  const paymentAmount = 5000; // Set your payment amount in rupees
  const router = useRouter(); // Initialize router

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

  const updateFormData = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

 // Inside your MultiStepForm component

const handleSubmit = async (preview = false) => {
  if (preview) {
    setIsPreview(true); // Set preview mode
  } else {
    // Save form data to MongoDB before handling payment
    const savedMenuId = await saveMenuToDatabase();
    if (savedMenuId) {
      // Proceed to payment if the menu was saved successfully
      await handlePayment(savedMenuId); // Pass the saved menu ID
    }
  }
};

// New function to save menu data
const saveMenuToDatabase = async () => {
  try {
    const response = await fetch('/api/menus', {
      method: 'POST',
      body: JSON.stringify(formData), // Send form data
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error saving menu:", errorData);
      return null; // Indicate failure
    }

    const data = await response.json();
    console.log("Menu saved successfully:", data);
    return data.id; // Return the saved menu ID
  } catch (error) {
    console.error("Error during menu submission:", error);
    return null; // Indicate failure
  }
};

// Update the handlePayment function
const handlePayment = async (menuId) => {
  if (!razorpayLoaded) {
    console.error("Razorpay SDK not loaded.");
    return;
  }

  try {
    setLoading(true);
    const response = await fetch('/api/razorpay-order', {
      method: 'POST',
      body: JSON.stringify({ amount: paymentAmount }),
      headers: {
        'Content-Type': 'application/json',
      },
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
      handler: async function (response) {
        console.log("Payment successful:", response);
        router.push(`/menu-success/${menuId}`); // Use the saved menu ID
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        {isPreview ? "Preview Your Menu" : "Create Your Menu"}
      </h1>

      {isPreview ? (
        <div>
          <h2 className="text-xl font-semibold">Business Name: {formData.name}</h2>
          <p>Address: {formData.address}</p>
          <h3 className="text-lg font-bold mt-4">Categories:</h3>
          <ul className="list-disc ml-5">
            {formData.categories.length > 0 ? (
              formData.categories.map((category, index) => (
                <li key={index} className="mt-2">{category}</li>
              ))
            ) : (
              <p>No categories added.</p>
            )}
          </ul>
          <h3 className="text-lg font-bold mt-4">Menu Items:</h3>
          {Object.keys(formData.menu).length > 0 ? (
            <ul className="list-disc ml-5">
              {Object.entries(formData.menu).map(([category, items], index) => (
                <li key={index} className="mt-2">
                  <strong>{category}:</strong>
                  <ul className="list-disc ml-5">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="mt-1">{item.name} - ₹{item.price}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No menu items added.</p>
          )}
          <button
            className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md"
            onClick={() => setIsPreview(false)} // Allow user to go back to form
          >
            Edit Menu
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="h-2 w-full bg-gray-300 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full transition-all"
                style={{ width: `${(step / steps) * 100}%` }}
              />
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              Step {step} of {steps}
            </p>
          </div>

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
              <>
                <button
                  onClick={() => handleSubmit(true)} // Pass true for preview mode
                  className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                  Preview
                </button>
                <button
                  onClick={() => handleSubmit(false)} // Call handleSubmit for final submission and payment
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  disabled={loading || !razorpayLoaded} // Disable button if loading or Razorpay not loaded
                >
                  {loading ? 'Processing...' : 'Submit & Pay'}
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
