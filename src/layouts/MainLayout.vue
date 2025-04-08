<template>
    <v-app>
    <!-- Navigation bar at the top -->
      <v-app-bar app>
      <!-- Left: Logo -->
      <v-toolbar-title class="mr-5 d-flex align-center">
        <router-link to="/" class="text-decoration-none" style="color: inherit;">
          <img class="header-logo" src="../assets/images/logo.jpg"/>
        </router-link>
      </v-toolbar-title>

      <v-btn text to="/table">
        Phishing Table
      </v-btn>
      <v-btn text to="/email">
        Send Phishing Email
      </v-btn>

      <v-spacer></v-spacer>

      <template v-if="!user">
        <v-btn text to="/login">
          Login
        </v-btn>
        <v-btn text to="/register">
          Register
        </v-btn>
      </template>
      <template v-else>
        <p class="title">
          {{ user.name }}
        </p>
        <v-btn text  @click="logout">
          LogOut
        </v-btn>
      </template>
    </v-app-bar>
    <!-- Main content area -->
    <v-main>
      <v-container fluid>
        <!-- Render the routed component here -->
        <router-view />
      </v-container>
    </v-main>
  </v-app>

</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { toRefs } from 'vue';

const authStore = useAuthStore();

const {user} = toRefs(authStore)
  
  const logout = () => {
    authStore.logout()
  };

</script>

<style scoped>
.title {
  margin-right: 25px;
}

.text-decoration-none {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.header-logo {
  height: 65px; 
  width: 110px;
}
</style>