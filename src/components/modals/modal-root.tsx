import React, { ReactNode, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: IModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div
        className="fixed inset-0 flex items-center justify-center z-10"
        onClick={handleOverlayClick}
      >
        <div className="modal-overlay"></div>
        <div
          ref={modalRef}
          className="bg-white p-6  rounded-lg  relative max-w-2xl w-full"
        >
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
}