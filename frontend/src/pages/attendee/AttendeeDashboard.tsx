import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { EventCard } from '@/components/shared/EventCard';
import { TicketCard } from '@/components/shared/TicketCard';
import { mockEvents, mockTickets, getEventById, getTicketTypeById } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Search, 
  Ticket as TicketIcon, 
  Sparkles,
  Calendar,
  MapPin,
  Download
} from 'lucide-react';
import { format } from 'date-fns';
import { Ticket, Event, TicketType } from '@/types';

export default function AttendeeDashboard() {
  const [activeTab, setActiveTab] = useState<'discover' | 'tickets'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<{
    ticket: Ticket;
    event: Event;
    ticketType: TicketType;
  } | null>(null);

  const publishedEvents = mockEvents.filter(e => e.status === 'published');
  const userTickets = mockTickets;

  const filteredEvents = publishedEvents.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewQR = (ticket: Ticket) => {
    const event = getEventById(ticket.eventId);
    if (!event) return;
    const ticketType = getTicketTypeById(event, ticket.ticketTypeId);
    if (!ticketType) return;
    setSelectedTicket({ ticket, event, ticketType });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="attendee" userName="Jamie Chen" />
      
      <main className="container py-8">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 mb-8"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-primary-foreground/80">Find your next experience</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Discover Amazing Events
            </h1>
            <p className="text-primary-foreground/70 max-w-lg mb-6">
              From concerts to conferences, find and book tickets to the events you love.
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search events or venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-background text-foreground"
              />
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
            <TicketIcon className="h-full w-full" />
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'discover' ? 'default' : 'secondary'}
            onClick={() => setActiveTab('discover')}
          >
            Discover Events
          </Button>
          <Button
            variant={activeTab === 'tickets' ? 'default' : 'secondary'}
            onClick={() => setActiveTab('tickets')}
            className="gap-2"
          >
            <TicketIcon className="h-4 w-4" />
            My Tickets
            {userTickets.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {userTickets.length}
              </Badge>
            )}
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'discover' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No events found matching your search.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredEvents.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    variant="featured"
                    delay={index * 0.1}
                    actionLabel="Get Tickets"
                    onAction={() => console.log('Purchase flow for', event.id)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {userTickets.length === 0 ? (
              <div className="text-center py-16">
                <TicketIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tickets yet</h3>
                <p className="text-muted-foreground mb-4">Discover events and get your first ticket!</p>
                <Button variant="accent" onClick={() => setActiveTab('discover')}>
                  Browse Events
                </Button>
              </div>
            ) : (
              userTickets.map((ticket, index) => {
                const event = getEventById(ticket.eventId);
                if (!event) return null;
                const ticketType = getTicketTypeById(event, ticket.ticketTypeId);
                if (!ticketType) return null;
                
                return (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    event={event}
                    ticketType={ticketType}
                    onViewQR={() => handleViewQR(ticket)}
                    delay={index * 0.1}
                  />
                );
              })
            )}
          </motion.div>
        )}
      </main>

      {/* QR Code Modal */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Your Ticket QR Code</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="flex flex-col items-center space-y-6 py-4">
              <div className="rounded-2xl bg-card border-2 border-border p-6 shadow-lg">
                <QRCodeSVG
                  value={`TICKET:${selectedTicket.ticket.id}|EVENT:${selectedTicket.event.id}|QR:${selectedTicket.ticket.qrCode.id}`}
                  size={200}
                  level="H"
                  includeMargin={false}
                />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="font-display font-bold text-lg">{selectedTicket.event.name}</h3>
                <p className="text-muted-foreground">{selectedTicket.ticketType.name}</p>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {format(selectedTicket.event.start, 'EEEE, MMMM d, yyyy')}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {selectedTicket.event.venue}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Save to Photos
                </Button>
                <Button variant="accent" className="flex-1">
                  Add to Wallet
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Present this QR code at the venue entrance for scanning
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
