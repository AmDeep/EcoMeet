import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Meeting APIs
  app.post('/api/meetings', async (req, res) => {
    try {
      const meeting = await storage.createMeeting(req.body);
      res.json(meeting);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  app.get('/api/meetings/:id', async (req, res) => {
    try {
      const meeting = await storage.getMeeting(parseInt(req.params.id));
      if (!meeting) {
        return res.status(404).json({ message: 'Meeting not found' });
      }
      res.json(meeting);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  // Attendee APIs
  app.post('/api/attendees', async (req, res) => {
    try {
      const attendee = await storage.createAttendee(req.body);
      res.json(attendee);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  app.get('/api/meetings/:id/attendees', async (req, res) => {
    try {
      const attendees = await storage.getAttendeesByMeetingId(parseInt(req.params.id));
      res.json(attendees);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  app.delete('/api/attendees/:id', async (req, res) => {
    try {
      await storage.deleteAttendee(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  // Venue APIs
  app.post('/api/venues', async (req, res) => {
    try {
      const venue = await storage.createVenue(req.body);
      res.json(venue);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  app.get('/api/meetings/:id/venues', async (req, res) => {
    try {
      const venues = await storage.getVenuesByMeetingId(parseInt(req.params.id));
      res.json(venues);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  app.delete('/api/venues/:id', async (req, res) => {
    try {
      await storage.deleteVenue(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  // Calculate best options
  app.post('/api/calculate', async (req, res) => {
    try {
      const { meetingId } = req.body;
      
      // Get all attendees and venues for this meeting
      const attendees = await storage.getAttendeesByMeetingId(meetingId);
      const venues = await storage.getVenuesByMeetingId(meetingId);

      if (attendees.length === 0) {
        return res.status(400).json({ message: 'No attendees found for this meeting' });
      }

      if (venues.length === 0) {
        return res.status(400).json({ message: 'No venues found for this meeting' });
      }

      // Calculate for each venue
      const results = [];
      for (const venue of venues) {
        // Generate transport options for each attendee to this venue
        const transportOptions = [];
        for (const attendee of attendees) {
          // In a real app, we would call external transit APIs
          // For now, generate some realistic-looking data
          const options = await storage.generateTransportOptions(attendee, venue);
          transportOptions.push(...options);
        }

        // Calculate statistics
        const avgTravelTime = Math.round(transportOptions.reduce((acc, opt) => acc + opt.duration, 0) / transportOptions.length);
        const carbonTotal = transportOptions.reduce((acc, opt) => acc + parseFloat(opt.co2), 0).toFixed(1);
        
        // Assume car CO2 would be higher by a factor
        const carCO2 = (attendees.length * 0.9).toFixed(1); // kg CO2 per person by car
        const carbonSaved = (parseFloat(carCO2) - parseFloat(carbonTotal)).toFixed(1);
        const percentReduction = Math.round((parseFloat(carbonSaved) / parseFloat(carCO2)) * 100);
        
        const result = await storage.createResult({
          meetingId,
          venueId: venue.id,
          totalCarbon: carbonTotal,
          carbonSaved,
          percentReduction: percentReduction.toString(),
          avgTravelTime,
          transitOptions: transportOptions.length
        });

        results.push({
          ...result,
          venue,
          transportOptions: transportOptions.filter(option => option.venueId === venue.id)
        });
      }

      // Sort results by carbon saved (descending)
      results.sort((a, b) => parseFloat(b.carbonSaved) - parseFloat(a.carbonSaved));
      
      res.json(results);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  app.get('/api/meetings/:id/results', async (req, res) => {
    try {
      const meetingId = parseInt(req.params.id);
      const results = await storage.getResultsByMeetingId(meetingId);
      
      // Enrich results with venue data
      const enrichedResults = [];
      for (const result of results) {
        const venue = await storage.getVenue(result.venueId);
        const transportOptions = await storage.getTransportOptionsByVenueId(result.venueId);
        
        enrichedResults.push({
          ...result,
          venue,
          transportOptions
        });
      }
      
      res.json(enrichedResults);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
