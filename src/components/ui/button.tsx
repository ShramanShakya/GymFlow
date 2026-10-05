import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 text-sm";

    const variantStyles = {
      default:
        "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm",
      secondary:
        "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200",
      outline:
        "border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50 shadow-sm",
      ghost: "text-zinc-700 hover:bg-zinc-100",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    }[variant];

    const sizeStyles = {
      default: "h-9 px-4 py-2",
      sm: "h-8 px-3 text-xs",
      lg: "h-10 px-6",
      icon: "h-9 w-9 p-0",
    }[size];

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles, sizeStyles, className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
