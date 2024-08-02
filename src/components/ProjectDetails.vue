<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h5">
            {{ project ? project.title : 'Loading...' }}
          </v-card-title>
          <v-card-subtitle>
            Project Details
          </v-card-subtitle>
          <v-card-text>
            <v-container>
              <div v-if="project">
                <v-row>
                  <v-col cols="12">
                    <h3>Description:</h3>
                    <p>{{ project.description }}</p>
                  </v-col>
                  <v-col cols="12">
                    <h3>Creator:</h3>
                    <p>{{ creator ? creator.username : 'Loading...' }}</p>
                  </v-col>
                  <v-col cols="12">
                    <h3>Members:</h3>
                    <v-chip-group>
                      <v-chip 
                        v-for="member in members" 
                        :key="member.id" 
                        color="blue" 
                        dark
                      >
                        {{ member.username }}
                      </v-chip>
                      <v-chip 
                        v-if="missingMembers.length > 0"
                        color="red"
                        dark
                      >
                        {{ missingMembers.length }} members not found
                      </v-chip>
                    </v-chip-group>
                  </v-col>
                  <v-col cols="12">
                    <h3>Evaluations:</h3>
                    <v-chip-group>
                      <v-chip 
                        v-for="evaluation in project.evaluations" 
                        :key="evaluation" 
                        color="green" 
                        dark
                      >
                        Evaluation ID: {{ evaluation }}
                      </v-chip>
                    </v-chip-group>
                  </v-col>
                  <v-col cols="12">
                    <h3>Tasks:</h3>
                    <v-list>
                      <v-list-item 
                        v-for="task in project.tasks" 
                        :key="task.id"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{ task.name }}</v-list-item-title>
                          <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </div>
              <div v-else>
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="goBack">Go Back</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProjectService from '@/services/ProjectService';
import UserService from '@/services/UserService';

const project = ref(null);
const creator = ref(null);
const members = ref([]);
const missingMembers = ref([]);
const route = useRoute();
const router = useRouter();

const fetchProjectDetails = async () => {
  console.log("Fetching details for project ID:", route.params.id); // Displays the used ID
  if (!route.params.id) {
    console.error('Project ID is undefined');
    return;
  }
  try {
    const response = await ProjectService.getProjectDetails(route.params.id);
    project.value = response.data;

    // Fetch creator details
    try {
      const creatorResponse = await UserService.getUserById(project.value.creator);
      creator.value = creatorResponse.data;
    } catch (error) {
      console.error(`Failed to fetch creator details for ID ${project.value.creator}:`, error);
    }

    // Fetch member details
    const memberPromises = project.value.members.map(async (memberId) => {
      try {
        const memberResponse = await UserService.getUserById(memberId);
        return memberResponse.data;
      } catch (error) {
        console.error(`Failed to fetch member details for ID ${memberId}:`, error);
        missingMembers.value.push(memberId);
        return null;
      }
    });
    const memberResponses = await Promise.all(memberPromises);
    members.value = memberResponses.filter(member => member !== null);

  } catch (error) {
    console.error("Failed to fetch project details:", error);
  }
};

const goBack = () => {
  router.push({ name: 'Projects' });
};

onMounted(fetchProjectDetails);
watch(
  () => route.params.id,
  (newId) => fetchProjectDetails()
);
</script>
