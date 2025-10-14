import { useState } from 'react';

export function useSidebar() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const openSidebar = () => setIsOpenSidebar(true);
  const closeSidebar = () => setIsOpenSidebar(false);

  return {
    isOpenSidebar,
    openSidebar,
    closeSidebar,
  };
}
