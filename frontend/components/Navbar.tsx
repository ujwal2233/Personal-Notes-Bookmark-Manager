'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FiBookmark, FiFileText, FiLogOut, FiUser } from 'react-icons/fi';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path;

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/notes" className="text-xl font-bold text-primary-600">
              Notes & Bookmarks
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link
                href="/notes"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/notes')
                    ? 'border-primary-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiFileText className="mr-2" />
                Notes
              </Link>
              <Link
                href="/bookmarks"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/bookmarks')
                    ? 'border-primary-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiBookmark className="mr-2" />
                Bookmarks
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <FiUser className="mr-2" />
              {user.email}
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <FiLogOut className="mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
      {/* Mobile navigation */}
      <div className="sm:hidden border-t border-gray-100">
        <div className="flex justify-around py-2">
          <Link
            href="/notes"
            className={`flex flex-col items-center px-3 py-2 text-xs font-medium ${
              isActive('/notes') ? 'text-primary-600' : 'text-gray-500'
            }`}
          >
            <FiFileText className="text-lg mb-1" />
            Notes
          </Link>
          <Link
            href="/bookmarks"
            className={`flex flex-col items-center px-3 py-2 text-xs font-medium ${
              isActive('/bookmarks') ? 'text-primary-600' : 'text-gray-500'
            }`}
          >
            <FiBookmark className="text-lg mb-1" />
            Bookmarks
          </Link>
        </div>
      </div>
    </nav>
  );
}
