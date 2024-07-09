import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = "button", disabled, className, children, ...props }, ref) => {
    return (
      <button
        type={type}
        ref={ref}
        disabled={disabled}
        className={cn(
          "w-auto rounded-full bg-black border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-white text-sm font-semibold hover:opacity-75 transition",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
