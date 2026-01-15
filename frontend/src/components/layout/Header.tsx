import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types';
import { motion } from 'framer-motion';
import { 
  CalendarDays, 
  TicketIcon, 
  ScanLine, 
  ChevronDown,
  User,
  LogOut
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  userRole: UserRole;
  userName?: string;
}

const roleConfig = {
  organizer: {
    title: 'Organizer Portal',
    icon: CalendarDays,
    nav: [
      { label: 'Dashboard', path: '/organizer' },
      { label: 'Events', path: '/organizer/events' },
      { label: 'Analytics', path: '/organizer/analytics' },
    ],
  },
  attendee: {
    title: 'TicketHub',
    icon: TicketIcon,
    nav: [
      { label: 'Discover', path: '/attendee' },
      { label: 'My Tickets', path: '/attendee/tickets' },
    ],
  },
  staff: {
    title: 'Staff Portal',
    icon: ScanLine,
    nav: [
      { label: 'Scanner', path: '/staff' },
      { label: 'History', path: '/staff/history' },
    ],
  },
};

export function Header({ userRole, userName = 'User' }: HeaderProps) {
  const location = useLocation();
  const config = roleConfig[userRole];
  const Icon = config.icon;

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to={`/${userRole}`} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">{config.title}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {config.nav.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="sm"
                    className={isActive ? 'font-semibold' : 'font-medium text-muted-foreground'}
                  >
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                  <User className="h-4 w-4" />
                </div>
                <span className="hidden sm:inline font-medium">{userName}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/" className="flex items-center text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Switch Role
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
