<template>
  <v-container>
    <v-row>
      <v-col cols="2">
      </v-col>
      <v-col cols="10">
        <div v-if="selectedUserId !== null">
          <UserDetails :userId="selectedUserId" @back="selectedUserId = null" />
        </div>
        <div v-else>
          <AllUsers :users="users" @selectUser="selectUser" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AllUsers from "@/components/AllUsers.vue";
import UserDetails from "@/components/UserDetails.vue";
import UserService from "@/services/UserService";

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
  name: "Users",
  components: {
    AllUsers,
    UserDetails,
  },
  setup() {
    const users = ref<User[]>([]);
    const selectedUserId = ref<number | null>(null);
    const router = useRouter();

    const fetchUsers = async () => {
      try {
        const response = await UserService.getAllUsers();
        users.value = response.data;
      } catch (error) {
        console.error("There was an error fetching the users!", error);
      }
    };

    const selectUser = (user: User) => {
      console.log("selectUser in Users.vue called with:", user);
      selectedUserId.value = user.id;
      router.push({ name: "UserDetails", params: { id: user.id.toString() } });
    };

    onMounted(fetchUsers);

    return {
      users,
      selectedUserId,
      selectUser,
    };
  },
});
</script>

<style scoped>
/* Scoped styles */
</style>