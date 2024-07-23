<template>
  <div>
    <h1>User Details</h1>
    <div v-if="user">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <!-- Add more user details here -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import UserService from '@/services/UserService';

const user = ref(null);
const route = useRoute();

const fetchUserDetails = async () => {
  try {
    const response = await UserService.getUserDetails(route.params.id);
    user.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchUserDetails);
</script>
