import React from 'react';

const Destinations = () => {
  const destinations = [
    {
      id: 1,
      title: "Golden Triangle Tour",
      description: "Explore the iconic cities of Delhi, Agra, and Jaipur.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6nVLV8QsysM_o9FHgccV9fVm_PvYgRtfh3lOhK3gyqGXDlneptKf0hlOPNzeRoXtNQ2IN2LaiBFKz-z4kD4g3eILC7ikC2-JR-AnWox1MpdTwKdPbkLW_1mJHBNnSWIjfnwM2UtecSFCqvj_akNW8WdWay0OpOENgT_qbuI2lNmk0JUwj1fvkT0VtdDE19frxWNEMWpRditAoxy5TSP72CKxCUCvWMP7iO5c8sPd87KXCdri7ugZbTzofaGdjFeXHFyDbNY3biqI",
      buttonText: "View Tour"
    },
    {
      id: 2,
      title: "Himalayan Trekking Expedition",
      description: "Challenge yourself with breathtaking treks through the majestic Himalayas.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbjDCJrlCouSd5n7TpIDJIzJcKt3xzUUQSfiKvZkKJYxR081sY-WDUL4gnQyAjKp_nDitMu_Zbt0shwF02pZ6BRRI7L7g2i_hoPKVZFFhvZV-pP8jYsXhww8pjoBlxcd3R8ibDqNexyOVJTFWCJJWZIil12Qz7kmyFJx-Uy-xAUP7U7AYGWH3O17qJvfMzLEi9b1YdQ55g1nSt0eTO9kln8P8Fl7JFvlAxgpE-ge6kKkoecYeOITZ8l1qnYHYRoRloTqDziSFHhQc",
      buttonText: "Explore Treks"
    },
    {
      id: 3,
      title: "Spiritual Retreat in Rishikesh",
      description: "Find inner peace and rejuvenation in the yoga capital of the world.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCChZvx5dZBh4RINnn0kLYsirbGoWO6Xw_TY-U6593KemItR5kdD041kSICAYj78FVK39DFCy_G_oI1OhkSgXU_86Le3QAY8Cr7qcTfjUn6VN6CX02Sh6oNTIfLT6ZF7WuYCm5SAtstr0WZ7r8MYLV1dTuKFueMW9qWgkZbwub14G5uLzHBkdI7naJCjwSdEzsuUi5AxMj2pw7MIN-eM5xVA3PexmG5qLdn4C0l6t36NY4stcKHThiZDyxqhxKxaZnJb3zfoYP6zr8",
      buttonText: "Discover Retreats"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((destination) => (
          <div key={destination.id} className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group">
            <div className="overflow-hidden">
              <div 
                className="w-full h-56 bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url("${destination.image}")` }}
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{destination.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{destination.description}</p>
              </div>
              <button className="mt-4 self-start bg-primary/10 dark:bg-primary/20 text-primary font-bold py-2 px-4 rounded-lg text-sm hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                {destination.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
