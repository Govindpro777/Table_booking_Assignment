import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CalendarDays, Clock, Users } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Our Restaurant</h1>
        <p className="text-xl text-gray-600 mb-8">Experience fine dining at its best</p>
        <Link href="/booking">
          <Button size="lg" className="text-lg px-8">
            Book a Table
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <CalendarDays className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600">Book your table in just a few clicks</p>
          </Card>

          <Card className="p-6 text-center">
            <Clock className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
            <p className="text-gray-600">Open for lunch and dinner service</p>
          </Card>

          <Card className="p-6 text-center">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Group Bookings</h3>
            <p className="text-gray-600">Perfect for special occasions</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Dine With Us?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Reserve your table now and enjoy an unforgettable dining experience
        </p>
        <Link href="/booking">
          <Button size="lg" variant="outline" className="text-lg px-8">
            Make a Reservation
          </Button>
        </Link>
      </section>
    </main>
  );
}