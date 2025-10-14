import { useRef } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export function Dialog({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  showCloseButton = true,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/20 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={dialogRef}
        className={`
          relative w-full ${sizeClasses[size]} max-h-[90vh] 
          bg-[var(--dialog-background)] dark:bg-[var(--dialog-background)] 
          rounded-lg shadow-xl 
          transform transition-all duration-200 ease-out
          animate-in fade-in-0 zoom-in-95
        `}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                aria-label="Fechar dialog"
              >
                <img
                  src="/src/assets/icons/close_round.svg"
                  alt="Fechar"
                  className="h-5 w-5 dark:brightness-0 dark:invert"
                />
              </button>
            )}
          </div>
        )}

        <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
