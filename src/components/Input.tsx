import * as React from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputLabel?: string;
  inputLabelClassName?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ inputLabel, error, inputLabelClassName, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-3">
        {inputLabel && (
          <label
            className={twMerge(
              "font-medium text-xl text-gray-800",
              inputLabelClassName
            )}
          >
            {inputLabel}
          </label>
        )}
        <input
          className={twMerge(
            "flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <div className='text-[#f04438] pt-2 text-sm'>{error}</div>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
