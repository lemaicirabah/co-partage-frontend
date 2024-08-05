<template>
  <v-container>
    <h1 class="my-4">Manage Project Members</h1>

    <!-- Go Back Button -->
    <v-btn color="primary" class="mb-4" @click="goBack">Go Back</v-btn>

    <!-- Member List -->
    <h2>Project Members</h2>
    <v-row>
      <v-col v-for="member in members" :key="member.id" cols="12" sm="6" md="4">
        <v-card class="user-card" color="grey-lighten-3">
          <v-card-title>
            <v-avatar left color="primary">
              <span class="user-avatar">{{ member.id }}</span>
            </v-avatar>
            <span class="ml-3">{{ member.username }}</span>
          </v-card-title>
          <v-card-subtitle>{{ member.email }}</v-card-subtitle>
          <v-card-actions>
            <v-btn color="red" @click.stop="deleteMember(member.id)">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- User List for Adding Members -->
    <h2 class="mt-4">Add New Member</h2>
    <v-row>
      <v-col v-for="user in nonMembers" :key="user.id" cols="12" sm="6" md="4">
        <v-card class="user-card" color="grey-lighten-3">
          <v-card-title>
            <v-avatar left color="primary">
              <span class="user-avatar">{{ user.id }}</span>
            </v-avatar>
            <span class="ml-3">{{ user.username }}</span>
          </v-card-title>
          <v-card-subtitle>{{ user.email }}</v-card-subtitle>
          <v-card-actions>
            <v-btn color="green" @click.stop="addMember(user.id)">Add</v-btn>
          </v-card-actions>
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
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProjectService from '@/services/ProjectService';
import UserService from '@/services/UserService';

const members = ref([]);
const allUsers = ref([]);
const nonMembers = ref([]);
const snackbar = ref({
  show: false,
  text: '',
  timeout: 3000
});

const router = useRouter();
const route = useRoute();
const projectId = route.params.id;

const fetchMembers = async () => {
  try {
    const response = await ProjectService.getProjectById(projectId);
    const memberIds = response.data.members;
    const memberPromises = memberIds.map((id) => UserService.getUserById(id));
    const memberResponses = await Promise.all(memberPromises);
    members.value = memberResponses.map((res) => res.data);
    updateNonMembers();
  } catch (error) {
    console.error('Failed to load members:', error);
  }
};

const fetchAllUsers = async () => {
  try {
    const response = await UserService.getAllUsers();
    allUsers.value = response.data;
    updateNonMembers();
  } catch (error) {
    console.error('Failed to load users:', error);
  }
};

const updateNonMembers = () => {
  const memberIds = new Set(members.value.map((member) => member.id));
  nonMembers.value = allUsers.value.filter((user) => !memberIds.has(user.id));
};

const addMember = async (userId) => {
  try {
    await ProjectService.addMember(projectId, userId);
    await fetchMembers(); // Reload the member list
    snackbar.value.text = 'Member added successfully';
    snackbar.value.show = true;
  } catch (error) {
    console.error('Failed to add member:', error);
    snackbar.value.text = 'Failed to add member';
    snackbar.value.show = true;
  }
};

const deleteMember = async (memberId) => {
  try {
    await ProjectService.deleteMember(projectId, memberId);
    await fetchMembers(); // Reload the member list
    snackbar.value.text = 'Member deleted successfully';
    snackbar.value.show = true;
  } catch (error) {
    console.error('Failed to delete member:', error);
    snackbar.value.text = 'Failed to delete member';
    snackbar.value.show = true;
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchMembers();
  fetchAllUsers();
});
</script>
<style scoped>
.user-card {
  transition: transform 0.3s;
  cursor: pointer;
}

.user-card:hover {
  transform: scale(1.05);
}

.v-card-title {
  display: flex;
  align-items: center;
}

.v-card-actions {
  justify-content: flex-end;
}
</style>
