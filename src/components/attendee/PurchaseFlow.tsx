import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TicketType, Event } from '@/types';
import { Minus, Plus, ShoppingCart, CreditCard, Check } from 'lucide-react';

interface PurchaseFlowProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

interface TicketSelection {
  ticketTypeId: string;
  quantity: number;
}

export function PurchaseFlow({ event, isOpen, onClose }: PurchaseFlowProps) {
  const [step, setStep] = useState<'select' | 'checkout' | 'success'>('select');
  const [selections, setSelections] = useState<TicketSelection[]>(
    event.ticketTypes.map(tt => ({ ticketTypeId: tt.id, quantity: 0 }))
  );

  const updateQuantity = (ticketTypeId: string, delta: number) => {
    setSelections(selections.map(s => {
      if (s.ticketTypeId !== ticketTypeId) return s;
      const ticketType = event.ticketTypes.find(tt => tt.id === ticketTypeId);
      const maxAvailable = ticketType ? ticketType.totalAvailable - ticketType.sold : 0;
      const newQty = Math.max(0, Math.min(s.quantity + delta, maxAvailable, 10));
      return { ...s, quantity: newQty };
    }));
  };

  const totalAmount = selections.reduce((sum, s) => {
    const ticketType = event.ticketTypes.find(tt => tt.id === s.ticketTypeId);
    return sum + (ticketType ? ticketType.price * s.quantity : 0);
  }, 0);

  const totalTickets = selections.reduce((sum, s) => sum + s.quantity, 0);

  const handleCheckout = () => {
    if (totalTickets > 0) {
      setStep('checkout');
    }
  };

  const handlePurchase = () => {
    // Simulate purchase
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  const handleClose = () => {
    setStep('select');
    setSelections(event.ticketTypes.map(tt => ({ ticketTypeId: tt.id, quantity: 0 })));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">
            {step === 'select' && 'Select Tickets'}
            {step === 'checkout' && 'Checkout'}
            {step === 'success' && 'Purchase Complete!'}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <p className="text-muted-foreground text-sm">{event.name}</p>
              
              <div className="space-y-3">
                {event.ticketTypes.map((ticketType) => {
                  const selection = selections.find(s => s.ticketTypeId === ticketType.id);
                  const quantity = selection?.quantity || 0;
                  const available = ticketType.totalAvailable - ticketType.sold;
                  const isSoldOut = available === 0;
                  
                  return (
                    <div
                      key={ticketType.id}
                      className={`rounded-lg border p-4 transition-colors ${
                        quantity > 0 ? 'border-accent bg-accent/5' : 'border-border'
                      } ${isSoldOut ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{ticketType.name}</h4>
                            {isSoldOut && (
                              <Badge variant="secondary">Sold Out</Badge>
                            )}
                          </div>
                          {ticketType.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {ticketType.description}
                            </p>
                          )}
                          <p className="text-lg font-bold text-accent mt-2">
                            ${ticketType.price}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {available} available
                          </p>
                        </div>
                        
                        {!isSoldOut && (
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(ticketType.id, -1)}
                              disabled={quantity === 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{quantity}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(ticketType.id, 1)}
                              disabled={quantity >= Math.min(available, 10)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {totalTickets} ticket{totalTickets !== 1 ? 's' : ''}
                  </span>
                  <span className="text-2xl font-bold">${totalAmount}</span>
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full gap-2"
                  onClick={handleCheckout}
                  disabled={totalTickets === 0}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Continue to Checkout
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Order Summary */}
              <div className="rounded-lg bg-secondary/50 p-4 space-y-2">
                <h4 className="font-semibold text-sm">Order Summary</h4>
                {selections.filter(s => s.quantity > 0).map(s => {
                  const tt = event.ticketTypes.find(t => t.id === s.ticketTypeId);
                  if (!tt) return null;
                  return (
                    <div key={s.ticketTypeId} className="flex justify-between text-sm">
                      <span>{s.quantity}x {tt.name}</span>
                      <span>${tt.price * s.quantity}</span>
                    </div>
                  );
                })}
                <div className="border-t border-border pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-accent">${totalAmount}</span>
                </div>
              </div>

              {/* Payment Form (Demo) */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="card">Card Number</Label>
                  <Input id="card" placeholder="4242 4242 4242 4242" className="mt-1.5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input id="expiry" placeholder="MM/YY" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" className="mt-1.5" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep('select')}>
                  Back
                </Button>
                <Button variant="hero" className="flex-1 gap-2" onClick={handlePurchase}>
                  <CreditCard className="h-4 w-4" />
                  Pay ${totalAmount}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mx-auto">
                <Check className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-display font-bold">Purchase Successful!</h3>
              <p className="text-muted-foreground">
                Your tickets have been sent to your email. You can also view them in "My Tickets".
              </p>
              <Button variant="accent" onClick={handleClose}>
                View My Tickets
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
