import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarDays, TicketIcon, ScanLine, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const roleCards = [
  {
    role: 'organizer',
    title: 'Event Organizer',
    description: 'Create events, manage tickets, and track sales in real-time.',
    icon: CalendarDays,
    features: ['Create & manage events', 'Configure ticket types', 'Monitor sales analytics'],
    gradient: 'from-primary to-primary/80',
  },
  {
    role: 'attendee',
    title: 'Event Attendee',
    description: 'Discover events, purchase tickets, and access your QR codes.',
    icon: TicketIcon,
    features: ['Browse upcoming events', 'Secure ticket purchase', 'Digital QR tickets'],
    gradient: 'from-accent to-accent/80',
  },
  {
    role: 'staff',
    title: 'Event Staff',
    description: 'Scan and validate tickets at venue entry points.',
    icon: ScanLine,
    features: ['QR code scanner', 'Real-time validation', 'Entry tracking'],
    gradient: 'from-success to-success/80',
  },
];

export default function RoleSelection() {
  return (
    <div className="min-h-screen hero-gradient text-primary-foreground">
      <div className="container py-16 md:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Event Ticketing Platform</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
            Welcome to <span className="gradient-text">TicketHub</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto">
            The complete event management platform. Create, sell, and validate tickets with ease.
          </p>
        </motion.div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {roleCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.role}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Link to={`/${card.role}`}>
                  <div className="group relative h-full overflow-hidden rounded-2xl bg-card text-card-foreground p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    {/* Icon */}
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} mb-4`}>
                      <Icon className="h-7 w-7 text-primary-foreground" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-display font-bold mb-2">{card.title}</h3>
                    <p className="text-muted-foreground mb-6">{card.description}</p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {card.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button variant="ghost" className="group-hover:bg-secondary gap-2">
                      Enter Portal
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-primary-foreground/50 text-sm mt-16"
        >
          Select your role to continue. You can switch roles anytime from your profile menu.
        </motion.p>
      </div>
    </div>
  );
}
