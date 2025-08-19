import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseClasses = "btn";
  const variantClasses = {
    default: "btn-primary",
    outline: "btn-secondary",
    ghost: "bg-transparent border-none hover:bg-gray-100",
  };
  
  const sizeClasses = {
    default: "",
    sm: "text-sm px-3 py-1.5",
    lg: "text-lg px-8 py-3",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };