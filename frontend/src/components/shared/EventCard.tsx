import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/backend";

interface EventCardProps {
  event: Event;
  onAction?: () => void;
  actionLabel?: string;
  delay?: number;
}

export function EventCard({
                            event,
                            onAction,
                            actionLabel = "Manage",
                            delay = 0,
                          }: EventCardProps) {
  const totalTickets = event.totalTickets ?? 0;
  const availableTickets = event.availableTickets ?? 0;
  const soldTickets = totalTickets - availableTickets;

  return (
      <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay }}
          className="rounded-xl border bg-card p-5 hover:shadow-lg transition-all"
      >
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-lg font-semibold">{event.title}</h3>

          {/* Date & Location */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {event.eventDate
                  ? format(new Date(event.eventDate), "dd MMM yyyy")
                  : "Date TBD"}
            </div>

            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {event.location}
            </div>
          </div>

          {/* Tickets */}
          <div className="flex items-center gap-2 text-sm">
            <Ticket className="h-4 w-4 text-muted-foreground" />
            <span>
            {soldTickets} / {totalTickets} tickets sold
          </span>
          </div>

          {/* Action */}
          <div className="pt-3 flex justify-end">
            <Button size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          </div>
        </div>
      </motion.div>
  );
}