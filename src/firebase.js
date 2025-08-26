// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCyB8SfNP5uvqNLWw3voeB8nNtSJvWeplQ",
    authDomain: "tutorial-test-fb-5d8ba.firebaseapp.com",
    projectId: "tutorial-test-fb-5d8ba",
    storageBucket: "tutorial-test-fb-5d8ba.appspot.com",
    messagingSenderId: "987311190427",
    appId: "1:987311190427:web:1923c38024b20364afb13e"
};

const app = initializeApp(firebaseConfig);

let messaging = null;
export const initMessaging = async () => {
  const supported = await isSupported();
  if (!supported) return null;
  messaging = getMessaging(app);
  return messaging;
};

export const getFcmToken = async (vapidKey) => {

  if (!messaging) return null;
  try {
    const token = await getToken(messaging, { vapidKey });
    return token || null;
  } catch (e) {
    console.error("getToken error:", e);
    return null;
  }
};

export const onForegroundMessage = (cb) => {
  if (!messaging) return;
  onMessage(messaging, (payload) => cb?.(payload));
};