<template>
  <v-navigation-drawer app permanent color="grey-lighten-4">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">{{ navTitle }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        v-for="link in navLinks"
        :key="link.path"
        @click="navigate(link.path)"
      >
        <v-list-item-title>{{ link.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'SideNav',
  setup() {
    const router = useRouter();
    const route = useRoute();

    const navLinks = computed(() => {
      switch (route.name) {
        case 'Projects':
          return [
           
            // Add more project-specific links here
          ];
        case 'Users':
          return [
            { name: 'All Users', path: '/users/all' },
            // Add more user-specific links here
          ];
        case 'Evaluations':
          return [
            // Add more evaluation-specific links here
          ];
        default:
          return [];
      }
    });

    const navTitle = computed(() => {
      switch (route.name) {
        case 'Projects':
          return 'Projects Navigation';
        case 'Users':
          return 'Users Navigation';
        case 'Evaluations':
          return 'Evaluations Navigation';
        default:
          return 'Navigation';
      }
    });

    const navigate = (path) => {
      router.push(path);
    };

    return {
      navLinks,
      navTitle,
      navigate,
    };
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
}
</style>