import { forwardRef, ButtonHTMLAttributes } from "react";
import { twMerge } from 'tailwind-merge';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ 
  className, children, disabled, type = 'button', ...props
}, ref) {
  return (
    <button
      className={twMerge(`
        w-full p-3
        text-black font-bold
        bg-green-500
        border rounded-full border-transparent
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
        hover:opacity-75
      `,
      className)}
      type={type}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
})

export default Button; 