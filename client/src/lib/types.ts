// Core data types used in the frontend
export interface Attendee {
  id?: number;
  name: string;
  location: string;
  latitude?: string;
  longitude?: string;
  meetingId?: number;
}

export interface Venue {
  id?: number;
  name: string;
  location: string;
  latitude?: string;
  longitude?: string;
  meetingId?: number;
}

export interface Meeting {
  id?: number;
  name: string;
  date: string;
  time: string;
  userId?: number;
}

export interface TransportOption {
  id?: number;
  type: 'subway' | 'bus' | 'bike' | 'walk'; // Corresponds to Material Icon names
  name: string;
  from: string;
  to: string;
  departureTime?: string;
  arrivalTime?: string;
  duration: number; // in minutes
  distance?: string;
  co2: string;
  attendeeId?: number;
  venueId?: number;
}

export interface Result {
  id?: number;
  meetingId?: number;
  venueId: number;
  venue?: Venue;
  totalCarbon: string;
  carbonSaved: string;
  percentReduction: string;
  avgTravelTime: number;
  transitOptions: number;
  transportOptions?: TransportOption[];
}

// Extended types for UI
export interface TabOption {
  id: string;
  label: string;
}

export interface ResultsTabOption extends TabOption {
  component: React.FC<any>;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MapMarker {
  id: string;
  position: LatLng;
  type: 'attendee' | 'venue' | 'optimal';
  label?: string;
}

export interface MapRoute {
  id: string;
  from: LatLng;
  to: LatLng;
  type: 'transit' | 'bike' | 'walk';
}
