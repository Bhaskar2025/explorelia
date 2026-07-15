import React from 'react';

const BookNowButton = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button className="flex items-center gap-3 h-14 px-6 bg-primary text-white text-base font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform">
        <span className="material-symbols-outlined">calendar_month</span>
        <span className="truncate">Book Now</span>
      </button>
    </div>
  );
};

export default BookNowButton;
