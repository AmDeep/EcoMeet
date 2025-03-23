import { useState } from 'react';
import { Meeting, Attendee, Venue } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputPanelProps {
  meeting: Meeting;
  attendees: Attendee[];
  venues: Venue[];
  isCalculating: boolean;
  onMeetingUpdate: (meeting: Meeting) => void;
  onAddAttendee: (attendee: Attendee) => void;
  onRemoveAttendee: (id: number) => void;
  onAddVenue: (venue: Venue) => void;
  onRemoveVenue: (id: number) => void;
  onCalculateOptions: () => void;
}

const InputPanel: React.FC<InputPanelProps> = ({
  meeting,
  attendees,
  venues,
  isCalculating,
  onMeetingUpdate,
  onAddAttendee,
  onRemoveAttendee,
  onAddVenue,
  onRemoveVenue,
  onCalculateOptions
}) => {
  const [newAttendee, setNewAttendee] = useState<Partial<Attendee>>({ name: '', location: '' });
  const [newVenue, setNewVenue] = useState<Partial<Venue>>({ name: '', location: '' });

  const handleMeetingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onMeetingUpdate({ ...meeting, [name]: value });
  };

  const handleAttendeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAttendee({ ...newAttendee, [name]: value });
  };

  const handleAddAttendee = () => {
    if (newAttendee.name && newAttendee.location) {
      onAddAttendee(newAttendee as Attendee);
      setNewAttendee({ name: '', location: '' });
    }
  };

  const handleVenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVenue({ ...newVenue, [name]: value });
  };

  const handleAddVenue = () => {
    if (newVenue.name && newVenue.location) {
      onAddVenue(newVenue as Venue);
      setNewVenue({ name: '', location: '' });
    }
  };

  return (
    <div className="lg:w-1/3 p-4 border-r border-neutral-200">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-neutral-900 mb-4">Meeting Details</h3>
        
        {/* Meeting Name Form */}
        <div className="mb-4">
          <Label htmlFor="meeting-name" className="block text-sm font-medium text-neutral-700 mb-1">Meeting Name</Label>
          <Input
            type="text"
            id="meeting-name"
            name="name"
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Team Brainstorming Session"
            value={meeting.name}
            onChange={handleMeetingChange}
          />
        </div>

        {/* Date & Time Form */}
        <div className="mb-4">
          <Label htmlFor="meeting-date" className="block text-sm font-medium text-neutral-700 mb-1">Date & Time</Label>
          <div className="flex space-x-2">
            <Input
              type="date"
              id="meeting-date"
              name="date"
              className="w-1/2 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={meeting.date}
              onChange={handleMeetingChange}
            />
            <Input
              type="time"
              id="meeting-time"
              name="time"
              className="w-1/2 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={meeting.time}
              onChange={handleMeetingChange}
            />
          </div>
        </div>
      </div>

      {/* Attendees Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-neutral-900">Attendees</h3>
          <button className="text-secondary flex items-center text-sm" onClick={handleAddAttendee}>
            <span className="material-icons text-sm mr-1">add</span> Add
          </button>
        </div>

        {/* Attendee List */}
        {attendees.map((attendee) => (
          <div key={attendee.id} className="bg-neutral-100 p-3 rounded-md mb-3">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{attendee.name}</div>
                <div className="text-sm text-neutral-600">{attendee.location}</div>
              </div>
              <button 
                className="text-neutral-500 hover:text-error"
                onClick={() => attendee.id && onRemoveAttendee(attendee.id)}
              >
                <span className="material-icons text-sm">delete</span>
              </button>
            </div>
          </div>
        ))}

        {/* Add Attendee Form */}
        <div className="mt-3">
          <div className="mb-2">
            <Label htmlFor="attendee-name" className="block text-sm font-medium text-neutral-700 mb-1">Name</Label>
            <Input
              type="text"
              id="attendee-name"
              name="name"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Full Name"
              value={newAttendee.name}
              onChange={handleAttendeeChange}
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="attendee-location" className="block text-sm font-medium text-neutral-700 mb-1">Location</Label>
            <Input
              type="text"
              id="attendee-location"
              name="location"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Address, City, State"
              value={newAttendee.location}
              onChange={handleAttendeeChange}
            />
          </div>
          <Button 
            className="bg-secondary text-white px-3 py-2 rounded-md hover:bg-secondary-dark transition-colors w-full"
            onClick={handleAddAttendee}
            disabled={!newAttendee.name || !newAttendee.location}
          >
            Add Attendee
          </Button>
        </div>
      </div>

      {/* Potential Venues Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-neutral-900">Potential Venues</h3>
          <button className="text-secondary flex items-center text-sm" onClick={handleAddVenue}>
            <span className="material-icons text-sm mr-1">add</span> Add
          </button>
        </div>

        {/* Venue List */}
        {venues.map((venue) => (
          <div key={venue.id} className="bg-neutral-100 p-3 rounded-md mb-3">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{venue.name}</div>
                <div className="text-sm text-neutral-600">{venue.location}</div>
              </div>
              <button 
                className="text-neutral-500 hover:text-error"
                onClick={() => venue.id && onRemoveVenue(venue.id)}
              >
                <span className="material-icons text-sm">delete</span>
              </button>
            </div>
          </div>
        ))}

        {/* Add Venue Form */}
        <div className="mt-3">
          <div className="mb-2">
            <Label htmlFor="venue-name" className="block text-sm font-medium text-neutral-700 mb-1">Venue Name</Label>
            <Input
              type="text"
              id="venue-name"
              name="name"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Venue Name"
              value={newVenue.name}
              onChange={handleVenueChange}
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="venue-location" className="block text-sm font-medium text-neutral-700 mb-1">Location</Label>
            <Input
              type="text"
              id="venue-location"
              name="location"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Address, City, State"
              value={newVenue.location}
              onChange={handleVenueChange}
            />
          </div>
          <Button 
            className="bg-secondary text-white px-3 py-2 rounded-md hover:bg-secondary-dark transition-colors w-full"
            onClick={handleAddVenue}
            disabled={!newVenue.name || !newVenue.location}
          >
            Add Venue
          </Button>
        </div>
      </div>

      <Button 
        className="bg-primary w-full py-3 rounded-md text-white font-medium hover:bg-primary-dark transition-colors"
        onClick={onCalculateOptions}
        disabled={isCalculating || attendees.length === 0 || venues.length === 0}
      >
        {isCalculating ? 'Calculating...' : 'Calculate Best Options'}
      </Button>
    </div>
  );
};

export default InputPanel;
