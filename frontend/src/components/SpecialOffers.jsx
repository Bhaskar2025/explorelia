import React from 'react';

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Rajasthan Desert Safari",
      description: "Experience the magic of the desert with our exclusive safari package.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDrIkbPxkNn1hOJYkxmZGxW-136JjAnCYf1OVbiskuYnBSSPt9RZFwYH8nzk5yYr0E-3o8CdicWMH5aNXAR7XHZOjswBtBmZBfiBUxPW1xj-E3i6H3t602eLdLmAAx-xzsRH9cLUuPt8pBbDceB7zNjTuVQCFDZmLKLIDCTMSHhQ0gruLX1vYUZBLz7mp3ZhKsMjDCASKQkJ1ASUM3whq6rghyArEZgKqoL2D6DKcDuPeZHAp1DUxBJ8ztETGpgOELdnx-YfaXSJU"
    },
    {
      id: 2,
      title: "Goa Beach Escape",
      description: "Unwind on the golden sands of Goa with our special beach getaway.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLtNRMQiSYuXskYFUZz-JO3nhLCUQBlu-vAlvO7C5zklACVp9-C-Zo6at04zCFfc1XSNrSYnSG8pVFpm5JaJ1oiKjVzfUjYuEsrtB6ZyTHoxDN_xMS0QF_OJ5xOPr9fXCIjevSWrvwJINJGOs08bYLS3WkCPdLsd-GKIOi4KpJM2_kX1PNGHgd8Lpceqf8N1d8pjD2FXXOgUqhhaXfGEqLnSrgWAtBnnEa9YnuhHPNdBjNeoWDbf86IdaAEOaU5ea4pT3daIVEME4"
    },
    {
      id: 3,
      title: "Kerala Backwater Bliss",
      description: "Cruise through serene backwaters with our discounted package.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCozs0l2Wcsb5rOpvhY2Ipf9pkw6nq8bXjt38GP5rclIN3-BUOPya0JdRoM42hsKooTZIinmOtrUVPTEdb33Vq64NuWEIPpxQ6htuizKsfjjQjeqQPNXhlLGdhhNQ9kMqMORGWAviG-yqacX7IfzywjKWjFMNnXxDEfr1tdsvlnzBz8f1c7xGHtPL3L8DkAmOyCvPiPB1hv_GaRsbm3nKW7BMgBVKVlSevpHUeJE8XckuO03dihbJovq7bnJ9kA02FiYU2Z_FjDvjY"
    }
  ];

  return (
    <div className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Special Offers</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">Exclusive deals to make your Indian adventure even more memorable.</p>
        </div>
        <div className="mt-12 flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4">
          {offers.map((offer) => (
            <div key={offer.id} className="flex-shrink-0 w-80 bg-background-light dark:bg-background-dark rounded-xl shadow-lg group">
              <img 
                src={offer.imageUrl}
                alt={offer.title}
                className="h-48 w-full rounded-t-xl object-cover"
              />
              <div className="p-4">
                <p className="font-bold text-gray-900 dark:text-white">{offer.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{offer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
