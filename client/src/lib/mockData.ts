import { Attendee, Venue, TransportOption, Meeting, Result } from './types';
import { geocodeAddress, generateTransportOptions, calculateCarbonMetrics } from './algorithm';

// Initial meeting data
export const initialMeeting: Meeting = {
  name: 'Team Brainstorming Session',
  date: new Date().toISOString().split('T')[0], // Today's date
  time: '14:00',
};

// Initial attendees data
export const initialAttendees: Attendee[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    location: '123 Main St, Seattle, WA',
    latitude: '47.6102',
    longitude: '-122.3426',
  },
  {
    id: 2,
    name: 'Sam Wilson',
    location: '456 Pine Ave, Seattle, WA',
    latitude: '47.6159',
    longitude: '-122.3307',
  },
  {
    id: 3,
    name: 'Taylor Garcia',
    location: '789 Oak Blvd, Seattle, WA',
    latitude: '47.6205',
    longitude: '-122.3493',
  },
];

// Initial venues data
export const initialVenues: Venue[] = [
  {
    id: 1,
    name: 'Downtown Cafe',
    location: '500 Pike St, Seattle, WA',
    latitude: '47.6098',
    longitude: '-122.3371',
  },
  {
    id: 2,
    name: 'Green Space Coworking',
    location: '350 Broadway, Seattle, WA',
    latitude: '47.6228',
    longitude: '-122.3219',
  },
];

// Generate initial transport options
export const generateInitialTransportOptions = (): TransportOption[] => {
  let allOptions: TransportOption[] = [];
  
  initialVenues.forEach(venue => {
    initialAttendees.forEach(attendee => {
      const options = generateTransportOptions(attendee, venue);
      allOptions = [...allOptions, ...options];
    });
  });
  
  return allOptions;
};

// Generate initial results
export const generateInitialResults = (): Result[] => {
  return initialVenues.map(venue => {
    const venueTransportOptions = generateInitialTransportOptions().filter(
      option => option.venueId === venue.id
    );
    
    const { totalCarbon, carbonSaved, percentReduction } = calculateCarbonMetrics(
      initialAttendees,
      venue,
      venueTransportOptions
    );
    
    // Calculate average travel time
    const avgTravelTime = Math.round(
      venueTransportOptions.reduce((acc, opt) => acc + opt.duration, 0) / venueTransportOptions.length
    );
    
    return {
      id: venue.id,
      venueId: venue.id,
      venue,
      totalCarbon,
      carbonSaved,
      percentReduction,
      avgTravelTime,
      transitOptions: venueTransportOptions.length,
      transportOptions: venueTransportOptions,
    };
  }).sort((a, b) => parseFloat(b.carbonSaved) - parseFloat(a.carbonSaved));
};
