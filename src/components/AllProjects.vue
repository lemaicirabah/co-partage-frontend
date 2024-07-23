<template>
  <div>
    <h1>All Projects</h1>
    <v-list>
      <v-list-item
        v-for="project in projects"
        :key="project.id"
        @click="goToProjectDetails(project.id)"
      >
        <v-list-item-title>{{ project.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProjectService from '@/services/ProjectService';
import { useRouter } from 'vue-router';

const projects = ref([]);
const router = useRouter();

const fetchProjects = async () => {
  try {
    const response = await ProjectService.getAllProjects();
    projects.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const goToProjectDetails = (id) => {
  router.push(`/projects/details/${id}`);
};

onMounted(fetchProjects);
</script>
