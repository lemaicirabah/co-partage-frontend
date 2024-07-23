<template>
  <div>
    <h1>Project Details</h1>
    <div v-if="project">
      <h2>{{ project.name }}</h2>
      <p>{{ project.description }}</p>
      <!-- Add more project details here -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProjectService from '@/services/ProjectService';

const project = ref(null);
const route = useRoute();

const fetchProjectDetails = async () => {
  try {
    const response = await ProjectService.getProjectDetails(route.params.id);
    project.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchProjectDetails);
</script>
