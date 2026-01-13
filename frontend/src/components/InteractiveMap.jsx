import React from 'react';
import MapComponent from './MapComponent';

const InteractiveMap = () => {
  return (
    //<div className="py-16">
          <section id="map" className="mb-12 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">map</span>
              India Map
            </h2>
            <div className="w-full aspect-video flex justify-center items-center">
              <MapComponent 
                latitude='28.7041'
                longitude='77.1025'
                locationName='Delhi'
              />
            </div>
          </section>
   // </div>
  );
};

export default InteractiveMap;
