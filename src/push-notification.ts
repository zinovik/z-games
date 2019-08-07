import firebase from 'firebase';

export const initializeFirebase = () =>
  new Promise((resolve, reject) => {
    const config = {
      messagingSenderId: '849280843071',
    };

    firebase.initializeApp(config);

    // register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          updateViaCache: 'none',
        });
        firebase.messaging().useServiceWorker(registration);
        resolve();
      });
    }
  });

export const askForPermissionToReceiveNotifications = async (): Promise<string | null> => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();

    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
};
