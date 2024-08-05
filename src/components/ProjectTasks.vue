<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>My Tasks</v-card-title>
          <v-card-actions>
            <v-btn color="primary" @click="goToAddTask">Add New Task</v-btn>
            <v-btn color="grey" @click="goBack">Cancel</v-btn>
          </v-card-actions>

          <!-- Task List -->
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="task in tasks"
                :key="task.id"
                @click="viewTaskDetails(task.id)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click.stop="editTask(task.id)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon color="red" @click.stop="confirmDelete(task.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Confirmation dialog for deleting a task -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Confirm Delete</v-card-title>
        <v-card-text>Are you sure you want to delete this task?</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="cancelDelete">Cancel</v-btn>
          <v-btn color="red" text @click="deleteTaskConfirmed">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProjectService from '@/services/ProjectService';

const tasks = ref([]);
const router = useRouter();
const route = useRoute();
const projectId = route.params.id;

const deleteDialog = ref(false);
const taskIdToDelete = ref(null);

const fetchTasks = async () => {
  try {
    const response = await ProjectService.getProjectById(projectId);
    tasks.value = response.data.tasks;
  } catch (error) {
    console.error('Failed to load tasks:', error);
  }
};

const goToAddTask = () => {
  router.push({ name: 'AddTask', params: { id: projectId } });
};

const editTask = (taskId) => {
  router.push({ name: 'EditTask', params: { id: projectId, taskId } });
};

const confirmDelete = (taskId) => {
  taskIdToDelete.value = taskId;
  deleteDialog.value = true;
};

const deleteTaskConfirmed = async () => {
  try {
    await ProjectService.deleteTask(projectId, taskIdToDelete.value);
    tasks.value = tasks.value.filter(task => task.id !== taskIdToDelete.value); // Remove the deleted task from the list
    deleteDialog.value = false;
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
};

const cancelDelete = () => {
  deleteDialog.value = false;
};

const viewTaskDetails = (taskId) => {
  router.push({ name: 'TaskDetails', params: { id: projectId, taskId } });
};

const goBack = () => {
  router.push({ name: 'UpdateProjects', params: { id: projectId } });
};

onMounted(fetchTasks);
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
