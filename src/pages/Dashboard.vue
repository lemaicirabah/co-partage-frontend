<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Dashboard</h1>
        <v-card v-if="user">
          <v-card-title>Welcome, {{ user.username }}</v-card-title>
          <v-card-text>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>First Name:</strong> {{ user.profile.firstName }}</p>
            <p><strong>Last Name:</strong> {{ user.profile.lastName }}</p>
            <p>
              <strong>Number of Projects:</strong> {{ projects.length ?? 0 }}
            </p>
            <p>
              <strong>Number of Tasks:</strong> {{ upcomingTasks.length ?? 0 }}
            </p>
          </v-card-text>
        </v-card>
        <v-card v-else>
          <v-card-title>Error</v-card-title>
          <v-card-text>User data is not available.</v-card-text>
        </v-card>
        <v-card class="mt-4">
          <v-card-title>My Projects</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="(project, index) in projects" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ project.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      project.description
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
        <v-card class="mt-4">
          <v-card-title>Upcoming Tasks</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item
                  v-for="(task, index) in upcomingTasks"
                  :key="index"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ task.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      task.deadline
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import ProjectService from "@/services/ProjectService";

const userStore = useUserStore();
const user = ref(userStore.user);
const projects = ref([]);
const upcomingTasks = ref([]);

const fetchProjectsAndTasks = async () => {
  if (user.value) {
    const projectPromises = user.value.projects.map((projectId) =>
      ProjectService.getProjectById(projectId).then((res) => res.data)
    );
    projects.value = await Promise.all(projectPromises);

    // Extract and filter tasks assigned to the logged-in user
    const allTasks = projects.value.flatMap((project) => project.tasks);
    upcomingTasks.value = allTasks.filter(
      (task) => task.assignee === user.value.id
    );
  }
};

onMounted(fetchProjectsAndTasks);
</script>

<style scoped>
v-container {
  margin-top: 20px;
}
</style>