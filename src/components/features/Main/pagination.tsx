import { useEffect, useState } from 'react';
import { Button } from '../../ui/Button';

interface Props {
  onPageChange: (page: number) => void;
  totalPages?: number;
}

export const Pagination = ({ totalPages, onPageChange }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const getVisiblePages = () => {
    if (!totalPages) return [];

    const maxVisible = isMobile ? 2 : 5;
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis =
    totalPages &&
    visiblePages &&
    visiblePages.length > 0 &&
    visiblePages[0] > 2;
  const showFirstPage =
    totalPages &&
    visiblePages &&
    visiblePages.length > 0 &&
    visiblePages[0] > 1;
  const showEndEllipsis =
    totalPages &&
    visiblePages &&
    visiblePages.length > 0 &&
    visiblePages[visiblePages.length - 1] < totalPages - 1;
  const showLastPage =
    totalPages &&
    visiblePages &&
    visiblePages.length > 0 &&
    visiblePages[visiblePages.length - 1] < totalPages;

  if (!totalPages || !visiblePages || visiblePages.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mt-4 gap-1 md:gap-2">
      <Button
        variant={currentPage === 1 ? 'disabled' : 'primary'}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        size="sm"
      >
        <img
          src="/src/assets/icons/expand_left.svg"
          alt="Página anterior"
          className="h-5 w-5 dark:brightness-0 dark:invert"
        />
      </Button>

      {showFirstPage && (
        <Button
          variant={currentPage === 1 ? 'disabled' : 'primary'}
          onClick={() => handlePageChange(1)}
          size="sm"
          className="text-base font-bold lg:font-normal"
        >
          1
        </Button>
      )}

      {showStartEllipsis && (
        <Button
          variant="secondary"
          onClick={() => handlePageChange(Math.max(1, currentPage - 3))}
          size="sm"
        >
          ...
        </Button>
      )}

      {visiblePages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'disabled' : 'primary'}
          onClick={() => handlePageChange(page)}
          size="sm"
          className="text-base font-bold lg:font-normal"
        >
          {page}
        </Button>
      ))}

      {showEndEllipsis && (
        <Button
          variant="secondary"
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 3))
          }
          size="sm"
        >
          ...
        </Button>
      )}

      {showLastPage && (
        <Button
          variant={currentPage === totalPages ? 'disabled' : 'primary'}
          onClick={() => handlePageChange(totalPages!)}
          size="sm"
        >
          {totalPages}
        </Button>
      )}

      <Button
        variant={currentPage === totalPages ? 'disabled' : 'primary'}
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        size="sm"
      >
        <img
          src="/src/assets/icons/expand_right.svg"
          alt="Próxima página"
          className="h-5 w-5 dark:brightness-0 dark:invert"
        />
      </Button>
    </div>
  );
};
