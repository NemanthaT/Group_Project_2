import React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn("form-input", className)}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };