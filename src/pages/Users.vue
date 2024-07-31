<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <AllUsers :users="users" @selectUser="selectUser" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AllUsers from '@/components/AllUsers.vue';
import UserService from '@/services/UserService';

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
  name: 'Users',
  components: {
    AllUsers,
  },
  setup() {
    const users = ref<User[]>([]);
    const router = useRouter();

    const fetchUsers = () => {
      UserService.getAllUsers()
        .then((response) => {
          users.value = response.data;
        })
        .catch((error) => {
          console.error('There was an error fetching the users!', error);
        });
    };

    const selectUser = (user: User) => {
      router.push({ name: 'SpecificUser', params: { id: user.id } });
    };

    onMounted(fetchUsers);

    return {
      users,
      fetchUsers,
      selectUser,
    };
  },
});
</script>

<style scoped>
/* Scoped styles */
</style>