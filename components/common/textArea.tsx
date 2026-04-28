'use client';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const baseStyle = "w-full h-[120px] md:h-[160px] rounded-[14px] border px-5 py-5 text-lg-16px-medium-160% outline-none resize-none overflow-y-auto";

const defaultStyle = "bg-black-400 border-gray-700 text-white focus:border-blue-200";

const disabledStyle = "bg-gray-900 text-gray-400 cursor-not-allowed";

export default function TextArea({
  disabled,
  className = "",
  placeholder,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      className={`
        ${baseStyle}
        ${defaultStyle}  
        ${disabled ? disabledStyle : ""}
        ${className}
      `}
      placeholder={placeholder}
      disabled={disabled}
      {...props}
    />
  )
}