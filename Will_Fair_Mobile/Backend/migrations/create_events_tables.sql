-- Migration: Create event-related tables
-- Run this file in your PostgreSQL database to set up the schema

-- 1. Create event_organisers table
CREATE TABLE IF NOT EXISTS event_organisers (
    organiser_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create events table
CREATE TABLE IF NOT EXISTS events (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(100) NOT NULL,
    commitment VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    skills VARCHAR(255) NOT NULL,
    is_range BOOLEAN DEFAULT FALSE,
    date DATE,
    start_date DATE,
    end_date DATE,
    volunteers_needed INTEGER DEFAULT 0,
    volunteers_signed INTEGER DEFAULT 0,
    image_path VARCHAR(500),
    organiser_id INTEGER REFERENCES event_organisers(organiser_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Create event_documents table
CREATE TABLE IF NOT EXISTS event_documents (
    document_id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events(event_id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    path VARCHAR(500) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_organiser ON events(organiser_id);
CREATE INDEX IF NOT EXISTS idx_events_dates ON events(date, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_event_documents_event ON event_documents(event_id);

-- Add comments for documentation
COMMENT ON TABLE event_organisers IS 'Stores information about event organizers';
COMMENT ON TABLE events IS 'Stores volunteer events with date ranges support';
COMMENT ON TABLE event_documents IS 'Stores PDF documents related to events';

COMMENT ON COLUMN events.is_range IS 'TRUE if event spans multiple days (start_date to end_date), FALSE for single day (date)';
COMMENT ON COLUMN events.volunteers_needed IS 'Total number of volunteers needed';
COMMENT ON COLUMN events.volunteers_signed IS 'Number of volunteers currently signed up';
