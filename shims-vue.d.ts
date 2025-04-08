// src/shims-vue.d.ts

// Existing declaration to handle importing .vue files
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Augment the Vue component instance with $vuetify
import 'vue';
import { Vuetify } from 'vuetify';

declare module 'vue' {
  interface ComponentCustomProperties {
    $vuetify: Vuetify;
  }
}


