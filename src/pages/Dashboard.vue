<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row justify="space-between" align="center">
          <h1>Dashboard</h1>
          <v-btn class="ml-4" color="red" @click="logout">Logout</v-btn>
        </v-row>
        <v-card v-if="user" class="mt-4">
          <v-card-title>Welcome, {{ user.username }}</v-card-title>
          <v-card-text>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>First Name:</strong> {{ user.profile.firstName }}</p>
            <p><strong>Last Name:</strong> {{ user.profile.lastName }}</p>
            <p>
              <strong>Number of Projects:</strong> {{ projects.length ?? 0 }}
            </p>
          </v-card-text>
        </v-card>
        <v-card v-else class="mt-4">
          <v-card-title>Error</v-card-title>
          <v-card-text>User data is not available.</v-card-text>
        </v-card>
        <v-card class="mt-4">
          <v-card-title>
            My Projects
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openCreateDialog"
              >Create Project</v-btn
            >
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item
                  v-for="(project, index) in projects"
                  :key="index"
                  @click="goToProjectDetails(project.id)"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ project.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      project.description
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click.stop="editProject(project.id)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      color="red"
                      @click.stop="confirmDelete(project.id)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog for create/update project -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{
            isEditMode ? "Update Project" : "Create Project"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" @submit.prevent="saveProject">
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
              @click="saveProject"
            >
              {{ isEditMode ? "Update" : "Create" }}
            </v-btn>
            <v-btn @click="closeDialog">Cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Confirmation dialog for deleting a project -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Confirm Delete</v-card-title>
        <v-card-text>Are you sure you want to delete this project?</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="cancelDelete">Cancel</v-btn>
          <v-btn color="red" text @click="deleteProject">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import ProjectService from "@/services/ProjectService";
import UserService from "@/services/UserService";

const router = useRouter();
const userStore = useUserStore();
const user = ref(userStore.user);
const userId = user.value.id;
const projects = ref([]);
const dialog = ref(false);
const deleteDialog = ref(false);
const valid = ref(false);
const isEditMode = ref(false);
const project = ref({
  id: null,
  title: "",
  description: "",
});
const projectIdToDelete = ref(null);

const rules = {
  required: (value) => !!value || "Required.",
};

const fetchProjectsAndTasks = async () => {
  const updatedUser = await UserService.getUserById(userId);

  if (updatedUser.data) {
    const projectPromises = updatedUser.data.projects.map((projectId) =>
      ProjectService.getProjectById(projectId).then((res) => res.data)
    );
    projects.value = await Promise.all(projectPromises);
  }
};

const openCreateDialog = () => {
  router.push({ name: "AddProject" });
};

const editProject = (projectId) => {
  router.push({ name: "UpdateProjects", params: { id: projectId } });
};

const saveProject = async () => {
  if (valid.value) {
    try {
      if (isEditMode.value) {
        await ProjectService.updateProject(project.value.id, project.value);
      } else {
        await ProjectService.createProject(project.value);
      }
      await fetchProjectsAndTasks();
      closeDialog();
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  }
};

const confirmDelete = (projectId) => {
  projectIdToDelete.value = projectId;
  deleteDialog.value = true;
};

const deleteProject = async () => {
  try {
    await ProjectService.deleteProject(projectIdToDelete.value);
    await fetchProjectsAndTasks();
    deleteDialog.value = false;
  } catch (error) {
    console.error("Failed to delete project:", error);
  }
};

const cancelDelete = () => {
  deleteDialog.value = false;
};

const closeDialog = () => {
  dialog.value = false;
};

const logout = () => {
  userStore.logout();
  router.push({ name: "Login" });
};

const goToProjectDetails = (projectId) => {
  router.push({
    name: "ProjectDetails",
    params: { id: projectId },
    query: { from: "Dashboard" },
  });
};

onMounted(fetchProjectsAndTasks);
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
.logout-button {
  margin-left: 16px; /* Adjust the margin as needed */
}
.mt-4 {
  margin-top: 16px;
}
</style>