<template>
  <v-container fluid>
    <SideNav />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-container>
</template>

<script setup>
import SideNav from '@/components/SideNav.vue';
</script>

<style scoped>
.v-container {
  display: flex;
  flex-direction: row;
}

.v-main {
  flex-grow: 1;
  padding: 20px;
}
</style>
