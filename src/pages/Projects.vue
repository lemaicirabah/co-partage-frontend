<template>
  <v-container fluid>
    <SideNav />
    <v-main>
      <div v-if="selectedProjectId !== null">
        <ProjectDetails :projectId="selectedProjectId" @back="selectedProjectId = null" />
      </div>
      <div v-else>
        <h1>All Projects</h1>
        <v-text-field
          v-model="searchQuery"
          label="Search Projects"
          prepend-inner-icon="mdi-magnify"
          outlined
          clearable
          class="mb-4"
        ></v-text-field>
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel v-for="project in filteredProjects" :key="project.id">
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
                  <v-list-item-subtitle>{{ project.description }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-main>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import SideNav from '@/components/SideNav.vue';
import ProjectDetails from '@/components/ProjectDetails.vue';
import ProjectService from '@/services/ProjectService';

interface Project {
  id: number;
  title: string;
  description: string;
}

export default defineComponent({
  name: 'Projects',
  components: {
    SideNav,
    ProjectDetails,
  },
  setup() {
    const projects = ref<Project[]>([]);
    const selectedProjectId = ref<number | null>(null);
    const panel = ref<number[]>([]);
    const searchQuery = ref<string>('');
    const router = useRouter();

    const fetchProjects = async () => {
      try {
        const response = await ProjectService.getAllProjects();
        projects.value = response.data;
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    };

    const goToProjectDetails = (id: number) => {
      if (!id) {
        console.error('Project ID is undefined');
        return;
      }
      selectedProjectId.value = id;
      router.push({ name: 'ProjectDetails', params: { id: id.toString() } });
    };

    const filteredProjects = computed(() => {
      return projects.value.filter(project => 
        project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    onMounted(fetchProjects);

    return {
      projects,
      selectedProjectId,
      panel,
      searchQuery,
      filteredProjects,
      fetchProjects,
      goToProjectDetails,
    };
  },
});
</script>

<style scoped>
.v-container {
  display: flex;
  flex-direction: row;
}

.v-main {
  flex-grow: 1;
  padding: 20px;
}

.project-id-title {
  font-weight: bold;
}
</style>
