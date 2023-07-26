import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  type,
  disabled,
  ...props
}, ref) => {
  return (
    <input 
      className={twMerge(`
        flex
        w-full p-3
        text-sm
        bg-neutral-700
        border border-transparent rounded-md
        file:text-sm file:font-medium
        file:bg-transparent
        file:border-0
        placeholder:text-neutral-400
        disabled:opacity-50
        disabled:cursor-not-allowed
      `, className)}
      type={type}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;