<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field
                v-model="username"
                label="Username"
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
              <v-text-field
                v-model="firstName"
                label="First Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="lastName"
                label="Last Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="bio"
                label="Bio"
                required
              ></v-text-field>
              <v-text-field
                v-model="skillName"
                label="Skill Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="skillDescription"
                label="Skill Description"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Register</v-btn>
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
import axios from '@/plugins/axios';
import { useRouter } from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const bio = ref('');
const skillName = ref('');
const skillDescription = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const router = useRouter();

const register = async () => {
  try {
    const user = {
      username: username.value,
      email: email.value,
      password: password.value,
      profile: {
        firstName: firstName.value,
        lastName: lastName.value,
        bio: bio.value,
        skills: [
          {
            name: skillName.value,
            description: skillDescription.value
          }
        ]
      }
    };
    await axios.post('/co-partage/users', user);
    successMessage.value = 'Registration successful! Redirecting to login...';
    errorMessage.value = '';
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (error) {
    successMessage.value = '';
    errorMessage.value = 'Error registering user: ' + (error.response?.data?.message || error.message);
  }
};
</script>

<style scoped>
v-container {
  margin-top: 20px;
}
</style>