import { Injectable } from '@nestjs/common';
import { firestore } from '../config/firebase.config';

@Injectable()
export class UsersService {
  private usersCollection = firestore.collection('users');

  async findByUsername(username: string) {
    const snapshot = await this.usersCollection.where('username', '==', username).get();
    if (snapshot.empty) return null;
    return snapshot.docs[0].data();
  }

  async findAll() {
    const snapshot = await this.usersCollection.get();
    return snapshot.docs.map(doc => doc.data());
  }
}
