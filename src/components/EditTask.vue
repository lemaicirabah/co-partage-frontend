<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h5">Edit Task</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="updateTask">
              <v-text-field
                v-model="task.title"
                label="Task Title"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-textarea
                v-model="task.description"
                label="Task Description"
                :rules="[rules.required]"
                required
              ></v-textarea>
              <v-text-field
                v-model="task.assignee"
                label="Assignee ID"
                :rules="[rules.required]"
                required
                readonly
              ></v-text-field>
              <v-select
                v-model="task.status"
                :items="['TODO', 'IN_PROGRESS', 'COMPLETED']"
                label="Status"
                :rules="[rules.required]"
                required
              ></v-select>
              <v-text-field
                v-model="task.deadline"
                label="Deadline"
                type="date"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="updateTask"
              >
                Update Task
              </v-btn>
              <v-btn @click="cancel" color="grey">Cancel</v-btn>
            </v-form>
            <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" top right>
              {{ snackbar.text }}
              <v-btn color="red" text @click="snackbar.show = false">Close</v-btn>
            </v-snackbar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProjectService from '@/services/ProjectService';

const router = useRouter();
const route = useRoute();
const projectId = route.params.id;
const taskId = route.params.taskId;
const task = ref({
  title: '',
  description: '',
  assignee: '',
  status: '',
  deadline: ''
});
const form = ref(null);
const valid = ref(false);
const snackbar = ref({
  show: false,
  text: '',
  timeout: 3000
});

const rules = {
  required: value => !!value || 'Required.',
};

const fetchTask = async () => {
  try {
    const response = await ProjectService.getTask(projectId, taskId);
    task.value = response.data;
  } catch (error) {
    console.error('Failed to load task:', error);
  }
};

const updateTask = async () => {
  if (form.value.validate()) {
    try {
      await ProjectService.updateTask(projectId, taskId, task.value);
      snackbar.value.text = 'Task updated successfully!';
      snackbar.value.show = true;
      setTimeout(() => {
        router.push({ name: 'ProjectTasks', params: { id: projectId } });
      }, 2000);
    } catch (error) {
      console.error('Failed to update task:', error);
      snackbar.value.text = 'Failed to update task.';
      snackbar.value.show = true;
    }
  }
};

const cancel = () => {
  router.push({ name: 'ProjectTasks', params: { id: projectId } });
};

onMounted(fetchTask);
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
