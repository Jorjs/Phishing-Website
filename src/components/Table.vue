<template>
    <v-container class="table-container">
      <v-table
        :items="attempts"
        class="elevation-1"
      >
      <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">Email</th>
        <th class="text-left">Email Content</th>
        <th class="text-left">Opened Link</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in attempts" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.emailContent ? item.emailContent.replace('{id}', item.id) : '' }}</td>
        <td>{{ item.userClicked ? "Yes" : "No"  }}</td>
      </tr>
    </tbody>

      </v-table>
    </v-container>
  </template>
  
  <script lang="ts" setup>
  import { usePhishingStore } from '@/stores/phishing.store';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
  
  const phishingStore = usePhishingStore();

  onMounted(async () => {
    await phishingStore.getAllAttempts()
  })

  const {attempts} = storeToRefs(phishingStore)
  
  const headers = [
    { text: 'ID', value: 'id' },
    { text: 'Recipt Email', value: 'email' },
    { text: 'Email Content', value: 'emailContent' },
    { text: 'Status', value: 'userClicked' },
  ];
  
  </script>
  
  <style scoped>
  .table-container {
    max-width: 1600px;
    margin: auto;
  }
  </style>
  