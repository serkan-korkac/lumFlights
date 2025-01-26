import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const serviceAccount: ServiceAccount = require('../../service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firestore = admin.firestore();
