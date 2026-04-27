'use client';

type ButtonVariant =
  | "primary"
  | "cancel"
  | "delete";

type ButtonSize = "sm" | "md" | "lg";

type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  size?: ButtonSize;
  type?: ButtonType;
}


const defaultButton: Record<ButtonVariant, boolean> = {
  primary: false,
  cancel: false,
  delete: false,
};

const sizeStyle: Record<ButtonSize, string> = {
  sm: "px-4 py-[8.5px] text-lg-16-semibold",
  md: "px-16 py-[20px] md:px-[90px] md:py-[19px] text-2lg-18-semibold",
  lg: "px-[140px] py-[19px]  md:px-[236px] md:py-[20px] text-2lg-18-semibold",
}

const baseStyle = "rounded-[180px] hover:cursor-pointer text-white";

const variantStyle: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 hover:bg-brand-600 disabled:bg-brand-800 disabled:text-brand-950 disabled:cursor-not-allowed",
  cancel: "bg-gray-900 hover:bg-black-200 disabled:bg-gray-900 disabled:text-gray-500 disabled:cursor-not-allowed",
  delete: "bg-red-500 hover:bg-red-500/70",
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {

  const isDisabled = disabled ?? defaultButton[variant];

  return (
    <button
      type={type}
      className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}