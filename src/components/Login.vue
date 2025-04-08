<template>
  <v-container fluid class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <!-- Setting the card's color for a blue background -->
        <v-card  class="pa-4">
          <!-- Centered Login Title -->
          <v-card-title style="margin-bottom: 15px;" class="text-h5 justify-center text-center">Login</v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <!-- Username Field -->
              <v-text-field
                label="Username"
                v-model="username"
                outlined
                :rules="usernameRules"
                class="mb-4"
              ></v-text-field>
              <!-- Password Field with an eye icon inside the field -->
              <v-text-field
                label="Password"
                v-model="password"
                :type="toggleShowPassword ? 'text' : 'password'"
                :append-inner-icon="toggleShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="toggleShowPassword = !toggleShowPassword"
                outlined
                :rules="passwordRules"
                class="mb-4"
              ></v-text-field>
            </v-form>
            <p class="error" v-if="invalidLoginInfo">Invalid username or password</p>
            <p class="error" v-else-if="loginError">Something went wrong</p>
          </v-card-text>
          
          <v-card-actions class="d-flex flex-column">
            <v-btn color="primary" @click="login" block class="mb-2">
              Login
            </v-btn>
            <v-btn color="secondary" @click="register" block>
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';
import { errorMessages } from 'vue/compiler-sfc';

const toggleShowPassword = ref(false);
const username = ref('');
const password = ref('');

const form = ref(null);

const userStore = useAuthStore();

const {invalidLoginInfo, loginError} = storeToRefs(userStore)

const login = async () => {
  const isValid = await form!.value!.validate();
  if (!isValid.valid) return;
  
  await userStore.login(username.value, password.value);
};
const register = () => {
  router.push("register")
};

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
</style>
