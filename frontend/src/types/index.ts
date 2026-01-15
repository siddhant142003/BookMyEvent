// User Types
export type UserRole = 'organizer' | 'attendee' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Event Types
export type EventStatus = 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';

export interface Event {
  id: string;
  name: string;
  description?: string;
  start: Date;
  end: Date;
  venue: string;
  imageUrl?: string;
  salesStartDate?: Date;
  salesEndDate?: Date;
  status: EventStatus;
  organizerId: string;
  ticketTypes: TicketType[];
}

// Ticket Types
export interface TicketType {
  id: string;
  name: string;
  price: number;
  totalAvailable: number;
  sold: number;
  description?: string;
}

export type TicketStatus = 'valid' | 'used' | 'cancelled' | 'expired';

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  ticketTypeId: string;
  status: TicketStatus;
  createdDateTime: Date;
  qrCode: QRCode;
}

// QR Code Types
export type QRCodeStatus = 'active' | 'scanned' | 'expired' | 'invalid';

export interface QRCode {
  id: string;
  generatedDateTime: Date;
  status: QRCodeStatus;
}

// Ticket Validation Types
export type TicketValidationMethod = 'qr_scan' | 'manual';
export type TicketValidationStatus = 'valid' | 'invalid' | 'already_used' | 'expired';

export interface TicketValidation {
  id: string;
  ticketId: string;
  status: TicketValidationStatus;
  validationDateTime: Date;
  validationMethod: TicketValidationMethod;
  staffId: string;
}

// Dashboard Stats
export interface OrganizerStats {
  totalEvents: number;
  totalTicketsSold: number;
  totalRevenue: number;
  upcomingEvents: number;
}

export interface StaffStats {
  scannedToday: number;
  validScans: number;
  invalidScans: number;
  currentEvent?: Event;
}
