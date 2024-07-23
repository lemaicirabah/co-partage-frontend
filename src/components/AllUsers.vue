<template>
  <div>
    <h1>All Users</h1>
    <v-list>
      <v-list-item
        v-for="user in users"
        :key="user.id"
        @click="goToUserDetails(user.id)"
      >
        <v-list-item-title>{{ user.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserService from '@/services/UserService';
import { useRouter } from 'vue-router';

const users = ref([]);
const router = useRouter();

const fetchUsers = async () => {
  try {
    const response = await UserService.getAllUsers();
    users.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const goToUserDetails = (id) => {
  router.push(`/users/specific/${id}`);
};

onMounted(fetchUsers);
</script>
