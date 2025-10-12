import { Footer } from '../features/Footer';
import { NavBar } from '../features/Navbar';
import { Outlet } from 'react-router';

export const DefaultLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavBar />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
