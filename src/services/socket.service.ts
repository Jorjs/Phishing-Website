// socket.ts
import { io } from 'socket.io-client';
import { VueCookieNext } from 'vue-cookie-next';

export function createSocket() {
  const url = import.meta.env.VITE_API_URL_DEFAULT;
  const token = VueCookieNext.getCookie('token');
  const socket = io(url, {
    extraHeaders: {
      authorization: `Bearer ${token}` 
    }
  });
  return socket;
}
