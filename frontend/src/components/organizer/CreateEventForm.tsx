import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';

import { EventAPI } from '@/lib/api/event.api';

interface CreateEventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TicketType {
  name: string;
  price: string;
  quantity: string;
}

export function CreateEventForm({
                                  open,
                                  onOpenChange,
                                }: CreateEventFormProps) {
  // 🔹 Event fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [venue, setVenue] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  // 🔹 Ticket types (UI only for now)
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    { name: '', price: '', quantity: '' },
  ]);

  const addTicketType = () => {
    setTicketTypes([
      ...ticketTypes,
      { name: '', price: '', quantity: '' },
    ]);
  };

  const updateTicketType = (
      index: number,
      field: keyof TicketType,
      value: string
  ) => {
    const updated = [...ticketTypes];
    updated[index][field] = value;
    setTicketTypes(updated);
  };

  // 🔹 Submit handler (BACKEND INTEGRATION)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const totalTickets = ticketTypes.reduce(
          (sum, t) => sum + Number(t.quantity || 0),
          0
      );

      await EventAPI.createEvent({
        title: name,
        location: venue,
        eventDate: start,
        totalTickets,
        organizer: {
          id: 1, // ⚠️ Replace later with logged-in organizer ID
        },
      });

      // Reset form
      setName('');
      setDescription('');
      setStart('');
      setEnd('');
      setVenue('');
      setTicketTypes([{ name: '', price: '', quantity: '' }]);

      onOpenChange(false);
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('Failed to create event');
    }
  };

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>

          <form className="space-y-6 py-4" onSubmit={handleSubmit}>
            {/* Event Name */}
            <div>
              <label className="text-sm font-medium">Event Name</label>
              <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter event name"
                  required
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your event"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Start Date & Time</label>
                <Input
                    type="datetime-local"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    required
                />
              </div>
              <div>
                <label className="text-sm font-medium">End Date & Time</label>
                <Input
                    type="datetime-local"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    required
                />
              </div>
            </div>

            {/* Venue */}
            <div>
              <label className="text-sm font-medium">Venue</label>
              <Input
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="Event venue"
                  required
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium">Event Status</label>
              <Select
                  value={status}
                  onValueChange={(value) =>
                      setStatus(value as 'draft' | 'published')
                  }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ticket Types */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Ticket Types</label>
                <Button type="button" variant="outline" onClick={addTicketType}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Ticket Type
                </Button>
              </div>

              {ticketTypes.map((ticket, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 mb-2">
                    <Input
                        placeholder="Ticket Name"
                        value={ticket.name}
                        onChange={(e) =>
                            updateTicketType(index, 'name', e.target.value)
                        }
                    />
                    <Input
                        type="number"
                        placeholder="Price"
                        value={ticket.price}
                        onChange={(e) =>
                            updateTicketType(index, 'price', e.target.value)
                        }
                    />
                    <Input
                        type="number"
                        placeholder="Quantity"
                        value={ticket.quantity}
                        onChange={(e) =>
                            updateTicketType(index, 'quantity', e.target.value)
                        }
                    />
                  </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="hero">
                Create Event
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
  );
}