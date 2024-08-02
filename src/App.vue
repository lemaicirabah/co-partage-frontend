<template>
  <v-app>
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue'
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}
</style>
