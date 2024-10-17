'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Define your navigation links
  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  // Add Sign In link only if the user is not authenticated
  if (status !== 'authenticated') {
    navLinks.unshift({ name: 'Sign In', href: '/sign-in' });
  }

  return (
    <nav className="bg-green-700 text-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">Farmers Expense Tracker</h1>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className={`hidden lg:flex space-x-6`}>
            {navLinks.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                className="block mt-4 lg:mt-0 text-white hover:text-gray-300"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-green-600">
          {navLinks.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              className="block py-2 px-4 text-white hover:bg-green-500"
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              {name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
