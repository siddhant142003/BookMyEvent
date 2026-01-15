import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { QRCodeSVG } from 'qrcode.react';
import { CalendarDays, MapPin, TicketIcon, ChevronRight } from 'lucide-react';
import { Ticket, Event, TicketType } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TicketCardProps {
  ticket: Ticket;
  event: Event;
  ticketType: TicketType;
  onViewQR?: () => void;
  delay?: number;
}

const statusStyles: Record<string, string> = {
  valid: 'bg-success/10 text-success border-success/20',
  used: 'bg-muted text-muted-foreground',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
  expired: 'bg-warning/10 text-warning border-warning/20',
};

export function TicketCard({ 
  ticket, 
  event, 
  ticketType, 
  onViewQR,
  delay = 0 
}: TicketCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card hover:border-accent/50 transition-all duration-300"
    >
      {/* Ticket perforation effect */}
      <div className="absolute left-0 top-1/2 h-6 w-3 -translate-y-1/2 rounded-r-full bg-background" />
      <div className="absolute right-0 top-1/2 h-6 w-3 -translate-y-1/2 rounded-l-full bg-background" />
      
      <div className="flex flex-col sm:flex-row">
        {/* Event Info Section */}
        <div className="flex-1 p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="outline" className={cn(statusStyles[ticket.status])}>
                {ticket.status}
              </Badge>
              <h3 className="mt-2 text-xl font-bold font-display">{event.name}</h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <TicketIcon className="h-5 w-5 text-accent" />
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>{format(event.start, 'EEEE, MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{event.venue}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-border">
            <p className="text-sm text-muted-foreground">Ticket Type</p>
            <p className="font-semibold">{ticketType.name}</p>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="relative flex flex-col items-center justify-center gap-4 border-t sm:border-t-0 sm:border-l border-dashed border-border bg-secondary/30 p-6">
          <div className="rounded-xl bg-card p-3 shadow-md">
            <QRCodeSVG 
              value={`TICKET:${ticket.id}|EVENT:${event.id}|QR:${ticket.qrCode.id}`}
              size={100}
              level="H"
              includeMargin={false}
            />
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onViewQR}
            className="gap-1"
          >
            View Full QR
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
