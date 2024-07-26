<template>
    <v-card title="All Projects" flat>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        class="pa-2"
      ></v-text-field>
  
      <v-data-table
        :headers="headers"
        :items="projects"
        :search="search"
      ></v-data-table>
    </v-card>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from '@/plugins/axios';
  
  const search = ref('');
  const projects = ref([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get("co-partage/projects");
      projects.value = response.data;
      console.log("Projects loaded:", response.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  });
  </script>
  