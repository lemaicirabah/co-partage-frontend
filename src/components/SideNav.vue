<template>
  <v-navigation-drawer app permanent>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">{{ currentSection }} Navigation</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
      >
        <v-list-item-title>{{ link.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const navLinks = computed(() => {
  switch (route.name) {
    case 'Projects':
      return [
        { name: 'All Projects', path: '/projects/all' }
      ];
    case 'Users':
      return [
        { name: 'All Users', path: '/users/all' },
        { name: 'Specific User', path: '/users/specific' },
      ];
    case 'Evaluations':
      return [
        { name: 'All Evaluations', path: '/evaluations/all' },
        { name: 'Evaluation Details', path: '/evaluations/details' },
      ];
    default:
      return [];
  }
});

const currentSection = computed(() => route.name);
</script>

<style scoped>
.title {
  font-weight: bold;
}
</style>
