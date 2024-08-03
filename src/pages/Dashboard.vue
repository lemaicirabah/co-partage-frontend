<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row justify="space-between" align="center">
          <h1>Dashboard</h1>
          <v-btn color="red" @click="logout">Logout</v-btn>
        </v-row>
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
          <v-card-title>
            My Projects
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openCreateDialog">Create Project</v-btn>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="(project, index) in projects" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ project.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ project.description }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="editProject(project.id)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteProject(project.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
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
                <v-list-item v-for="(task, index) in upcomingTasks" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ task.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ task.deadline }}</v-list-item-subtitle>
                  </v-list-item-content>
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
          <span class="text-h5">{{ isEditMode ? 'Update Project' : 'Create Project' }}</span>
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
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="saveProject">
              {{ isEditMode ? 'Update' : 'Create' }}
            </v-btn>
            <v-btn @click="closeDialog">Cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import ProjectService from "@/services/ProjectService";

const router = useRouter();
const userStore = useUserStore();
const user = ref(userStore.user);
const userId = user.value.id;
const projects = ref([]);
const upcomingTasks = ref([]);
const dialog = ref(false);
const valid = ref(false);
const isEditMode = ref(false);
const project = ref({
  id: null,
  title: '',
  description: '',
});

const rules = {
  required: value => !!value || 'Required.',
};

const fetchProjectsAndTasks = async () => {
  const updatedUser = await UserService.getUserById(userId);

  if (updatedUser.data) {

    const projectPromises = updatedUser.data.projects.map((projectId) =>
      ProjectService.getProjectById(projectId).then((res) => res.data)
    );
    projects.value = await Promise.all(projectPromises);

    // Extract and filter tasks assigned to the logged-in user
    const allTasks = projects.value.flatMap((project) => project.tasks);
    upcomingTasks.value = allTasks.filter(
      (task) => task.assignee === updatedUser.data.id
    );
  }
};



const openCreateDialog = () => {
  router.push({ name: 'AddProject' });
};

const editProject = (projectId) => {
  router.push({ name: 'UpdateProjects', params: { id: projectId } });
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
      console.error('Failed to save project:', error);
    }
  }
};

const deleteProject = async (projectId) => {
  try {
    await ProjectService.deleteProject(projectId);
    await fetchProjectsAndTasks();
  } catch (error) {
    console.error('Failed to delete project:', error);
  }
};

const closeDialog = () => {
  dialog.value = false;
};

const logout = () => {
  userStore.logout();
  router.push({ name: 'Login' });
};

onMounted(fetchProjectsAndTasks);
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
