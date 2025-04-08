import type { AuthState, TError } from '@/models/auth.store.models';
import { defineStore } from 'pinia';
import { VueCookieNext } from 'vue-cookie-next';
import {login, register} from '../services/auth.service'
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: VueCookieNext.getCookie('token') || null,
    sessionTime: VueCookieNext.getCookie('session') || null,
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
    logged: !!VueCookieNext.getCookie('user'),
    message: null as TError | null,
    loginError: null as TError | null,
    invalidLoginInfo: false,
    isLoadingUser: true,
  }),
  actions: {
    async login(username: string, password: string) {
      this.isLoadingUser = true;
      const { data, message } = await login(username, password);
      this.isLoadingUser = false;

      if(data) {
        this.user = data.user
        router.push({ name: 'table' });
      }

      if (message) {
        if(message.status == 401) {
         this.invalidLoginInfo = true;
        }
        this.message = message;
        this.loginError = message;
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
        const { message } = await register(name, lastName, email, username, password);

        if (message) {
          this.message = message;
        }
    },
    logout() {
      try {
        this.user = null;
        this.logged = false;
        this.sessionTime = null;
        router.push('/login');
        reselAllStores();
      } catch (e: any) {
        console.log('logout catch e: ', e);
        this.message = e.message as TError;
      }
    },
  },
});

const reselAllStores = () => {
  VueCookieNext.removeCookie('user');
  VueCookieNext.removeCookie('token');
  VueCookieNext.removeCookie('verify-user');
};
