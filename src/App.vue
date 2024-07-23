<template>
  <v-app>
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app padless>
      <v-col class="text-center">
        <div>© {{ currentYear }} Co-Partage. All rights reserved.</div>
        <div>{{ currentDate }}</div>
        <div>Contact: support@co-partage.com</div>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/Header.vue';

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

<style>
body {
  font-family: 'Roboto', sans-serif;
}

.v-footer {
  background-color: #3f51b5;
  color: white;
  padding: 10px 0;
}

.v-footer .text-center {
  text-align: center;
}
</style>
