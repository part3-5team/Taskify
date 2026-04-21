'use client';

type InputState = "default" | "completed" | "error";

type ChildrenPosition = "left" | "right";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  state?: InputState;
  childrenPosition?: ChildrenPosition;
  errorMessage?: string;
}

const wrapperStyle = "flex flex-col gap-1";
const inputWrapperStyle = "relative flex items-center text-white";

const stateStyle = {
  default: "bg-black-400 border-gray-700",

  completed: "bg-black-400 border-blue-200",

  error: "bg-black-400 border-red-500",
};

const disabledStyle = "bg-gray-900";
const inputStyle = "w-full rounded-[14px] border px-5 py-1.5 gap-2";

export default function Input({
  state = "default",
  children,
  childrenPosition = "right",
  errorMessage,
  disabled,
  className = "",
  ...props
}: InputProps) {
  const paddingStyle = children
    ? childrenPosition === "left"
      ? "pl-12 pr-5"
      : "pl-5 pr-12"
    : "px-5";

  return (
    <div className={`${wrapperStyle}`}>
      <div className={`${inputWrapperStyle}`}>
        <input
          className={`
            ${inputStyle}
            ${paddingStyle}
            ${stateStyle[state]}
            ${disabled ? disabledStyle : ""}
            ${className}
          `}
          disabled={disabled}
          {...props}
        />

        {children && (
          <div className={`
            absolute right-4 flex items-center
            ${childrenPosition === "left" ? "left-4" : "right-4"}
          `}>
            {children}
          </div>
        )}
      </div>

      {state === "error" && errorMessage && (
        <p className="pl-1 text-red-500 text-md-14-medium-150%">{errorMessage}</p>
      )}
    </div>
  )
}