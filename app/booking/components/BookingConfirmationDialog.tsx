'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { CalendarIcon, Users, Clock, Mail, Phone, User } from "lucide-react";

interface BookingConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    name: string;
    email: string;
    phone: string;
    date: Date;
    time: string;
    guests: number;
  } | null;
}

export function BookingConfirmationDialog({
  isOpen,
  onClose,
  bookingDetails,
}: BookingConfirmationProps) {
  if (!bookingDetails) return null;

  const details = [
    { icon: User, label: "Name", value: bookingDetails.name },
    { icon: Mail, label: "Email", value: bookingDetails.email },
    { icon: Phone, label: "Phone", value: bookingDetails.phone },
    { icon: CalendarIcon, label: "Date", value: format(new Date(bookingDetails.date), "PPP") },
    { icon: Clock, label: "Time", value: bookingDetails.time },
    { icon: Users, label: "Guests", value: `${bookingDetails.guests} ${bookingDetails.guests === 1 ? 'person' : 'people'}` },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Booking Confirmed! 🎉</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}