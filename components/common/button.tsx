'use client';

type ButtonVariant =
  | "primary"
  | "cancel"
  | "delete";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  size?: ButtonSize;
}

const defaultButton: Record<ButtonVariant, boolean> = {
  primary: false,
  cancel: false,
  delete: false,
};

const sizeStyle: Record<ButtonSize, string> = {
  sm: "px-4 py-[8.5px] text-lg-16-semibold",
  md: "px-14 py-[15px] md:px-[114px] md:py-[19px] text-2lg-18-semibold",
  lg: "px-[140px] py-[19px]  md:px-[236px] md:py-[20px] text-2lg-18-semibold",
}

const baseStyle = "rounded-[180px]";

const variantStyle: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 disabled:bg-brand-800 disabled:text-brand-950 disabled:cursor-not-allowed",
  cancel: "bg-gray-900 text-white hover:bg-black-200 disabled:bg-gray-900 disabled:text-gray-500 disabled:cursor-not-allowed",
  delete: "bg-red-500 text-white",
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled,
  onClick,
  className = "",
}: ButtonProps) {

  const isDisabled = disabled ?? defaultButton[variant];

  return (
    <button
      className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}