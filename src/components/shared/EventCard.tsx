import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CalendarDays, MapPin, Users, Clock } from 'lucide-react';
import { Event } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'compact' | 'featured';
  onAction?: () => void;
  actionLabel?: string;
  delay?: number;
}

const statusColors: Record<string, string> = {
  draft: 'bg-muted text-muted-foreground',
  published: 'bg-success/10 text-success border-success/20',
  ongoing: 'bg-accent/10 text-accent border-accent/20',
  completed: 'bg-secondary text-secondary-foreground',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

export function EventCard({ 
  event, 
  variant = 'default', 
  onAction,
  actionLabel = 'View Details',
  delay = 0 
}: EventCardProps) {
  const totalTickets = event.ticketTypes.reduce((sum, tt) => sum + tt.totalAvailable, 0);
  const soldTickets = event.ticketTypes.reduce((sum, tt) => sum + tt.sold, 0);
  const lowestPrice = Math.min(...event.ticketTypes.map(tt => tt.price));

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay }}
        className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
          <CalendarDays className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold truncate">{event.name}</h4>
          <p className="text-sm text-muted-foreground">
            {format(event.start, 'MMM d, yyyy')} • {event.venue}
          </p>
        </div>
        <Badge variant="outline" className={cn(statusColors[event.status])}>
          {event.status}
        </Badge>
      </motion.div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="aspect-[16/9] w-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <CalendarDays className="h-16 w-16 text-muted-foreground/50" />
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge variant="outline" className={cn('mb-2', statusColors[event.status])}>
                {event.status}
              </Badge>
              <h3 className="text-xl font-bold font-display">{event.name}</h3>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">From</p>
              <p className="text-2xl font-bold text-accent">${lowestPrice}</p>
            </div>
          </div>
          
          <p className="text-muted-foreground line-clamp-2">{event.description}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {format(event.start, 'EEE, MMM d')}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {format(event.start, 'h:mm a')}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {event.venue}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{soldTickets} / {totalTickets} sold</span>
            </div>
            <Button variant="accent" onClick={onAction}>
              {actionLabel}
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group rounded-xl border border-border bg-card p-5 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-secondary group-hover:bg-accent/10 transition-colors">
          <CalendarDays className="h-7 w-7 text-muted-foreground group-hover:text-accent transition-colors" />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold font-display text-lg">{event.name}</h3>
            <Badge variant="outline" className={cn('flex-shrink-0', statusColors[event.status])}>
              {event.status}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {format(event.start, 'MMM d, yyyy')}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {event.venue}
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-24 rounded-full bg-secondary overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all"
                  style={{ width: `${(soldTickets / totalTickets) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {soldTickets}/{totalTickets}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
