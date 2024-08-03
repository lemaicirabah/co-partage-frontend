import { defineStore } from "pinia";

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
  profile: Profile;
  projects: number[];
}

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
  },
});
