<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h5">Create New Project</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="createProject">
              <v-text-field
                v-model="project.title"
                label="Project Title"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-textarea
                v-model="project.description"
                label="Project Description"
                :rules="[rules.required]"
              ></v-textarea>
              <v-btn :disabled="!valid" color="success" class="mr-4" @click="createProject">
                Create
              </v-btn>
              <v-btn @click="cancel">Cancel</v-btn>
            </v-form>
            <v-alert v-if="success" type="success" class="mt-4">
              Project created successfully!
              <v-btn color="primary" @click="goToProjects" class="ml-2">Go to Projects</v-btn>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ProjectService from '@/services/ProjectService';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const userStore = useUserStore();
const user = ref(userStore.user);
const project = ref({
  title: '',
  description: '',
});
const form = ref(null);
const valid = ref(false);
const success = ref(false);

const rules = {
  required: value => !!value || 'Required.',
};

const createProject = async () => {
  if (form.value.validate()) {
    try {
      if (user.value && user.value.id) {
        const response = await ProjectService.createProject(user.value.id, project.value);
        userStore.addProject(response.data); // Add the new project to the store
        success.value = true;
      } else {
        console.error('User ID is not available');
      }
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  }
};

const cancel = () => {
  router.push({ name: 'Dashboard' }); 
};

const goToProjects = () => {
  userStore.logout();
  router.push({ name: 'Projects' }); // Redirect to Projects page
};

onMounted(() => {
  user.value = userStore.user;
  if (!user.value) {
    console.error('User is not authenticated');
  }
});
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
