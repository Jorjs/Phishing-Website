<template>
  <v-container>
    <v-card>

      <v-toolbar flat density="comfortable">
        <v-toolbar-title>Phishing Attempts</v-toolbar-title>
        <v-spacer />
        <v-chip color="primary" class="mr-2">
          {{ attempts.length }} total
        </v-chip>
      </v-toolbar>

      <v-data-table
        :items="attempts"
        :headers="headers"
        v-model:page="page"               
        v-model:items-per-page="itemsPerPage"
        :items-per-page-options="[5,10,20,50]"
        class="elevation-1"
        fixed-header
        height="460"
        show-current-page
      >
        <template #item.emailContent="{ item }">
          {{ item.emailContent?.replace('{id}', item.id) }}
        </template>
        <template #item.sent="{ item }">
          <v-chip :color="item.sent ? 'success' : 'grey-darken-1'" size="small">
            {{ item.sent ? 'Yes' : 'No' }}
          </v-chip>
        </template>
        <template #item.userClicked="{ item }">
          <v-chip :color="item.userClicked ? 'success' : 'grey-darken-1'" size="small">
            {{ item.userClicked ? 'Yes' : 'No' }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
  
<script lang="ts" setup>
  import { createSocket } from '@/services/socket.service';
  import { usePhishingStore } from '@/stores/phishing.store';
  import { storeToRefs } from 'pinia';
  import type { Socket } from 'socket.io-client';
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  
  const phishingStore = usePhishingStore();
  let socket: Socket | null = null;

  const {attempts} = storeToRefs(phishingStore)
  const page          = ref(1);
  const itemsPerPage  = ref(10);

const headers = [
  { title: 'ID',           value: 'id',           class: 'table-header' },
  { title: 'Email',        value: 'email',        class: 'table-header' },
  { title: 'Email Content',value: 'emailContent', class: 'table-header' },
  { title: 'Sent',         value: 'sent',         class: 'table-header' },
  { title: 'Opened Link',  value: 'userClicked',  class: 'table-header' },
];

  onMounted(async () => {
    await phishingStore.getAllAttempts()
    socket = createSocket();    
    socket.on('new-attempt', attempt => attempts.value.unshift(attempt));
    socket.on('update-attempt', id => {
      const attempt = attempts.value.find(a => a.id === id);
      if (attempt) attempt.userClicked = true;
    }); 
  });

  onBeforeUnmount(() => {
    if (!socket) return;

    socket.off('new-attempt');
    socket.disconnect();
  });

</script>
  
  <style scoped>
.table-header {
  background: #f5f7fa;        /* light grey */
  color: #37474f;             /* dark text */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
  </style>
  