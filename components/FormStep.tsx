
import React from 'react';

interface FormStepProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  stepNumber: number;
}

const FormStep: React.FC<FormStepProps> = ({ title, icon, children, stepNumber }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-100 text-emerald-800 w-10 h-10 rounded-full flex items-center justify-center font-bold">
          {stepNumber}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600">{icon}</span>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
};

export default FormStep;
