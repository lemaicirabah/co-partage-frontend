<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Manage Project Members</v-card-title>
          <v-btn color="primary" @click="goToAddMember">Add New Member</v-btn>

          <!-- Search and Delete Member -->
          <v-text-field
            v-model="memberId"
            label="Enter Member ID to Delete"
            type="number"
            class="mt-4"
          ></v-text-field>
          <v-btn color="red" @click="deleteMember">Delete Member</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar Notification -->
    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" top right>
      {{ snackbar.text }}
      <v-btn color="red" text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProjectService from '@/services/ProjectService';

const memberId = ref('');
const router = useRouter();
const route = useRoute();
const projectId = route.params.id;

const snackbar = ref({
  show: false,
  text: '',
  timeout: 3000
});

const goToAddMember = () => {
  router.push({ name: 'AddMember', params: { id: projectId } });
};

const deleteMember = async () => {
  if (!memberId.value) {
    console.error('Member ID is required');
    snackbar.value.text = 'Member ID is required';
    snackbar.value.show = true;
    return;
  }
  try {
    await ProjectService.deleteMember(projectId, memberId.value);
    memberId.value = ''; // Clear the input after deletion
    snackbar.value.text = 'Member deleted successfully';
    snackbar.value.show = true;
    console.log('Member deleted successfully');
  } catch (error) {
    console.error('Failed to delete member:', error);
    snackbar.value.text = 'Failed to delete member';
    snackbar.value.show = true;
  }
};
</script>
