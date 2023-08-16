'use client';

import * as RadixSlider from '@radix-ui/react-slider';
import { twMerge } from 'tailwind-merge';

interface SliderProps {
  className?: string;
  value?: number;
  onChange?: (value: number) => void;
}

function Slider({ className, value = 1, onChange }: SliderProps) {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  }
  return (
    <RadixSlider.Root
      className={twMerge(`
        relative
        flex items-center
        w-full h-10
        select-none touch-none
      `, className)}
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track 
        className="
          relative grow
          h-[3px]
          bg-neutral-600
          rounded-full
        "
      >
        <RadixSlider.Range 
          className="
            absolute
            h-full
            bg-white
            rounded-full
          " 
        />
      </RadixSlider.Track>
      <RadixSlider.Thumb aria-label="Volume" />
    </RadixSlider.Root>
  );
}

export default Slider