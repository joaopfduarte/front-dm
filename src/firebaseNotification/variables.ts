const API_KEY = import.meta.env.VITE_API_API_KEY || null;
const AUTH_DOMAIN = import.meta.env.VITE_API_AUTH_DOMAIN || null;
const PROJECT_ID = import.meta.env.VITE_API_PROJECT_ID || null;
const STORAGE_BUCKET = import.meta.env.VITE_API_STORAGE_BUCKET || null;
const MESSAGING_SENDER_ID = import.meta.env.VITE_API_MESSAGING_SENDER_ID || null;
const APP_ID = import.meta.env.VITE_API_APP_ID || null;
const MEASUREMENT_ID = import.meta.env.VITE_API_MEASUREMENT_ID || null;
const VAPID_KEY = import.meta.env.VITE_API_VAPID_KEY || null;

export const firebaseVar = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
    vapidKey: VAPID_KEY
}
