import type { AuthState, TError } from '@/models/auth.store.models';
import { defineStore } from 'pinia';
import { VueCookieNext } from 'vue-cookie-next';
import {login, register} from '../services/auth.service'
import router from '@/router';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: VueCookieNext.getCookie('token') || null,
    autoLogoutTimer: null,
    user: (() => {
      const userCookie = VueCookieNext.getCookie('user');
      if (!userCookie) return null;

      if (typeof userCookie === 'object') return userCookie;
      try {
        return JSON.parse(userCookie);
      } catch (e) {
        console.error('Error parsing user cookie:', e);
        return null;
      }
    })(),
    error: null as TError | null,
    isLoading: false,
  }),
  actions: {
    async login(username: string, password: string) {
      this.isLoading = true;
      const { data, message } = await login(username, password);
      this.isLoading = false;

      if(data) {
        
        this.user = data.user;
        this.token = data.token;
        this.startAutoLogoutTimer();
        router.push({ name: 'table' });
        
      }

      if (message) {
        this.error = message;
      }
    },
    async register(  
      name: string,
      lastName: string,
      email: string,
      username: string,
      password: string
    ) 
    {
        this.isLoading = true;
        const { message, data } = await register(name, lastName, email, username, password);
        this.isLoading = false;

        if(data) {
          this.user = data.user;
          this.token = data.token;
          router.push({ name: 'table' });
        }

        if (message) {
          this.error = message;
        }

        
    },
    logout() {
      try {
        this.user = null;
        if (this.autoLogoutTimer) clearTimeout(this.autoLogoutTimer);
        this.autoLogoutTimer = null;
        router.push('/login');
        VueCookieNext.removeCookie('user');
        VueCookieNext.removeCookie('token');
        VueCookieNext.removeCookie('verify-user');
      } catch (e: any) {
        console.log('logout catch e: ', e);
        this.error = e.message as TError;
      }
    },
    startAutoLogoutTimer() {
      if (!this.token) return;

      if (this.autoLogoutTimer) clearTimeout(this.autoLogoutTimer);

      const { exp } = jwtDecode<JwtPayload>(this.token);
      const msUntilExpiry = exp! * 1000 - Date.now();

      if (msUntilExpiry <= 0) {
        this.logout();
        const router = useRouter();
        router.push({ name: 'login' });

        return;
      }

      this.autoLogoutTimer = setTimeout(() => this.logout(), msUntilExpiry);
    },
  },
});
