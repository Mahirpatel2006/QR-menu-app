// "use clint"
"use client"
import { useState } from 'react';
import { Formik, Form } from 'formik';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <Formik
      initialValues={{
        businessType: '',
        businessName: '',
        address: '',
        logo: null,
        category: [],
      }}
      onSubmit={(values) => {
        // console.log('Form Submitted', values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {renderStepContent()}

          <div className="mt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="mr-4 bg-gray-300 px-4 py-2 rounded"
              >
                Back
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
