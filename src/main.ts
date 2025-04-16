import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from '../src/plugins/vuetify';

import App from './App.vue'
import router from './router'

//import '@/assets/styles/main.scss';
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App)
const pinia = createPinia();

app
  .use(router)
  .use(vuetify)
  .use(pinia)
  .mount('#app');