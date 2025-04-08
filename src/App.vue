<template>
  <v-app>
    <MainLayout/>
  </v-app>
</template>

<script setup lang="ts">

   import MainLayout from '@/layouts/MainLayout.vue';

</script>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  .v-application {
    width: 100%;
    max-width: 100%;
  }

  .v-main {
    width: 100%;
  }
</style>
