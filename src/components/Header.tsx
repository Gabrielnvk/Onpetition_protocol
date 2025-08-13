import React from 'react';
import { Moon, Sun, Network, Wallet, Search, Menu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CompeteProtocol
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                Explore
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                Create
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                My Competitions
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                Analytics
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search competitions..."
                  className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white placeholder-gray-500"
                />
              </div>

              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Network className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ethereum</span>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            <button className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </button>

            <button
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;