import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

const buttonVariants = cva(
  'inline-flex items-center justify-center disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-[#7C3AED] disabled:opacity-50 text-white',
        secondary: 'text-[#7C3AED] border-[1.5px] border-solid border-primary hover:border-[#B03A26] hover:text-[#B03A26] disabled:opacity-20'
        ,
        text: 'text-primary border-none  hover:text-[#B03A26 disabled:opacity-20'
        ,
      },
      size: {
        sm: 'h-[52px] lg:w-[190px] md:w-[150px] w-[100px] rounded-[12px] text-sm lg:text-lg',
        md: 'h-[52px] lg:w-[400px] md:w-[250px] w-[150px] rounded-[12px]',
        lg: 'h-[52px] w-[610px] rounded-[12px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  }
)

//this gives the button component all html attributes like onClick etc
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  isLoading?: boolean,
  icon?: React.ReactNode,
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, isLoading, icon, size, ...props }, ref) => {
    return (
      <button
        className={twMerge(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}>
        {isLoading ? <FaSpinner className='mr-2 h-4 w-4 animate-spin' /> : icon}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
