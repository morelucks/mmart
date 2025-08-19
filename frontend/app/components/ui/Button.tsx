import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}

const buttonVariants = {
  variant: {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    link: "text-blue-600 underline-offset-4 hover:underline",
  },
  size: {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 px-3 text-xs",
    lg: "h-12 px-8 text-base",
    icon: "h-10 w-10",
  },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  className, 
  variant = "default", 
  size = "default", 
  children,
  ...props 
}, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center transition-colors font-medium disabled:pointer-events-none disabled:opacity-50 rounded-full",
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };