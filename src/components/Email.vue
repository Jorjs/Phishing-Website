<template>
    <v-container fluid class="fill-height d-flex align-center justify-center">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="pa-4">
            <v-card-title class="text-h5 text-center">Send Phishing Email</v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  label="Email"
                  v-model="email"
                  outlined
                  :rules="emailRules"
                  class="mb-4"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <div v-if="notification.message" :class="notification.type">
                {{ notification.message }}
            </div>
            <v-card-actions class="justify-center">
              <v-btn color="primary" @click="sendPhishingEmail">
                Send
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import {sendEmail} from '../services/phishing.service'
  
  const email = ref('');

  const form = ref();

  const notification = ref<{ message: string; type: string }>({
        message: '',
        type: ''
    });

  const emailRules = [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
  ];
  
  const sendPhishingEmail = async () => {
    const isValid = await form!.value!.validate();
    if (!isValid.valid) return;

    const result = await sendEmail(email.value)
    
    if(result == 400) {
        notification.value = {
        message: 'Failed to send email',
        type: 'error'
      };
    }
    else {
        notification.value = {
        message: 'An unexpected error occurred',
        type: 'error'
      };
    }
  };
  </script>
  
  <style scoped>
  .fill-height {
    height: 100vh;
  }
  .mb-4 {
    margin-bottom: 1rem;
  }
  .error {
  color: red;
  text-align: center;
}
.success {
  color: red;
  text-align: center;
}
  </style>
  