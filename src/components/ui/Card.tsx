import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  subtle?: boolean;
}

export default function Card({ children, className = "", subtle = false, ...rest }: CardProps) {
  return (
    <div
      className={`rounded-lg p-3 ${subtle ? "bg-gray-50 shadow-sm" : "bg-white shadow-md"} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
