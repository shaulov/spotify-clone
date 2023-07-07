import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface BoxProps {
  children: ReactNode;
  className?: string;
}

function Box({ children, className }: BoxProps): JSX.Element {
  return (
    <div
      className={twMerge(`
        w-full h-fit
        bg-neutral-900
        rounded-lg
      `,
      className
      )}
    >
      {children}
    </div>
  );
}

export default Box;