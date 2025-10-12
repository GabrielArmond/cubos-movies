import { useEffect, useState } from 'react';
import { Button } from '../../ui/Button';

interface Props {
  totalPages: number;
  onPageChange: (page: number) => void;
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

  const getVisiblePages = () => {
    if (!isMobile) {
      const half = Math.floor(5 / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + 4);

      if (end - start + 1 < 5) {
        start = Math.max(1, end - 4);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = 1;
    let end = Math.min(3, totalPages - 2);

    if (currentPage <= 3) {
      start = 1;
      end = 3;
    } else if (currentPage >= totalPages - 3) {
      start = Math.max(1, totalPages - 3);
      end = totalPages - 1;
    } else {
      start = currentPage - 1;
      end = currentPage + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const showEndEllipsis =
    isMobile &&
    visiblePages[visiblePages.length - 1] < totalPages - 1 &&
    currentPage < totalPages - 3;
  const showLastPage =
    isMobile && visiblePages[visiblePages.length - 1] < totalPages;

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);

  return (
    <div className="flex items-center justify-center mt-4 gap-1 md:gap-2">
      <Button
        variant={currentPage === 1 ? 'secondary' : 'primary'}
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        size="sm"
      >
        <img
          src="/src/assets/icons/expand_left.svg"
          alt="Anterior"
          className="h-5 w-5 dark:brightness-0 dark:invert"
        />
      </Button>

      {visiblePages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'secondary' : 'primary'}
          onClick={() => setCurrentPage(page)}
          size="sm"
          className="text-base font-bold lg:font-normal"
        >
          {page}
        </Button>
      ))}

      {showEndEllipsis && (
        <Button
          variant="secondary"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 3))}
          size="sm"
        >
          ...
        </Button>
      )}

      {showLastPage && (
        <Button
          variant={currentPage === totalPages ? 'secondary' : 'primary'}
          onClick={() => setCurrentPage(totalPages)}
          size="sm"
        >
          {totalPages}
        </Button>
      )}

      <Button
        variant={currentPage === totalPages ? 'secondary' : 'primary'}
        onClick={() =>
          currentPage < totalPages && setCurrentPage(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        size="sm"
      >
        <img
          src="/src/assets/icons/expand_right.svg"
          alt="Próxima"
          className="h-5 w-5 dark:brightness-0 dark:invert"
        />
      </Button>
    </div>
  );
};
