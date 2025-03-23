import { TransportOption } from '@/lib/types';

interface TransportOptionsProps {
  transportOptions: TransportOption[];
}

const TransportOptions: React.FC<TransportOptionsProps> = ({ transportOptions }) => {
  return (
    <div className="p-4 border-t border-neutral-200">
      <h3 className="text-lg font-medium text-neutral-900 mb-4">Sustainable Transport Options</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {transportOptions.map((option, index) => (
          <div key={index} className="border border-neutral-300 rounded-md p-3">
            <div className="flex items-center">
              <span className="material-icons text-secondary mr-2">{`directions_${option.type}`}</span>
              <div>
                <div className="font-medium">{option.name}</div>
                <div className="text-sm text-neutral-600">{option.from} → {option.to}</div>
              </div>
            </div>
            
            <div className="mt-2 text-sm">
              {(option.departureTime && option.arrivalTime) ? (
                <div className="flex justify-between mb-1">
                  <span>Departure: {option.departureTime}</span>
                  <span>Arrival: {option.arrivalTime}</span>
                </div>
              ) : (
                <div className="flex justify-between mb-1">
                  <span>Estimated time: {option.duration} min</span>
                  <span>Distance: {option.distance}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-success flex items-center">
                  <span className="material-icons text-sm mr-1">eco</span> {option.co2}kg CO₂
                </span>
                
                {option.type === 'bike' && (
                  <span>Bike availability: 6</span>
                )}
                
                {option.type === 'walk' && (
                  <span>Walkability: High</span>
                )}
                
                {(option.type === 'subway' || option.type === 'bus') && (
                  <span>{option.duration} min journey</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportOptions;
