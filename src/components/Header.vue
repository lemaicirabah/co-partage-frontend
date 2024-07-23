<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Co-Partage</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" text>Home</v-btn>
    <v-btn to="/projects" text>Projects</v-btn>
    <v-btn to="/users" text>Users</v-btn>
    <v-btn to="/evaluations" text>Evaluations</v-btn>
    <v-btn v-if="!isAuthenticated" to="/login" text>Login</v-btn>
    <v-btn v-if="!isAuthenticated" to="/register" text>Register</v-btn>
    <v-btn v-if="isAuthenticated" @click="logout" text>Logout</v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const isAuthenticated = computed(() => !!localStorage.getItem('token'));

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>

<style scoped>
.v-toolbar-title {
  cursor: pointer;
}
</style>
