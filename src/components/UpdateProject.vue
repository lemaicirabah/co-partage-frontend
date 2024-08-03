<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h5">Update Project</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="updateProject">
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
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="updateProject"
              >
                Update
              </v-btn>
              <v-btn @click="cancel" color="grey">Cancel</v-btn>
            </v-form>
          </v-card-text>
        </v-card>

        <v-row class="mt-4">
          <v-col>
            <v-btn
              color="primary"
              @click="goToTasks"
              class="mr-2"
            >
              <v-icon left>mdi-format-list-bulleted</v-icon>
              Manage Tasks
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="primary"
              @click="goToMembers"
            >
              <v-icon left>mdi-account-group</v-icon>
              Manage Members
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProjectService from '@/services/ProjectService';

const router = useRouter();
const route = useRoute();
const project = ref({
  title: '',
  description: ''
});
const form = ref(null);
const valid = ref(false);

const rules = {
  required: value => !!value || 'Required.',
};

const fetchProject = async (id) => {
  try {
    const response = await ProjectService.getProjectById(id);
    project.value = response.data;
  } catch (error) {
    console.error('Failed to fetch project:', error);
  }
};

const updateProject = async () => {
  if (form.value.validate()) {
    try {
      await ProjectService.updateProject(route.params.id, project.value);
      router.push({ name: 'Dashboard' });
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  }
};

const cancel = () => {
  router.push({ name: 'Dashboard' });
};

const goToTasks = () => {
  router.push({ name: 'ProjectTasks', params: { id: route.params.id } });
};

const goToMembers = () => {
  router.push({ name: 'ProjectMembers', params: { id: route.params.id } });
};

onMounted(() => {
  fetchProject(route.params.id);
});

watch(() => route.params.id, (newId) => {
  fetchProject(newId);
});
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
