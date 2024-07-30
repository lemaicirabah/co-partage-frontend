<template>
  <v-container>
    <UserDetails v-if="user" :user="user" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import UserDetails from '../components/UserDetails.vue';
import UserService from '../services/UserService';

interface Skill {
  id: number;
  name: string;
  description: string;
}

interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  bio: string;
  skills: Skill[];
}

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  profile: Profile;
  projects: number[];
}

export default defineComponent({
  name: 'SpecificUser',
  components: {
    UserDetails,
  },
  setup() {
    const user = ref<User | null>(null);
    const route = useRoute();

    const fetchUserDetails = (id: number) => {
      UserService.getUserById(id)
        .then((response) => {
          console.log('Fetched user details:', response.data); // Debug statement
          user.value = response.data;
        })
        .catch((error) => {
          console.error('There was an error fetching the user details:', error);
        });
    };

    onMounted(() => {
      const userId = Number(route.params.id);
      console.log('Route parameter ID:', userId); // Debug statement
      fetchUserDetails(userId);
    });

    return {
      user,
    };
  },
});
</script>

<style scoped>
/* Scoped styles */
</style>