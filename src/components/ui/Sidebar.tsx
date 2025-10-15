import { type ReactNode } from 'react';

interface SidebarProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export function Sidebar({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  size = 'sm',
}: SidebarProps) {
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
      role="tabpanel"
      aria-modal="true"
    >
      <div
        className={`fixed top-0 right-0 z-40 w-full ${sizeClasses[size]} h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-[var(--dialog-background)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-2 py-4 text-black dark:text-white">
            {title && (
              <h2 className="text-lg font-semibold text-black dark:text-white">
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
                  className="h-5 w-5 fill-current"
                />
              </button>
            )}
          </div>
        )}
        <div className="py-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
