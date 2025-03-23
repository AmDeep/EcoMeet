import { Result } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface VenueResultsProps {
  results: Result[];
  onSelectVenue: (venueId: number) => void;
}

const VenueResults: React.FC<VenueResultsProps> = ({ results, onSelectVenue }) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium text-neutral-900 mb-4">Optimal Meeting Locations</h3>
      
      {results.map((result, index) => (
        <div 
          key={result.venueId}
          className={`${index === 0 
            ? 'border border-primary rounded-md p-4 mb-4 bg-primary/5' 
            : 'border border-neutral-300 rounded-md p-4 mb-4'}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium text-lg">{result.venue?.name}</div>
              <div className="text-neutral-600">{result.venue?.location}</div>
              
              {index === 0 && (
                <div className="mt-2 flex items-center">
                  <span className="material-icons text-primary mr-1">star</span>
                  <span className="text-primary font-medium">Best Option</span>
                  <span className="mx-2 text-neutral-400">|</span>
                  <span className="material-icons text-success text-sm mr-1">co2</span>
                  <span className="text-success">Lowest Carbon Impact</span>
                </div>
              )}
              
              <div className="mt-2 text-sm text-neutral-700">
                <div className="flex items-center">
                  <span className="material-icons text-sm mr-1">access_time</span> 
                  Avg. travel time: {result.avgTravelTime} minutes
                </div>
                <div className="flex items-center">
                  <span className="material-icons text-sm mr-1">eco</span> 
                  Carbon saved: {result.carbonSaved}kg CO₂
                </div>
                <div className="flex items-center">
                  <span className="material-icons text-sm mr-1">directions_bus</span> 
                  Public transit options: {result.transitOptions}
                </div>
              </div>
            </div>
            
            <Button
              className={`${index === 0 
                ? 'bg-secondary text-white px-3 py-1 rounded hover:bg-secondary-dark text-sm' 
                : 'border border-secondary text-secondary px-3 py-1 rounded hover:bg-secondary/10 text-sm'}`}
              onClick={() => onSelectVenue(result.venueId)}
            >
              Select
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VenueResults;
