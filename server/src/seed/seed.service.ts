import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'; // Import bcryptjs for password hashing
import { firestore } from '../config/firebase.config';
import * as users from '../data/users.json';
import * as reservations from '../data/reservations.json';

@Injectable()
export class SeedService implements OnModuleInit {
  private usersCollection = firestore.collection('users');
  private reservationsCollection = firestore.collection('reservations');

  async onModuleInit() {
    await this.seedUsers();
    await this.seedReservations();
  }

  private async seedUsers() {
    const snapshot = await this.usersCollection.get();
    if (!snapshot.empty) return;

    for (const user of users) {
      const docRef = this.usersCollection.doc(user.id);
      const doc = await docRef.get();

      if (!doc.exists) {
        // Hash the password before saving the user
        const hashedPassword = await this.hashPassword(user.password);
        await docRef.set({
          ...user,
          password: hashedPassword, // Replace the plain password with the hashed one
        });
      }
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    return bcrypt.hash(password, salt); // Hash the password with the salt
  }

  private async seedReservations() {
    const snapshot = await this.reservationsCollection.get();
    if (!snapshot.empty) return;

    for (const reservation of reservations) {
      const docRef = this.reservationsCollection.doc(reservation.id);
      const doc = await docRef.get();

      if (!doc.exists) {
        await docRef.set(reservation);
      }
    }
  }
}
