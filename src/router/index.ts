import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Projects from "@/pages/Projects.vue";
import Users from "@/pages/Users.vue";
import Evaluations from "@/pages/Evaluations.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import AddProject from "@/components/AddProject.vue";
import ProjectDetails from "@/components/ProjectDetails.vue";
import UpdateProject from "@/components/UpdateProject.vue";
import ProjectTasks from "@/components/ProjectTasks.vue";
import ProjectMembers from "@/components/ProjectMembers.vue";
import AddMember from "@/components/AddMember.vue";
import AddTask from "@/components/AddTask.vue";
import EditTask from "@/components/EditTask.vue";
import AllUsers from "@/components/AllUsers.vue";
import UserDetails from "@/components/UserDetails.vue";
import AllEvaluations from "@/components/AllEvaluations.vue";
import Dashboard from "@/pages/Dashboard.vue";
import { useUserStore } from "@/stores/userStore";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/projects/add",
    name: "AddProject",
    component: AddProject,
  },
  {
    path: "/projects/details/:id",
    name: "ProjectDetails",
    component: ProjectDetails,
  },
  {
    path: "/projects/update/:id",
    name: "UpdateProjects",
    component: UpdateProject,
  },
  {
    path: "/projects/:id/tasks",
    name: "ProjectTasks",
    component: ProjectTasks,
  },
  {
    path: "/projects/:id/tasks/new",
    name: "AddTask",
    component: AddTask,
  },
  {
    path: "/projects/:id/tasks/:taskId/edit",
    name: "EditTask",
    component: EditTask,
  },
  {
    path: "/projects/:id/members",
    name: "ProjectMembers",
    component: ProjectMembers,
  },
  {
    path: "/projects/:id/members/add",
    name: "AddMember",
    component: AddMember,
  },
  
  {
    path: "/users",
    name: "Users",
    component: Users,
    redirect: "/users/all", // Redirect to All Users by default
    children: [
      { path: "all", name: "AllUsers", component: AllUsers },
      { path: "details/:id", name: "UserDetails", component: UserDetails },
    ],
  },
  {
    path: "/evaluations",
    name: "Evaluations",
    component: Evaluations
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.matched.some(record => record.meta.requiresAuth) && !userStore.isLoggedIn) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && userStore.isLoggedIn) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router;