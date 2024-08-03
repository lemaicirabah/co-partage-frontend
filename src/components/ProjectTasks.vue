<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Project Tasks</v-card-title>
          <v-btn color="primary" @click="goToAddTask">Add New Task</v-btn>

          <!-- Search Task -->
          <v-text-field
            v-model="taskId"
            label="Enter Task ID"
            type="number"
            class="mt-4"
          ></v-text-field>
          <v-btn color="primary" @click="fetchTask">Search Task</v-btn>

          <!-- Task Details -->
          <v-list v-if="task">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ task.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="editTask(task.id)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="red" @click="deleteTask(task.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProjectService from '@/services/ProjectService'; // Import your project service

const task = ref(null);
const taskId = ref('');
const router = useRouter();
const route = useRoute();
const projectId = route.params.id;

const fetchTask = async () => {
  if (!taskId.value) {
    console.error('Task ID is required');
    return;
  }
  try {
    const response = await ProjectService.getTask(projectId, taskId.value);
    task.value = response.data;
  } catch (error) {
    console.error('Failed to load task:', error);
    task.value = null; // Clear the task if not found
  }
};

const goToAddTask = () => {
  router.push({ name: 'AddTask', params: { id: projectId } });
};

const editTask = (taskId) => {
  router.push({ name: 'EditTask', params: { id: projectId, taskId } });
};

const deleteTask = async (taskId) => {
  try {
    await ProjectService.deleteTask(projectId, taskId);
    task.value = null; // Clear the task after deletion
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
};
</script>
