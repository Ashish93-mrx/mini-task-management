import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    loading?: boolean;
}

export default function Button({ variant = "primary", loading, children, className = "", ...rest }: ButtonProps) {
    const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
    const variants: Record<string, string> = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus-visible:ring-gray-400",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-300"
    };
    return (
        <button className={`${base} ${variants[variant]} ${className} cursor-pointer`} disabled={loading || rest.disabled} {...rest}>
            {loading ? <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" /></svg> : null}
            <span>{children}</span>
        </button>
    );
}