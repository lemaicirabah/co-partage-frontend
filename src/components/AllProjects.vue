<template>
  <div>
    <DataTable :projects="projects"/>
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


onMounted(fetchProjects);
</script>
