export type ReservationResponse = {
    reservations: Reservation[];
    pageNumber: number;
}

export type Reservation = {
    id: string;
    flightNumber: string;
    date: string;
    destination: string;
    customers: {
        name: string;
        age: number;
        email: string;
    }[];
    airline: string;
    departureTime: string;
    arrivalTime: string;
    departureAirport: string;
    arrivalAirport: string;
    ticketPrice: number;
    bookingReference: string;
    status: string;
};

export type Role = 'admin' | 'staff';

export type Profile = {
    userId: number;
    username: string;
    role: Role;
}