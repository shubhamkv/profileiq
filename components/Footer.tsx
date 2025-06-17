import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-8">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-lg">
                <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                ProfileIQ
              </h3>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 max-w-md text-sm sm:text-base leading-relaxed">
              Elevate your GitHub game. Uncover insights, refine your profile,
              and grow as a developer.
            </p>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1 lg:col-span-4 lg:flex lg:justify-end">
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-cyan-400">
                Quick Links
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link
                    href="/analyze"
                    className="text-gray-400 hover:text-indigo-700 transition-colors duration-200 flex items-center text-sm sm:text-base"
                  >
                    Analyze
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-indigo-700 transition-colors duration-200 flex items-center text-sm sm:text-base"
                  >
                    Home
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-center items-center text-center sm:text-left">
            <p className="text-gray-400 text-xs font-medium sm:text-sm mb-2 sm:mb-0 px-2">
              &copy; {new Date().getFullYear()} ProfileIQ. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
