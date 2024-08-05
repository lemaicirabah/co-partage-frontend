<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="text-h5">
              {{ task ? task.title : 'Loading...' }}
            </v-card-title>
            <v-card-subtitle>
              Task Details
            </v-card-subtitle>
            <v-card-text>
              <v-container>
                <div v-if="task">
                  <v-row>
                    <v-col cols="12">
                      <h3>Description:</h3>
                      <p>{{ task.description }}</p>
                    </v-col>
                    <v-col cols="12">
                      <h3>Assignee:</h3>
                      <p>{{ task.assignee ? task.assignee : 'Unassigned' }}</p>
                    </v-col>
                    <v-col cols="12">
                      <h3>Status:</h3>
                      <p>{{ task.status }}</p>
                    </v-col>
                    <v-col cols="12">
                      <h3>Deadline:</h3>
                      <p>{{ task.deadline }}</p>
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
  
  const task = ref(null);
  const route = useRoute();
  const router = useRouter();
  const projectId = route.params.id;
  const taskId = route.params.taskId;
  
  const fetchTaskDetails = async () => {
    try {
      const response = await ProjectService.getTask(projectId, taskId);
      task.value = response.data;
    } catch (error) {
      console.error('Failed to load task details:', error);
    }
  };
  
  const goBack = () => {
    router.push({ name: 'ProjectTasks', params: { id: projectId } });
  };
  
  onMounted(fetchTaskDetails);
  </script>
  
  <style scoped>
  .v-container {
    margin-top: 20px;
  }
  </style>
  