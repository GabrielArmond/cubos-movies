import { Outlet } from 'react-router';
import { NavBar } from '../components/features/Navbar';
import { Footer } from '../components/features/Footer';

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
