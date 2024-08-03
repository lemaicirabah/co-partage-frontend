// src/stores/userStore.js (ou .ts)
import { defineStore } from 'pinia';

interface Task {
  id: string;
  title: string;
  assignee: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

interface User {
  id: string;
  username: string;
  projects: Project[];
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
    addProject(project: Project) {
      if (this.user) {
        this.user.projects.push(project);
      }
    },
    removeProject(projectId: string) {
      if (this.user) {
        this.user.projects = this.user.projects.filter(project => project.id !== projectId);
      }
    },
  },
});
