import React from 'react';

const Categories = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <a className="flex flex-col items-center gap-2 pb-3 pt-2 px-6 border-b-2 border-primary text-primary" href="#">
            <span className="material-symbols-outlined !text-3xl fill"> account_balance </span>
            <p className="text-sm font-bold">Heritage</p>
          </a>
          <a className="flex flex-col items-center gap-2 pb-3 pt-2 px-6 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:border-primary/50 transition-all" href="#">
            <span className="material-symbols-outlined !text-3xl"> kitesurfing </span>
            <p className="text-sm font-bold">Adventure</p>
          </a>
          <a className="flex flex-col items-center gap-2 pb-3 pt-2 px-6 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:border-primary/50 transition-all" href="#">
            <span className="material-symbols-outlined !text-3xl"> self_improvement </span>
            <p className="text-sm font-bold">Spiritual</p>
          </a>
          <a className="flex flex-col items-center gap-2 pb-3 pt-2 px-6 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:border-primary/50 transition-all" href="#">
            <span className="material-symbols-outlined !text-3xl"> beach_access </span>
            <p className="text-sm font-bold">Beach</p>
          </a>
          <a className="flex flex-col items-center gap-2 pb-3 pt-2 px-6 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:border-primary/50 transition-all" href="#">
            <span className="material-symbols-outlined !text-3xl"> landscape </span>
            <p className="text-sm font-bold">Mountain</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Categories;
