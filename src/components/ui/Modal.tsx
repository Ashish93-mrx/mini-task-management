import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}

export default function Modal({ onClose, children, ariaLabel = "Dialog" }: ModalProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40" role="dialog" aria-label={ariaLabel}>
      <div className="max-w-lg w-full mx-4">
        {children}
      </div>
    </div>
  );
}
