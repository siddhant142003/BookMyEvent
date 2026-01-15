import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CalendarDays, MapPin, DollarSign, Users, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TicketTypeForm {
  id: string;
  name: string;
  price: string;
  quantity: string;
  description: string;
}

interface CreateEventFormProps {
  trigger?: React.ReactNode;
}

export function CreateEventForm({ trigger }: CreateEventFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [ticketTypes, setTicketTypes] = useState<TicketTypeForm[]>([
    { id: '1', name: 'General Admission', price: '50', quantity: '100', description: '' }
  ]);

  const addTicketType = () => {
    setTicketTypes([
      ...ticketTypes,
      { id: Date.now().toString(), name: '', price: '', quantity: '', description: '' }
    ]);
  };

  const removeTicketType = (id: string) => {
    if (ticketTypes.length > 1) {
      setTicketTypes(ticketTypes.filter(tt => tt.id !== id));
    }
  };

  const updateTicketType = (id: string, field: keyof TicketTypeForm, value: string) => {
    setTicketTypes(ticketTypes.map(tt => 
      tt.id === id ? { ...tt, [field]: value } : tt
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="hero" size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Create New Event
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Create New Event</DialogTitle>
        </DialogHeader>
        
        <form className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-accent" />
              Event Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Event Name *</Label>
                <Input id="name" placeholder="Enter event name" className="mt-1.5" />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your event..."
                  className="mt-1.5 min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start">Start Date & Time *</Label>
                  <Input id="start" type="datetime-local" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="end">End Date & Time *</Label>
                  <Input id="end" type="datetime-local" className="mt-1.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Venue */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-accent" />
              Venue
            </h3>
            <Input placeholder="Venue name or address" />
          </div>

          {/* Ticket Types */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-accent" />
                Ticket Types
              </h3>
              <Button type="button" variant="outline" size="sm" onClick={addTicketType} className="gap-1">
                <Plus className="h-4 w-4" />
                Add Type
              </Button>
            </div>
            
            <div className="space-y-4">
              {ticketTypes.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-lg border border-border bg-secondary/30 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Ticket Type {index + 1}
                    </span>
                    {ticketTypes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeTicketType(ticket.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-3 sm:col-span-1">
                      <Input
                        placeholder="Type name"
                        value={ticket.name}
                        onChange={(e) => updateTicketType(ticket.id, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          type="number"
                          placeholder="Price"
                          className="pl-7"
                          value={ticket.price}
                          onChange={(e) => updateTicketType(ticket.id, 'price', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Quantity"
                        value={ticket.quantity}
                        onChange={(e) => updateTicketType(ticket.id, 'quantity', e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sales Period */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              Sales Period
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="salesStart">Sales Start</Label>
                <Input id="salesStart" type="datetime-local" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="salesEnd">Sales End</Label>
                <Input id="salesEnd" type="datetime-local" className="mt-1.5" />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Event Status</Label>
            <Select defaultValue="draft">
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="hero" className="flex-1">
              Create Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
