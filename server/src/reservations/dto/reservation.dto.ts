export class Reservation {
    id: string;
    flightNumber: string;
    date: string;
    destination: string;
    customers?: {
      name: string;
      age: number;
      email: string;
    }[];
    airline?: string;
    departureTime?: string;
    arrivalTime?: string;
    departureAirport?: string;
    arrivalAirport?: string;
    ticketPrice?: number;
    bookingReference?: string;
    status?: string;
  };