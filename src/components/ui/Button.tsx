import  { ButtonHTMLAttributes } from 'react';
import React from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

  variant?: 'primary' | 'secondary' | 'outline';      size?: 'sm' | 'md' | 'lg';

  children: React.ReactNode;
}


export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) => {


const baseStylesAllButtonsDesain = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variantStyle = {

    primary: 'border border-[var(--brand)] bg-[var(--brand)] text-white shadow-sm hover:border-[var(--brand-hover)] hover:bg-[var(--brand-hover)]',
    secondary: 'border border-black bg-black text-white hover:border-gray-800 hover:bg-gray-800',
    outline: 'border border-gray-300 bg-white text-black hover:border-gray-400 hover:bg-gray-50'
  };

  const sizes = {

    sm: 'min-h-[38px] px-4 py-2 text-xs',
    md: 'min-h-[48px] px-6 py-3 text-sm',
    lg: 'min-h-[52px] px-8 py-4 text-base'
  };



return (

        <button
        
          className={`${baseStylesAllButtonsDesain} ${variantStyle[variant]} ${sizes[size]} ${className}`}
          {...props}
        >

            {children}

        </button>

);

};


