import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/shared/StatCard";
import { EventCard } from "@/components/shared/EventCard";
import { Button } from "@/components/ui/button";

import {
  CalendarDays,
  TicketIcon,
  DollarSign,
  TrendingUp,
  Plus,
  BarChart3,
} from "lucide-react";

import { EventAPI } from "@/lib/api/event.api";
import type { Event, User } from "@/types/backend";

export default function OrganizerDashboard() {
  const navigate = useNavigate();

  // 🔹 Load logged-in user from localStorage
  const user: User | null = JSON.parse(
      localStorage.getItem("user") || "null"
  );

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchEvents = async () => {
      try {
        const data = await EventAPI.getEventsByOrganizer(user.id);
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user]);

  const totalTicketsSold = events.reduce(
      (sum, e) => sum + (e.totalTickets - e.availableTickets),
      0
  );

  return (
      <div className="min-h-screen bg-background">
        <Header userRole="organizer" userName={user?.name ?? ""} />

        <main className="container py-8">
          {/* Welcome */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {user?.name?.split(" ")[0]}
              </h1>
              <p className="text-muted-foreground">
                Manage your events and track performance
              </p>
            </div>

            <Button
                variant="hero"
                size="lg"
                className="gap-2"
                onClick={() => navigate("/organizer/create")}
            >
              <Plus className="h-5 w-5" />
              Create New Event
            </Button>
          </motion.div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
                title="Total Events"
                value={events.length}
                icon={CalendarDays}
            />
            <StatCard
                title="Tickets Sold"
                value={totalTicketsSold}
                icon={TicketIcon}
            />
            <StatCard
                title="Total Revenue"
                value="₹0"
                icon={DollarSign}
                variant="accent"
            />
            <StatCard
                title="Conversion Rate"
                value="—"
                subtitle="Coming soon"
                icon={TrendingUp}
            />
          </div>

          {/* Recent Events */}
          <motion.div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recent Events</h2>
              <Button variant="ghost" size="sm">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Button>
            </div>

            {loading ? (
                <p>Loading events...</p>
            ) : events.length === 0 ? (
                <p className="text-muted-foreground">
                  You haven’t created any events yet.
                </p>
            ) : (
                <div className="grid lg:grid-cols-2 gap-4">
                  {events.slice(0, 100).map((event, index) => (
                      <EventCard
                          key={event.id}
                          event={event}
                          delay={0.2 + index * 0.1}
                          actionLabel="Manage"
                          onAction={() =>
                              navigate(`/organizer/events/${event.id}`)
                          }
                      />
                  ))}
                </div>
            )}
          </motion.div>
        </main>
      </div>
  );
}