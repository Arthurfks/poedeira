
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'whatsapp' | 'ghost';
  className?: string;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  type = 'button'
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer";
  
  const variants = {
    primary: "bg-orange-600 text-white hover:bg-orange-700 shadow-md",
    secondary: "bg-slate-900 text-white hover:bg-black shadow-md",
    outline: "border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-md",
    whatsapp: "bg-[#25D366] text-white hover:bg-[#128C7E] shadow-md",
    ghost: "bg-transparent text-slate-800 hover:bg-slate-100 border border-slate-200",
  };

  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
