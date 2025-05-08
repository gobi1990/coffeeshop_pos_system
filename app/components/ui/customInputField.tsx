import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const CustomInputField  = ({ label, ...props } : CustomInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium font-semibold text-gray-700">{label}</label>
      <input
        {...props}
        className="mt-1 block p-3 h-10 w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
      />
    </div>
  );
};

interface CustomTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
  }
  
  export const CustomTextarea = ({ label, ...props } : CustomTextareaProps) => {
    return (
      <div>
        <label className="block text-sm font-medium font-semibold text-gray-700">{label}</label>
        <textarea
          {...props}
          className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
        />
      </div>
    );
  };