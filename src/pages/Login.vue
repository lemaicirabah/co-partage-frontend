<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="username"
                label="Username"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
            </v-form>
            <v-alert v-if="successMessage" type="success" dismissible>
              {{ successMessage }}
            </v-alert>
            <v-alert v-if="errorMessage" type="error" dismissible>
              {{ errorMessage }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import UserService from '@/services/UserService';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const username = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const router = useRouter();
const userStore = useUserStore();

const login = async () => {
  try {
    const response = await UserService.login(username.value);
    userStore.setUser(response.data); // Set the user in the Pinia store
    successMessage.value = 'Login successful! Redirecting...';
    errorMessage.value = '';
    setTimeout(() => {
      router.push({ name: 'Dashboard' }); // Adjust the path as needed
    }, 2000);
  } catch (error) {
    console.error('Error logging in:', error.response || error);
    successMessage.value = '';
    errorMessage.value = 'Error logging in: ' + (error.response?.data?.message || error.message);
  }
};
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
