import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (from original file)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Meeting schema
export const meetings = pgTable("meetings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  userId: integer("user_id").references(() => users.id),
});

export const insertMeetingSchema = createInsertSchema(meetings).pick({
  name: true,
  date: true,
  time: true,
  userId: true,
});

export type InsertMeeting = z.infer<typeof insertMeetingSchema>;
export type Meeting = typeof meetings.$inferSelect;

// Attendee schema
export const attendees = pgTable("attendees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  latitude: text("latitude"),
  longitude: text("longitude"),
  meetingId: integer("meeting_id").references(() => meetings.id),
});

export const insertAttendeeSchema = createInsertSchema(attendees).pick({
  name: true,
  location: true,
  latitude: true,
  longitude: true,
  meetingId: true,
});

export type InsertAttendee = z.infer<typeof insertAttendeeSchema>;
export type Attendee = typeof attendees.$inferSelect;

// Venue schema
export const venues = pgTable("venues", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  latitude: text("latitude"),
  longitude: text("longitude"),
  meetingId: integer("meeting_id").references(() => meetings.id),
});

export const insertVenueSchema = createInsertSchema(venues).pick({
  name: true,
  location: true,
  latitude: true,
  longitude: true,
  meetingId: true,
});

export type InsertVenue = z.infer<typeof insertVenueSchema>;
export type Venue = typeof venues.$inferSelect;

// Transport Option schema
export const transportOptions = pgTable("transport_options", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // bus, train, bike, walk
  name: text("name").notNull(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  departureTime: text("departure_time"),
  arrivalTime: text("arrival_time"),
  duration: integer("duration").notNull(), // in minutes
  distance: text("distance"),
  co2: text("co2").notNull(),
  attendeeId: integer("attendee_id").references(() => attendees.id),
  venueId: integer("venue_id").references(() => venues.id),
});

export const insertTransportOptionSchema = createInsertSchema(transportOptions).pick({
  type: true,
  name: true,
  from: true,
  to: true,
  departureTime: true,
  arrivalTime: true,
  duration: true,
  distance: true,
  co2: true,
  attendeeId: true,
  venueId: true,
});

export type InsertTransportOption = z.infer<typeof insertTransportOptionSchema>;
export type TransportOption = typeof transportOptions.$inferSelect;

// Result schema
export const results = pgTable("results", {
  id: serial("id").primaryKey(),
  meetingId: integer("meeting_id").references(() => meetings.id),
  venueId: integer("venue_id").references(() => venues.id),
  totalCarbon: text("total_carbon").notNull(),
  carbonSaved: text("carbon_saved").notNull(),
  percentReduction: text("percent_reduction").notNull(),
  avgTravelTime: integer("avg_travel_time").notNull(), // in minutes
  transitOptions: integer("transit_options").notNull(),
});

export const insertResultSchema = createInsertSchema(results).pick({
  meetingId: true,
  venueId: true,
  totalCarbon: true,
  carbonSaved: true,
  percentReduction: true,
  avgTravelTime: true,
  transitOptions: true,
});

export type InsertResult = z.infer<typeof insertResultSchema>;
export type Result = typeof results.$inferSelect;
