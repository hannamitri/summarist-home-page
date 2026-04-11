import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div className={`container ${className}`.trim()}>
      <div className="row">{children}</div>
    </div>
  );
}