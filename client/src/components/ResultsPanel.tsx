import { useState } from 'react';
import { Attendee, Result } from '@/lib/types';
import Map from './Map';
import VenueResults from './VenueResults';
import TransportOptions from './TransportOptions';
import CarbonImpactSummary from './CarbonImpactSummary';

interface ResultsPanelProps {
  results: Result[];
  attendees: Attendee[];
  onSelectVenue: (venueId: number) => void;
  onShareResults: () => void;
  onSavePlan: () => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  results,
  attendees,
  onSelectVenue,
  onShareResults,
  onSavePlan
}) => {
  const [activeTab, setActiveTab] = useState('results');
  
  // Find the best result (first one, which is sorted by carbon saved)
  const bestResult = results.length > 0 ? results[0] : null;
  
  // For display in carbon impact summary
  const carbonSaved = bestResult?.carbonSaved || '0';
  const percentReduction = bestResult?.percentReduction || '0';

  return (
    <div className="lg:w-2/3">
      {/* Map */}
      <Map 
        attendees={attendees} 
        venues={results.map(r => r.venue!)}
        bestVenueId={bestResult?.venueId}
      />

      {/* Results Tabs */}
      <div className="border-b border-neutral-200">
        <nav className="flex">
          <button 
            className={`px-6 py-3 ${activeTab === 'results' ? 'border-b-2 border-primary text-primary font-medium' : 'text-neutral-600 hover:text-neutral-900'}`}
            onClick={() => setActiveTab('results')}
          >
            Results
          </button>
          <button 
            className={`px-6 py-3 ${activeTab === 'routes' ? 'border-b-2 border-primary text-primary font-medium' : 'text-neutral-600 hover:text-neutral-900'}`}
            onClick={() => setActiveTab('routes')}
          >
            Routes
          </button>
          <button 
            className={`px-6 py-3 ${activeTab === 'carbon' ? 'border-b-2 border-primary text-primary font-medium' : 'text-neutral-600 hover:text-neutral-900'}`}
            onClick={() => setActiveTab('carbon')}
          >
            Carbon Impact
          </button>
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'results' && (
        <VenueResults 
          results={results} 
          onSelectVenue={onSelectVenue}
        />
      )}

      {activeTab === 'routes' && (
        <TransportOptions 
          transportOptions={bestResult?.transportOptions || []}
        />
      )}

      {activeTab === 'carbon' && (
        <div className="p-4">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Carbon Impact Analysis</h3>
          <div className="bg-white p-4 rounded-lg border border-neutral-200">
            <p className="mb-4">This meeting planning reduces your group's carbon footprint by:</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center bg-green-50 p-3 rounded-lg">
                <div className="text-4xl font-bold text-success">{carbonSaved}kg</div>
                <div className="text-neutral-600">CO₂ Saved</div>
              </div>
              <div className="text-center bg-green-50 p-3 rounded-lg">
                <div className="text-4xl font-bold text-success">{percentReduction}%</div>
                <div className="text-neutral-600">Reduction</div>
              </div>
            </div>
            <p className="text-sm text-neutral-700">
              This is equivalent to planting approximately {Math.round(parseFloat(carbonSaved) * 0.05)} trees. By choosing public transportation and optimal meeting locations, your team is making a significant positive environmental impact.
            </p>
          </div>
        </div>
      )}

      {/* Carbon Impact Summary - always visible */}
      <CarbonImpactSummary 
        carbonSaved={carbonSaved}
        percentReduction={percentReduction}
        onShareResults={onShareResults}
        onSavePlan={onSavePlan}
      />
    </div>
  );
};

export default ResultsPanel;
