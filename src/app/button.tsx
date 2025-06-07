import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "amber";
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "cursor-pointer px-4 py-2 rounded-md transition-colors duration-300 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400",
    secondary:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400",
    amber: "bg-amber-100 text-amber-700 hover:bg-amber-200",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
