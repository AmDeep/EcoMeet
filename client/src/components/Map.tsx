import { useEffect, useRef } from 'react';
import { Attendee, Venue } from '@/lib/types';

interface MapProps {
  attendees: Attendee[];
  venues: Venue[];
  bestVenueId?: number;
}

const Map: React.FC<MapProps> = ({ attendees, venues, bestVenueId }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // This is where we would initialize the map with Leaflet in a real implementation
    // For this demo, we'll just show the map container with styling
    
    // In a real implementation, we would:
    // 1. Initialize Leaflet map
    // 2. Add markers for attendees with blue markers
    // 3. Add markers for venues with gray markers
    // 4. Highlight the best venue with a green marker
    // 5. Draw routes between attendees and the best venue
    
  }, [attendees, venues, bestVenueId]);

  return (
    <div className="relative">
      {/* Map container - in a real implementation, this would be a Leaflet map */}
      <div 
        ref={mapRef} 
        className="map-container relative"
        style={{ 
          height: '400px',
          backgroundImage: 'url("https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 bg-white rounded-md shadow-md p-2">
          <button className="p-1 bg-neutral-100 rounded hover:bg-neutral-200">
            <span className="material-icons">add</span>
          </button>
          <button className="p-1 bg-neutral-100 rounded hover:bg-neutral-200 mt-1">
            <span className="material-icons">remove</span>
          </button>
        </div>

        {/* Map Legend */}
        <div className="absolute top-4 left-4 bg-white rounded-md shadow-md p-3">
          <div className="flex items-center space-x-2 text-sm">
            <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
            <span>Attendee</span>
          </div>
          <div className="flex items-center space-x-2 text-sm mt-1">
            <span className="inline-block h-3 w-3 rounded-full bg-primary"></span>
            <span>Optimal Venue</span>
          </div>
          <div className="flex items-center space-x-2 text-sm mt-1">
            <span className="inline-block h-3 w-3 rounded-full bg-neutral-400"></span>
            <span>Potential Venue</span>
          </div>
          <div className="flex items-center space-x-2 text-sm mt-1">
            <span className="inline-block h-1 w-6 bg-secondary rounded-full"></span>
            <span>Transit Route</span>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default Map;
