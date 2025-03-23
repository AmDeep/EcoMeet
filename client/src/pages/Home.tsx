import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InputPanel from '@/components/InputPanel';
import ResultsPanel from '@/components/ResultsPanel';
import { Meeting, Attendee, Venue, Result } from '@/lib/types';
import { initialMeeting, initialAttendees, initialVenues, generateInitialResults } from '@/lib/mockData';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const { toast } = useToast();
  const [meeting, setMeeting] = useState<Meeting>(initialMeeting);
  const [attendees, setAttendees] = useState<Attendee[]>(initialAttendees);
  const [venues, setVenues] = useState<Venue[]>(initialVenues);
  const [results, setResults] = useState<Result[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('plan');

  // Handle meeting details update
  const handleMeetingUpdate = (updatedMeeting: Meeting) => {
    setMeeting(updatedMeeting);
  };

  // Handle adding an attendee
  const handleAddAttendee = (attendee: Attendee) => {
    // Generate coordinates if they're not provided
    if (!attendee.latitude || !attendee.longitude) {
      const coords = { lat: '', lng: '' }; // In real app, use geocode service
      attendee.latitude = coords.lat;
      attendee.longitude = coords.lng;
    }
    
    setAttendees([...attendees, { ...attendee, id: attendees.length + 1 }]);
  };

  // Handle removing an attendee
  const handleRemoveAttendee = (id: number) => {
    setAttendees(attendees.filter(a => a.id !== id));
  };

  // Handle adding a venue
  const handleAddVenue = (venue: Venue) => {
    // Generate coordinates if they're not provided
    if (!venue.latitude || !venue.longitude) {
      const coords = { lat: '', lng: '' }; // In real app, use geocode service
      venue.latitude = coords.lat;
      venue.longitude = coords.lng;
    }
    
    setVenues([...venues, { ...venue, id: venues.length + 1 }]);
  };

  // Handle removing a venue
  const handleRemoveVenue = (id: number) => {
    setVenues(venues.filter(v => v.id !== id));
  };

  // Handle calculating best options
  const handleCalculateOptions = async () => {
    if (attendees.length === 0) {
      toast({
        title: "No attendees",
        description: "Please add at least one attendee.",
        variant: "destructive"
      });
      return;
    }

    if (venues.length === 0) {
      toast({
        title: "No venues",
        description: "Please add at least one potential venue.",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    
    try {
      // In a full implementation, we'd call the API
      // const response = await apiRequest('POST', '/api/calculate', { meetingId: meeting.id });
      // const data = await response.json();
      
      // For now, use our mock data generator
      const calculatedResults = generateInitialResults();
      
      setTimeout(() => {
        setResults(calculatedResults);
        setShowResults(true);
        setIsCalculating(false);
      }, 1000); // Simulate API delay
    } catch (error) {
      console.error(error);
      toast({
        title: "Calculation failed",
        description: (error as Error).message,
        variant: "destructive"
      });
      setIsCalculating(false);
    }
  };

  // Handle selecting a venue from results
  const handleSelectVenue = (venueId: number) => {
    setResults(
      results.map(result => ({
        ...result,
        selected: result.venueId === venueId
      }))
    );
  };

  // Handle sharing results
  const handleShareResults = () => {
    // In a real app, implement sharing functionality
    toast({
      title: "Sharing results",
      description: "This feature is not implemented in this demo",
    });
  };

  // Handle saving plan
  const handleSavePlan = () => {
    // In a real app, implement save functionality
    toast({
      title: "Plan saved",
      description: "Your sustainable meeting plan has been saved",
    });
  };

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Page Title */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-neutral-900">Plan Your Sustainable Gathering</h2>
          <p className="text-neutral-600 mt-2">Find the optimal meeting spot with eco-friendly transportation options</p>
        </div>

        {/* App Container with Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-neutral-200">
            <nav className="flex">
              <button 
                className={`px-6 py-3 ${activeTab === 'plan' ? 'border-b-2 border-primary text-primary font-medium' : 'text-neutral-600 hover:text-neutral-900'}`}
                onClick={() => setActiveTab('plan')}
              >
                Plan New Meeting
              </button>
              <button 
                className={`px-6 py-3 ${activeTab === 'past' ? 'border-b-2 border-primary text-primary font-medium' : 'text-neutral-600 hover:text-neutral-900'}`}
                onClick={() => setActiveTab('past')}
              >
                Past Meetings
              </button>
              <button 
                className={`px-6 py-3 ${activeTab === 'saved' ? 'border-b-2 border-primary text-primary font-medium' : 'text-neutral-600 hover:text-neutral-900'}`}
                onClick={() => setActiveTab('saved')}
              >
                Saved Locations
              </button>
            </nav>
          </div>

          <div className="lg:flex">
            <InputPanel 
              meeting={meeting}
              attendees={attendees}
              venues={venues}
              isCalculating={isCalculating}
              onMeetingUpdate={handleMeetingUpdate}
              onAddAttendee={handleAddAttendee}
              onRemoveAttendee={handleRemoveAttendee}
              onAddVenue={handleAddVenue}
              onRemoveVenue={handleRemoveVenue}
              onCalculateOptions={handleCalculateOptions}
            />
            
            {showResults && (
              <ResultsPanel 
                results={results} 
                attendees={attendees}
                onSelectVenue={handleSelectVenue}
                onShareResults={handleShareResults}
                onSavePlan={handleSavePlan}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
