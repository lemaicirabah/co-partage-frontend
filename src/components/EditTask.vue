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
              </v-form>
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
        router.push({ name: 'ProjectTasks', params: { id: projectId } });
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    }
  };
  
  onMounted(fetchTask);
  </script>
  