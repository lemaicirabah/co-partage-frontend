<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";

  export default defineComponent({
    name: "DefaultLayout",
    components: {
      Header,
      Footer,
    },
  });
</script>

<style>
  /* Add any global styles if needed */
</style>
