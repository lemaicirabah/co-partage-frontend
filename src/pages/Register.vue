<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field
                v-model="name"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Register</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from '@/plugins/axios';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const register = async () => {
  try {
    await axios.post('/auth/register', { name: name.value, email: email.value, password: password.value });
    router.push('/login');
  } catch (error) {
    console.error('Error registering:', error);
  }
};
</script>

<style scoped>
v-container {
  margin-top: 20px;
}
</style>
