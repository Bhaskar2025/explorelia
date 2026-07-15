import React from 'react';

const Navbar = () => {

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-gray-800 px-10 py-4">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 text-gray-900 dark:text-white">
          <div className="size-8 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_6_330)">
                <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fill-rule="evenodd"></path>
              </g>
              <defs>
                <clipPath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-black text-xl font-bold">Wanderlust India</h2>
        </div>
        <nav className="flex items-center gap-8">
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Destinations</a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Experiences</a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Plan Your Trip</a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">About Us</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"> search </span>
          <input className="w-full rounded-2xl border border-gray-200 bg-white pl-10 pr-4 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" placeholder="Search" defaultValue=""/>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center justify-center rounded-2xl h-10 px-4 bg-primary text-white text-sm font-bold transition-transform hover:scale-105">
            <span>Sign Up</span>
          </button>
          <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-bold transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
            <span>Login</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
