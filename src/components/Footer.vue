<template>
  <v-footer app border color="grey-lighten-4">
      <v-col class="text-center">
        <div>© {{ currentYear }} Co-Partage. All rights reserved.</div>
        <div>{{ currentDate }}</div>
        <div>Contact: support@co-partage.com</div>
      </v-col>
  </v-footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const currentYear = new Date().getFullYear();
const currentDate = ref('');

const updateDate = () => {
  const date = new Date();
  currentDate.value = date.toLocaleString();
};

onMounted(() => {
  updateDate();
  setInterval(updateDate, 1000); // Update the date every second
});
</script>

<style scoped>
</style>
