<template>
  <v-card v-if="user">
    <v-card-title>{{ user.username }}</v-card-title>
    <v-card-text>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>First Name:</strong> {{ user.profile.firstName }}</p>
      <p><strong>Last Name:</strong> {{ user.profile.lastName }}</p>
      <p><strong>Bio:</strong> {{ user.profile.bio }}</p>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(skill, index) in user.profile.skills"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>{{ skill.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ skill.description }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <p><strong>Projects:</strong></p>
      <v-list>
        <v-list-item
          v-for="(project, index) in user.projects"
          :key="index"
        >
          <v-list-item-content>
            <v-list-item-title>Project ID: {{ project }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

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
  name: 'UserDetails',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
});
</script>

<style scoped>
/* Scoped styles */
</style>