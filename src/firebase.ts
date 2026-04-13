import { initializeApp } from 'firebase/app';
import { getMessaging, getToken,onMessage } from 'firebase/messaging';
import { firebaseVar } from './firebaseNotification/variables';

const firebaseConfig = {
    apiKey: firebaseVar.apiKey,
    authDomain: firebaseVar.authDomain,
    projectId: firebaseVar.projectId,
    storageBucket: firebaseVar.storageBucket,
    messagingSenderId: firebaseVar.messagingSenderId,
    appId: firebaseVar.appId,
    measurementId: firebaseVar.measurementId
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export function requestForToken() {
    return getToken(messaging, { vapidKey: firebaseVar.vapidKey })
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);
                if (localStorage.getItem('fcmToken') && currentToken !== localStorage.getItem('fcmToken')) {
                    localStorage.setItem('fcmToken', currentToken);
                } else if (!localStorage.getItem('fcmToken')) {
                    localStorage.setItem('fcmToken', currentToken);
                }
            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
}
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
