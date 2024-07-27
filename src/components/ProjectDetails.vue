<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h5">
            {{ project ? project.title : 'Loading...' }}
          </v-card-title>
          <v-card-subtitle>
            Project Details
          </v-card-subtitle>
          <v-card-text>
            <v-container>
              <div v-if="project">
                <v-row>
                  <v-col cols="12">
                    <h3>Description:</h3>
                    <p>{{ project.description }}</p>
                  </v-col>
                  <v-col cols="12">
                    <h3>Creator ID:</h3>
                    <p>{{ project.creator }}</p>
                  </v-col>
                  <v-col cols="12">
                    <h3>Members:</h3>
                    <v-chip-group>
                      <v-chip 
                        v-for="member in project.members" 
                        :key="member" 
                        color="blue" 
                        dark
                      >
                        Member ID: {{ member }}
                      </v-chip>
                    </v-chip-group>
                  </v-col>
                  <v-col cols="12">
                    <h3>Evaluations:</h3>
                    <v-chip-group>
                      <v-chip 
                        v-for="evaluation in project.evaluations" 
                        :key="evaluation" 
                        color="green" 
                        dark
                      >
                        Evaluation ID: {{ evaluation }}
                      </v-chip>
                    </v-chip-group>
                  </v-col>
                  <v-col cols="12">
                    <h3>Tasks:</h3>
                    <v-list>
                      <v-list-item 
                        v-for="task in project.tasks" 
                        :key="task.id"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{ task.name }}</v-list-item-title>
                          <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </div>
              <div v-else>
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="goBack">Go Back</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProjectService from '@/services/ProjectService';

const project = ref(null);
const route = useRoute();
const router = useRouter();

const fetchProjectDetails = async () => {
  console.log("Fetching details for project ID:", route.params.id); // Displays the used ID
  if (!route.params.id) {
    console.error('Project ID is undefined');
    return;
  }
  try {
    const response = await ProjectService.getProjectDetails(route.params.id);
    project.value = response.data;
  } catch (error) {
    console.error("Failed to fetch project details:", error);
  }
};

const goBack = () => {
  router.back();
};

onMounted(fetchProjectDetails);
</script>
