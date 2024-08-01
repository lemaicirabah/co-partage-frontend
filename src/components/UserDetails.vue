<template>
  <v-container>
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
            v-for="(project, index) in projects"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>{{ project.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ project.description }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-btn @click="$emit('back')" color="primary">Back to All Users</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import UserService from '@/services/UserService';
import ProjectService from '@/services/ProjectService';

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

interface Project {
  id: number;
  title: string;
  description: string;
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
  setup() {
    const route = useRoute();
    const user = ref<User | null>(null);
    const projects = ref<Project[]>([]);

    const fetchUser = async () => {
      console.log('Route params:', route.params); // Debugging line
      try {
        const response = await UserService.getUserById(Number(route.params.id));
        console.log('Fetched user data:', response.data); // Debugging line
        user.value = response.data;

        // Fetch project details for each project ID
        if (user.value) {
          const projectPromises = user.value.projects.map((projectId) =>
            ProjectService.getProjectById(projectId).then((res) => res.data)
          );
          projects.value = await Promise.all(projectPromises);
        }
      } catch (error) {
        console.error('There was an error fetching the user details!', error);
      }
    };

    onMounted(fetchUser);

    return {
      user,
      projects,
    };
  },
});
</script>

<style scoped>
/* Scoped styles */
</style>