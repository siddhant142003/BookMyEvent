import { Event, Ticket, User, TicketType, OrganizerStats, StaffStats } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  { id: 'org-1', name: 'Alex Morgan', email: 'alex@eventco.com', role: 'organizer' },
  { id: 'att-1', name: 'Jamie Chen', email: 'jamie@email.com', role: 'attendee' },
  { id: 'staff-1', name: 'Sam Wilson', email: 'sam@eventco.com', role: 'staff' },
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    name: 'Neon Nights Music Festival',
    description: 'The ultimate electronic music experience featuring world-class DJs and immersive light shows.',
    start: new Date('2026-02-15T18:00:00'),
    end: new Date('2026-02-16T02:00:00'),
    venue: 'The Grand Arena, Downtown',
    imageUrl: '/placeholder.svg',
    salesStartDate: new Date('2026-01-01'),
    salesEndDate: new Date('2026-02-14'),
    status: 'published',
    organizerId: 'org-1',
    ticketTypes: [
      { id: 'tt-1', name: 'General Admission', price: 75, totalAvailable: 500, sold: 342, description: 'Standard entry' },
      { id: 'tt-2', name: 'VIP Pass', price: 150, totalAvailable: 100, sold: 67, description: 'VIP lounge access + drink vouchers' },
      { id: 'tt-3', name: 'Backstage Experience', price: 350, totalAvailable: 20, sold: 12, description: 'Meet the artists' },
    ],
  },
  {
    id: 'evt-2',
    name: 'Tech Innovation Summit 2026',
    description: 'Connect with industry leaders and discover the future of technology.',
    start: new Date('2026-03-10T09:00:00'),
    end: new Date('2026-03-11T18:00:00'),
    venue: 'Convention Center Hall A',
    imageUrl: '/placeholder.svg',
    salesStartDate: new Date('2026-01-15'),
    salesEndDate: new Date('2026-03-09'),
    status: 'published',
    organizerId: 'org-1',
    ticketTypes: [
      { id: 'tt-4', name: 'Day Pass', price: 199, totalAvailable: 1000, sold: 456, description: 'Single day access' },
      { id: 'tt-5', name: 'Full Conference', price: 349, totalAvailable: 500, sold: 289, description: 'Both days + workshops' },
    ],
  },
  {
    id: 'evt-3',
    name: 'Artisan Food & Wine Festival',
    description: 'Taste exquisite cuisines and premium wines from around the world.',
    start: new Date('2026-04-20T12:00:00'),
    end: new Date('2026-04-20T22:00:00'),
    venue: 'Riverside Gardens',
    imageUrl: '/placeholder.svg',
    status: 'draft',
    organizerId: 'org-1',
    ticketTypes: [
      { id: 'tt-6', name: 'Tasting Pass', price: 85, totalAvailable: 300, sold: 0, description: '10 tasting tokens included' },
    ],
  },
];

// Mock Tickets for Attendee
export const mockTickets: Ticket[] = [
  {
    id: 'tkt-1',
    eventId: 'evt-1',
    userId: 'att-1',
    ticketTypeId: 'tt-2',
    status: 'valid',
    createdDateTime: new Date('2026-01-10'),
    qrCode: {
      id: 'qr-1',
      generatedDateTime: new Date('2026-01-10'),
      status: 'active',
    },
  },
  {
    id: 'tkt-2',
    eventId: 'evt-2',
    userId: 'att-1',
    ticketTypeId: 'tt-5',
    status: 'valid',
    createdDateTime: new Date('2026-01-20'),
    qrCode: {
      id: 'qr-2',
      generatedDateTime: new Date('2026-01-20'),
      status: 'active',
    },
  },
];

// Organizer Dashboard Stats
export const mockOrganizerStats: OrganizerStats = {
  totalEvents: 3,
  totalTicketsSold: 1166,
  totalRevenue: 156750,
  upcomingEvents: 2,
};

// Staff Dashboard Stats  
export const mockStaffStats: StaffStats = {
  scannedToday: 234,
  validScans: 228,
  invalidScans: 6,
  currentEvent: mockEvents[0],
};

// Helper function to get event by ID
export const getEventById = (id: string): Event | undefined => {
  return mockEvents.find(event => event.id === id);
};

// Helper function to get ticket type details
export const getTicketTypeById = (event: Event, ticketTypeId: string): TicketType | undefined => {
  return event.ticketTypes.find(tt => tt.id === ticketTypeId);
};
