<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h5">Add New Member</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="addMember">
              <v-text-field
                v-model="memberId"
                label="Member ID"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="addMember"
              >
                Add Member
              </v-btn>
              <v-btn @click="cancel" color="grey">Cancel</v-btn>
            </v-form>
          </v-card-text>
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

const router = useRouter();
const route = useRoute();
const projectId = route.params.id;
const memberId = ref('');
const form = ref(null);
const valid = ref(false);

const rules = {
  required: value => !!value || 'Required.',
};

const snackbar = ref({
  show: false,
  text: '',
  timeout: 3000
});

const addMember = async () => {
  if (form.value.validate()) {
    try {
      await ProjectService.addMember(projectId, memberId.value);
      snackbar.value.text = 'Member added successfully';
      snackbar.value.show = true;
      setTimeout(() => {
        router.push({ name: 'ProjectMembers', params: { id: projectId } });
      }, 1500); // Delay to show the snackbar before redirection
    } catch (error) {
      console.error('Failed to add member:', error);
      snackbar.value.text = 'Failed to add member';
      snackbar.value.show = true;
    }
  }
};

const cancel = () => {
  router.push({ name: 'ProjectMembers', params: { id: projectId } });
};
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
