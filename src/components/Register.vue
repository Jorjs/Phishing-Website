<template>
    <v-container fluid class="fill-height d-flex align-center justify-center">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="pa-4">
            <v-card-title style="margin-bottom: 15px;" class="text-h5 text-center">
              Register
            </v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field
                  label="First Name"
                  v-model="name"
                  outlined
                  class="mb-4"
                  :rules="nameRules"
                ></v-text-field>
  
                <v-text-field
                  label="Last Name"
                  v-model="lastName"
                  outlined
                  class="mb-4"
                  :rules="lastNameRules"
                ></v-text-field>
  
                <v-text-field
                  label="Email"
                  v-model="email"
                  outlined
                  type="email"
                  class="mb-4"
                  :rules="emailRules"
                ></v-text-field>
  
                <v-text-field
                  label="Username"
                  v-model="username"
                  outlined
                  class="mb-4"
                  :rules="usernameRules"
                ></v-text-field>
  
                <v-text-field
                  label="Password"
                  v-model="password"
                  :type="toggleShowPassword ? 'text' : 'password'"
                  :append-inner-icon="toggleShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="toggleShowPassword = !toggleShowPassword"
                  outlined
                  class="mb-4"
                  :rules="passwordRules"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="d-flex flex-column">
              <v-btn color="primary" @click="registerUser" block class="mb-2">
                Register
              </v-btn>
              <v-btn text color="secondary" @click="goToLogin" block>
                Already have an account? Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
    
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth.store';
  
  const form = ref();
  
  const name = ref('');
  const lastName = ref('');
  const email = ref('');
  const username = ref('');
  const password = ref('');
  const toggleShowPassword = ref(false);
  
  // Validation rules for each field
  const nameRules = [
    (v: string) => !!v || 'First Name is required',
  ];
  const lastNameRules = [
    (v: string) => !!v || 'Last Name is required',
  ];
  const emailRules = [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
  ];
  const usernameRules = [
    (v: string) => !!v || 'Username is required',
  ];
  const passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) => v.length >= 8 || 'Password must be at least 8 characters long',
    (v: string) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(v) ||
      'Password must contain uppercase, lowercase letters, and a number',
  ];
  
  const router = useRouter();
  const userStore = useAuthStore();
  
  const registerUser = async () => {
    const isValid = await form!.value!.validate();
    if (!isValid.valid) return;
  
    userStore.register(
      name.value,
      lastName.value,
      email.value,
      username.value,
      password.value,
    );
  };
  
  const goToLogin = () => {
    router.push({ name: 'login' });
  };
  
  </script>
    
  <style scoped>
  .fill-height {
    height: 100vh;
  }
  .mb-4 {
    margin-bottom: 1rem;
  }
  </style>
  