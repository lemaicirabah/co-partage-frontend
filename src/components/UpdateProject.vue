<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h5">Update Project</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="updateProject">
              <v-text-field
                v-model="project.id"
                label="Project ID"
                :rules="[rules.required]"
                required
                @input="checkID" 
              ></v-text-field>
              <v-text-field
                v-model="project.title"
                label="Project Title"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-text-field
                v-model="project.creator"
                label="Creator ID"
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
            </v-form>
          </v-card-text>
        </v-card>
        
        <!-- Search and Manage Buttons -->
        <v-text-field
          v-model="searchProjectId"
          label="Enter Project ID for Management"
          class="mt-4"
        ></v-text-field>
        
        <v-row>
          <v-col>
            <v-btn
              color="primary"
              :disabled="!isSearchIDFilled"
              class="mt-3 mr-2"
              @click="goToTasks(searchProjectId)"
            >
              <v-icon left>mdi-format-list-bulleted</v-icon>
              Manage Tasks
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="primary"
              :disabled="!isSearchIDFilled"
              class="mt-3"
              @click="goToMembers(searchProjectId)"
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
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ProjectService from '@/services/ProjectService';

const router = useRouter();
const project = ref({
  id: '',
  title: '',
  creator: '',
  description: ''
});
const form = ref(null);
const valid = ref(false);
const isIDFilled = ref(false);  // To track if the Project ID is filled

const searchProjectId = ref('');
const isSearchIDFilled = ref(false); // To track if the search Project ID is filled

const rules = {
  required: value => !!value || 'Required.',
};

const updateProject = async () => {
  if (form.value.validate()) {
    try {
      await ProjectService.updateProject(project.value.id, project.value);
      router.push({ name: 'AllProjects' });  // Navigate back to the project list after update
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  }
};

const goToTasks = (projectId) => {
  router.push({ name: 'ProjectTasks', params: { id: projectId } });
};

const goToMembers = (projectId) => {
  router.push({ name: 'ProjectMembers', params: { id: projectId } });
};

// Watcher to enable/disable manage buttons based on search Project ID input
watch(() => searchProjectId.value, (newID) => {
  isSearchIDFilled.value = !!newID;
});

// Watcher to enable/disable manage buttons based on Project ID input
watch(() => project.value.id, (newID) => {
  isIDFilled.value = !!newID;
});
</script>
