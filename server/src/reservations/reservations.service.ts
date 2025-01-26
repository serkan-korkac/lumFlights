import { Injectable } from '@nestjs/common';
import { firestore } from '../config/firebase.config';
import { Reservation } from './dto/reservation.dto';
import { Analyse } from './dto/analyse.dto';

@Injectable()
export class ReservationsService {
  private reservationsCollection = firestore.collection('reservations');

  async findReservationsByPage(
    pageNumber: number = 1, 
    userRole: string,
    startDate: string | null = null, 
    endDate: string | null = null
  ): Promise<{
    reservations: Reservation[],
    pageNumber: number,
  }> {
    console.log('Finding reservations by page', pageNumber, startDate, endDate);
    const pageSize = 5;
    const startIndex = (pageNumber - 1) * pageSize;
  
    let query = this.reservationsCollection.orderBy('date').offset(startIndex).limit(pageSize);
  
    // Apply date range filter if startDate and endDate are provided
    if (startDate && endDate) {
      query = query.where('date', '>=', startDate).where('date', '<=', endDate);
    } else if (startDate) {
      query = query.where('date', '>=', startDate);
    } else if (endDate) {
      query = query.where('date', '<=', endDate);
    }
  
    const snapshot = await query.get();
  
    const reservations: Reservation[] = snapshot.docs.map(doc => {
      const reservationData = doc.data() as Reservation;
  
      if (userRole === 'admin') {
        return reservationData;
      } else {
        return {
          id: reservationData.id,
          flightNumber: reservationData.flightNumber,
          date: reservationData.date,
          destination: reservationData.destination,
        };
      }
    });
  
    return {
      reservations,
      pageNumber,
    };
  }
  
  getReservationAnalysis(): Promise<Analyse> {
     const mockReservationData = {
      flightNumber: 'FL1234',
      date: '2025-02-15',
      passengers: ['John Doe', 'Jane Smith'],
      aiAnalysis: 'This flight is scheduled for February 15th and has a good mix of family and business travelers. The flight is likely to be busy due to the date.',
      suggestions: [
        'Consider offering early check-in for families.',
        'Business travelers might appreciate quiet zones on the flight.',
        'Offer in-flight Wi-Fi services for better passenger experience.'
      ],
      comments: [
        'The flight is well-timed, but it may face congestion at peak times.',
        'Consider upgrading meal options for long-haul passengers.',
        'There could be potential issues with luggage space due to the high number of passengers.'
      ]
    };
    return Promise.resolve(mockReservationData);
    
  }
}
