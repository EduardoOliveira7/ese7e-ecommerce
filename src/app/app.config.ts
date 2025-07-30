import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "ese7e-e-commerce", appId: "1:294280985551:web:9b323bbb3bc7316f2970ba", storageBucket: "ese7e-e-commerce.firebasestorage.app", apiKey: "AIzaSyDUyZWbnI62udxGv-mP9uVGuZosR9TRNdE", authDomain: "ese7e-e-commerce.firebaseapp.com", messagingSenderId: "294280985551", measurementId: "G-2TDS1YB3S1" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "ese7e-e-commerce", appId: "1:294280985551:web:09e754176c375ac92970ba", storageBucket: "ese7e-e-commerce.firebasestorage.app", apiKey: "AIzaSyDUyZWbnI62udxGv-mP9uVGuZosR9TRNdE", authDomain: "ese7e-e-commerce.firebaseapp.com", messagingSenderId: "294280985551", measurementId: "G-2TQYF3S7MQ" })), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "ese7e-e-commerce", appId: "1:294280985551:web:9b323bbb3bc7316f2970ba", storageBucket: "ese7e-e-commerce.firebasestorage.app", apiKey: "AIzaSyDUyZWbnI62udxGv-mP9uVGuZosR9TRNdE", authDomain: "ese7e-e-commerce.firebaseapp.com", messagingSenderId: "294280985551", measurementId: "G-2TDS1YB3S1" })), provideFirestore(() => getFirestore())]
};
