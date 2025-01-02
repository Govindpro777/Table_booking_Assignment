'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Users, Clock } from 'lucide-react';
import { BookingConfirmationDialog } from './components/BookingConfirmationDialog';

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    time: '',
    guests: 1,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const { toast } = useToast();

  const availableTimeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for your booking.",
        variant: "destructive",
      });
      return;
    }

    try {
      const bookingData = {
        ...formData,
        date: date.toISOString(),
      };

      const response = await fetch('https://table-booking-assignment.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const confirmedData = await response.json();
        setConfirmedBooking({
          ...bookingData,
          date,
        });
        setShowConfirmation(true);
        
        toast({
          title: "🎉 Booking Successful!",
          description: "Your table has been reserved. Check your email for confirmation.",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          time: '',
          guests: 1,
        });
        setDate(new Date());
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Book Your Table</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Select Date & Time</h2>
          <div className="mb-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {availableTimeSlots.map((time) => (
              <Button
                key={time}
                variant={formData.time === time ? 'default' : 'outline'}
                className="w-full"
                onClick={() => setFormData({ ...formData, time })}
              >
                {time}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="guests">Number of Guests</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                max="10"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Confirm Booking
            </Button>
          </form>
        </Card>
      </div>

      {/* Booking Summary */}
      {formData.time && date && (
        <Card className="mt-8 p-6">
          <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <span>{date.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{formData.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{formData.guests} guests</span>
            </div>
          </div>
        </Card>
      )}

      <BookingConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        bookingDetails={confirmedBooking}
      />
    </div>
  );
}
