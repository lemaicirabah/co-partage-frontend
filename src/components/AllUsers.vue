<template>
  <v-container>
    <h1 class="my-4">All Users</h1>
    <v-row>
      <v-col v-for="user in users" :key="user.id" cols="12" sm="6" md="4">
        <v-card class="user-card" color="grey-lighten-3">
          <v-card-title>
            <v-avatar left color="primary">
              <span class="user-avatar">{{ user.id }}</span>
            </v-avatar>
            <span class="ml-3">{{ user.username }}</span>
          </v-card-title>
          <v-card-subtitle>{{ user.email }}</v-card-subtitle>
          <v-card-actions>
            <v-btn
              variant="outlined"
              color="primary"
              @click.stop="selectUser(user)"
              >View Profile</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface Skill {
  id: number;
  name: string;
  description: string;
}

interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  bio: string;
  skills: Skill[];
  avatar?: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  profile: Profile;
  projects: number[];
}

export default defineComponent({
  name: "AllUsers",
  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true,
    },
  },
  methods: {
    selectUser(user: User) {
      console.log("selectUser called with:", user);
      this.$emit("selectUser", user);
    },
  },
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