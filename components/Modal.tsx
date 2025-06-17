import React from 'react';
import XMarkIcon from './icons/XMarkIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 p-6 rounded-lg shadow-xl max-w-2xl w-full text-slate-200 relative transform transition-all duration-300 ease-in-out scale-95 animate-modalShow"
        onClick={(e) => e.stopPropagation()} // Prevent click inside from closing modal
      >
        <style>{`
          @keyframes modalShow {
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-sky-400">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-sky-400 transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto pr-2 text-slate-300">
         {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
