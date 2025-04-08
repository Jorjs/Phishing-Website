import { defineStore } from 'pinia';
import { VueCookieNext } from 'vue-cookie-next';
import type { PhishingState } from '@/models/phishing.store.models';
import { getAllAttempts } from '@/services/phishing.service';

export const usePhishingStore = defineStore('phishing', {
  state: (): PhishingState => ({
    attempts: []
  }),
  actions: {
    async getAllAttempts() {
      const data= await getAllAttempts();

      if(data) {
        this.attempts = data;
      }
    },
    resetPhishing() {
      this.attempts = [];
    },
  },
});
