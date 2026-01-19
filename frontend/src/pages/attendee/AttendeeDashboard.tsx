import {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { EventCard } from '@/components/shared/EventCard';
import { TicketCard } from '@/components/shared/TicketCard';
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
import type { Ticket } from '@/types/backend';
import type { Event } from '@/types/backend';
import type { TicketType } from '@/types';
import {AttendeeAPI} from "@/lib/api/attendee.api.ts";
import { TicketAPI } from "@/lib/api/ticket.api";
import type { Event as BackendEvent } from "@/types/backend";
import type { UIEvent } from "@/types/ui-event";

export function AttendeeDashboard() {
  const [activeTab, setActiveTab] = useState<'discover' | 'tickets'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<{
    ticket: Ticket;
    event: UIEvent;
    ticketType: TicketType;
  } | null>(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [events, setEvents] = useState<BackendEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const [userTickets, setUserTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchMyTickets = async () => {
      try {
        const tickets = await TicketAPI.getMyTickets(user.id);
        setUserTickets(tickets);
      } catch (err) {
        console.error("Failed to fetch tickets", err);
      }
    };

    fetchMyTickets();
  }, [user]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data: BackendEvent[] = await AttendeeAPI.getAllEvents();

        const mappedEvents: UIEvent[] = data.map((e) => ({
          id: e.id,
          name: e.title,
          description: e.description,
          venue: e.location,
          start: new Date(e.startDate),
          end: new Date(e.endDate),
          status: "published",
          ticketTypes: [
            {
              id: 1,
              name: "General",
              price: 0,
              totalAvailable: e.totalTickets,
              sold: e.totalTickets - e.availableTickets,
            },
          ],
        }));

        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
      (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookTicket = async (eventId: number) => {
    try {
      await TicketAPI.bookTicket(Number(eventId), user.id);
      alert('Ticket booked successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to book ticket');
    }
  };

  return (
      <div className="min-h-screen bg-background">
        <Header userRole="attendee" userName={user?.name ?? ""}/>

        <main className="container py-8">
          {/* Hero Banner */}
          <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 mb-8"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-accent"/>
                <span className="text-sm font-medium text-primary-foreground/80">Find your next experience</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Discover Amazing Events
              </h1>
              <p className="text-primary-foreground/70 max-w-lg mb-6">
                From concerts to conferences, find and book tickets to the events you love.
              </p>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                <Input
                    placeholder="Search events or venues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 bg-background text-foreground"
                />
              </div>
            </div>
            <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
              <TicketIcon className="h-full w-full"/>
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
              <TicketIcon className="h-4 w-4"/>
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
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{duration: 0.3}}
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
                                //variant="featured"
                                //delay={index * 0.1}
                                actionLabel="Get Tickets"
                                onAction={() => handleBookTicket(event.id)}
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
                      <p className="text-muted-foreground mb-4">
                        Book an event to see your tickets here.
                      </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {userTickets.map((ticket, index) => {
                        const event = ticket.event;

                        if (!event) return null;

                        const uiEvent: UIEvent = {
                          id: event.id,
                          name: event.title,
                          description: event.description,
                          venue: event.location,
                          start: new Date(event.startDate),
                          end: new Date(event.endDate),
                          status: "published",
                          ticketTypes: [
                            {
                              id: "general",
                              name: "General",
                              price: 0,
                              totalAvailable: event.totalTickets,
                              sold: event.totalTickets - event.availableTickets,
                            },
                          ],
                        };

                        const ticketType = uiEvent.ticketTypes[0];

                        return (
                            <TicketCard
                                key={ticket.id}
                                ticket={ticket}
                                event={uiEvent}
                                ticketType={ticketType}
                                delay={index * 0.1}
                                onViewQR={() =>
                                    setSelectedTicket({ ticket, event: uiEvent, ticketType })
                                }
                            />
                        );
                      })}
                    </div>
                )}
              </motion.div>
          )}
        </main>

        {/* ===== QR MODAL (ADD THIS) ===== */}
        <Dialog
            open={!!selectedTicket}
            onOpenChange={() => setSelectedTicket(null)}
        >
          <DialogContent className="max-w-sm text-center">
            <DialogHeader>
              <DialogTitle>Ticket QR Code</DialogTitle>
            </DialogHeader>

            {selectedTicket && (
                <div className="flex flex-col items-center gap-4">
                  <h3 className="font-semibold">
                    {selectedTicket.event.name}
                  </h3>

                  <QRCodeSVG
                      value={selectedTicket.ticket.qrCode}
                      size={220}
                      level="H"
                  />

                  <p className="text-sm text-muted-foreground">
                    Show this QR code at the event entrance
                  </p>
                </div>
            )}
          </DialogContent>
        </Dialog>
        {/* ===== END QR MODAL ===== */}

      </div>
  );
}
