<template>
  <v-container>
    <v-list>
      <v-list-item
        v-for="user in users"
        :key="user.id"
        @click="selectUser(user)"
        class="user-item"
      >
        <v-list-item-content>
          <v-list-item-title>{{ user.username }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

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
  name: 'AllUsers',
  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true,
    },
  },
  methods: {
    selectUser(user: User) {
      console.log('User selected in AllUsers:', user); // Debug statement
      this.$emit('selectUser', user);
    },
  },
});
</script>

<style scoped>
.user-item {
  cursor: pointer;
}
</style>