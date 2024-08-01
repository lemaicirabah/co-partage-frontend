<template>
  <div>
    <h1>All Projects</h1>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel v-for="project in projects" :key="project.id">
        <v-expansion-panel-header>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="project-id-title">
                <h2>Project #{{ project.id }}</h2>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list-item @click="goToProjectDetails(project.id)">
            <v-list-item-content>
              <v-list-item-title>{{ project.title }}</v-list-item-title>
              <v-list-item-subtitle>{{
                project.description
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ProjectService from "@/services/ProjectService";

const projects = ref([]);
const router = useRouter();
const panel = ref([]); // Tracks which panels are open

const fetchProjects = async () => {
  try {
    const response = await ProjectService.getAllProjects();
    projects.value = response.data;
  } catch (error) {
    console.error("Failed to load projects:", error);
  }
};

const goToProjectDetails = (id) => {
  if (!id) {
    console.error("Project ID is undefined");
    return;
  }
  router.push({ name: "ProjectDetails", params: { id } });
};

onMounted(fetchProjects);
</script>
