import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function Button({
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={`btn ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}