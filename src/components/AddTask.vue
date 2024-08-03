<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h5">Add New Task</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="addTask">
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
                @click="addTask"
              >
                Add Task
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProjectService from '@/services/ProjectService';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const route = useRoute();
const projectId = route.params.id;
const userStore = useUserStore();
const task = ref({
  title: '',
  description: '',
  assignee: userStore.user.id, // Assign the task to the current user
  status: '',
  deadline: ''
});
const form = ref(null);
const valid = ref(false);

const rules = {
  required: value => !!value || 'Required.',
};

const addTask = async () => {
  if (form.value.validate()) {
    try {
      await ProjectService.createTask(projectId, task.value);
      router.push({ name: 'ProjectTasks', params: { id: projectId } });
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  }
};
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
