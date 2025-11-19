import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { token, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? 'text-indigo-600 font-semibold' : 'text-gray-700';

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b">
      <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">
        My Blog
      </Link>
      <div className="space-x-4 text-sm font-medium">
        <Link to="/" className={isActive('/') + ' hover:text-indigo-600'}>
          Home
        </Link>
        {token ? (
          <>
            <Link to="/create" className={isActive('/create') + ' hover:text-indigo-600'}>
              Create
            </Link>
            <button onClick={logout} className="text-red-500 hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={isActive('/login') + ' hover:text-indigo-600'}>
              Login
            </Link>
            <Link to="/register" className={isActive('/register') + ' hover:text-indigo-600'}>
              Register
            </Link>
          </>
        )}
        <button onClick={toggleDarkMode} className="text-gray-500 hover:text-indigo-600">
          🌙
        </button>
      </div>
    </nav>
  );
};

export default Navbar;