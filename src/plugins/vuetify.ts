import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VTimePicker } from 'vuetify/labs/VTimePicker';

export default createVuetify({
  components: {
    ...components,
    VTimePicker,
  },
  directives,
  defaults: {
    VBtn: {
      variant: 'flat',
      rounded: true,
    },
    VCard: {
      rounded: 'lg',
      elevation: 0,
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
    },
  },
});
