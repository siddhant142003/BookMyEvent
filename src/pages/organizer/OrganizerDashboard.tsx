import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/shared/StatCard';
import { EventCard } from '@/components/shared/EventCard';
import { mockEvents, mockOrganizerStats } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { 
  CalendarDays, 
  TicketIcon, 
  DollarSign, 
  TrendingUp,
  Plus,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrganizerDashboard() {
  const navigate = useNavigate();
  const stats = mockOrganizerStats;
  const recentEvents = mockEvents.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="organizer" userName="Alex Morgan" />
      
      <main className="container py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-display font-bold">Welcome back, Alex</h1>
            <p className="text-muted-foreground">Here's what's happening with your events</p>
          </div>
          <Button variant="hero" size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Create New Event
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Events"
            value={stats.totalEvents}
            subtitle="2 upcoming"
            icon={CalendarDays}
            delay={0.1}
          />
          <StatCard
            title="Tickets Sold"
            value={stats.totalTicketsSold.toLocaleString()}
            icon={TicketIcon}
            trend={{ value: 12.5, isPositive: true }}
            delay={0.2}
          />
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            variant="accent"
            trend={{ value: 8.3, isPositive: true }}
            delay={0.3}
          />
          <StatCard
            title="Conversion Rate"
            value="4.2%"
            subtitle="Visitor to buyer"
            icon={TrendingUp}
            delay={0.4}
          />
        </div>

        {/* Recent Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold">Recent Events</h2>
            <Button variant="ghost" size="sm" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              View Analytics
            </Button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-4">
            {recentEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                delay={0.4 + index * 0.1}
                onAction={() => navigate(`/organizer/events/${event.id}`)}
                actionLabel="Manage"
              />
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-8 p-6 rounded-2xl border border-border bg-card"
        >
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Create Event', icon: Plus },
              { label: 'View All Events', icon: CalendarDays },
              { label: 'Sales Report', icon: DollarSign },
              { label: 'Analytics', icon: BarChart3 },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-auto py-4 flex-col gap-2"
                >
                  <Icon className="h-5 w-5" />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
