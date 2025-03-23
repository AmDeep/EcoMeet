import { Attendee, Venue, TransportOption, Result } from './types';

// Convert street address to lat/lng coordinates
// In a real app, this would call a geocoding API
export const geocodeAddress = (address: string): { lat: string, lng: string } => {
  // Simulate geocoding with random coordinates in Seattle area
  const baseSeattle = {
    lat: 47.6062,
    lng: -122.3321
  };
  
  // Add some randomness to create different but nearby points
  const randLat = (Math.random() - 0.5) * 0.05;
  const randLng = (Math.random() - 0.5) * 0.05;
  
  return {
    lat: (baseSeattle.lat + randLat).toFixed(6),
    lng: (baseSeattle.lng + randLng).toFixed(6)
  };
};

// Calculate distance between two coordinates using the Haversine formula
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance; // Distance in km
};

const toRad = (value: number): number => {
  return (value * Math.PI) / 180;
};

// Calculate walking time in minutes based on distance
export const calculateWalkingTime = (distanceKm: number): number => {
  const walkingSpeedKmPerHour = 5;
  return Math.round((distanceKm / walkingSpeedKmPerHour) * 60);
};

// Calculate biking time in minutes based on distance
export const calculateBikingTime = (distanceKm: number): number => {
  const bikingSpeedKmPerHour = 15;
  return Math.round((distanceKm / bikingSpeedKmPerHour) * 60);
};

// Generate realistic transport options between two points
export const generateTransportOptions = (
  attendee: Attendee,
  venue: Venue
): TransportOption[] => {
  if (!attendee.latitude || !attendee.longitude || !venue.latitude || !venue.longitude) {
    throw new Error('Missing coordinate data');
  }
  
  const options: TransportOption[] = [];
  const attendeeLat = parseFloat(attendee.latitude);
  const attendeeLng = parseFloat(attendee.longitude);
  const venueLat = parseFloat(venue.latitude);
  const venueLng = parseFloat(venue.longitude);
  
  // Calculate distance between attendee and venue
  const distanceKm = calculateDistance(attendeeLat, attendeeLng, venueLat, venueLng);
  const distanceMiles = distanceKm * 0.621371;
  
  // Format distance string
  const distanceStr = `${distanceMiles.toFixed(1)} miles`;
  
  // Generate walking option if distance is walkable (less than 3 km)
  if (distanceKm < 3) {
    const walkingTime = calculateWalkingTime(distanceKm);
    options.push({
      type: 'walk',
      name: 'Walking Route',
      from: attendee.location.split(',')[0],
      to: venue.location.split(',')[0],
      duration: walkingTime,
      distance: distanceStr,
      co2: '0',
      attendeeId: attendee.id,
      venueId: venue.id,
    });
  }
  
  // Generate bike option if distance is bikeable (less than 10 km)
  if (distanceKm < 10) {
    const bikingTime = calculateBikingTime(distanceKm);
    options.push({
      type: 'bike',
      name: 'Bike Share',
      from: `${attendee.location.split(',')[0]} Dock`,
      to: `${venue.location.split(',')[0]} Dock`,
      duration: bikingTime,
      distance: distanceStr,
      co2: '0',
      attendeeId: attendee.id,
      venueId: venue.id,
    });
  }
  
  // Generate bus option
  const busNumber = Math.floor(Math.random() * 99) + 1;
  const busDuration = Math.round(distanceKm * 3 + Math.random() * 10);
  const busCO2 = (distanceKm * 0.03).toFixed(1); // 30g CO2 per km per person
  
  // Calculate departure and arrival times
  const now = new Date();
  const departureTime = new Date(now.getTime() + 15 * 60000); // 15 minutes from now
  const arrivalTime = new Date(departureTime.getTime() + busDuration * 60000);
  
  options.push({
    type: 'bus',
    name: `Bus Route ${busNumber}`,
    from: attendee.location.split(',')[0],
    to: venue.location.split(',')[0],
    departureTime: departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    arrivalTime: arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    duration: busDuration,
    distance: distanceStr,
    co2: busCO2,
    attendeeId: attendee.id,
    venueId: venue.id,
  });
  
  // Generate subway/train option if distance is greater than 2 km
  if (distanceKm > 2) {
    const trainLine = Math.floor(Math.random() * 6) + 1;
    const trainDuration = Math.round(distanceKm * 2 + Math.random() * 5);
    const trainCO2 = (distanceKm * 0.02).toFixed(1); // 20g CO2 per km per person
    
    const trainDepartureTime = new Date(now.getTime() + 10 * 60000); // 10 minutes from now
    const trainArrivalTime = new Date(trainDepartureTime.getTime() + trainDuration * 60000);
    
    options.push({
      type: 'subway',
      name: `Light Rail Line ${trainLine}`,
      from: `${attendee.location.split(',')[0]} Station`,
      to: `${venue.location.split(',')[0]} Station`,
      departureTime: trainDepartureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      arrivalTime: trainArrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: trainDuration,
      distance: distanceStr,
      co2: trainCO2,
      attendeeId: attendee.id,
      venueId: venue.id,
    });
  }
  
  return options;
};

// Calculate carbon metrics for a venue
export const calculateCarbonMetrics = (
  attendees: Attendee[],
  venue: Venue,
  transportOptions: TransportOption[]
): { totalCarbon: string; carbonSaved: string; percentReduction: string } => {
  // Calculate total carbon from the transport options
  const totalCarbon = transportOptions.reduce((acc, option) => acc + parseFloat(option.co2), 0);
  
  // Estimate car carbon (assuming ~180g CO2 per km)
  let carCarbonTotal = 0;
  
  for (const attendee of attendees) {
    if (attendee.latitude && attendee.longitude && venue.latitude && venue.longitude) {
      const attendeeLat = parseFloat(attendee.latitude);
      const attendeeLng = parseFloat(attendee.longitude);
      const venueLat = parseFloat(venue.latitude);
      const venueLng = parseFloat(venue.longitude);
      
      // Calculate distance between attendee and venue
      const distanceKm = calculateDistance(attendeeLat, attendeeLng, venueLat, venueLng);
      carCarbonTotal += distanceKm * 0.18; // 180g CO2 per km
    }
  }
  
  const carbonSaved = carCarbonTotal - totalCarbon;
  const percentReduction = (carbonSaved / carCarbonTotal) * 100;
  
  return {
    totalCarbon: totalCarbon.toFixed(1),
    carbonSaved: carbonSaved.toFixed(1),
    percentReduction: percentReduction.toFixed(0),
  };
};

// Calculate best venue based on average travel time and carbon metrics
export const findBestVenue = (results: Result[]): Result | null => {
  if (results.length === 0) return null;
  
  // Sort by carbon saved (descending)
  return results.sort((a, b) => parseFloat(b.carbonSaved) - parseFloat(a.carbonSaved))[0];
};
