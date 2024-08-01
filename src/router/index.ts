import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Projects from "@/pages/Projects.vue";
import Users from "@/pages/Users.vue";
import Evaluations from "@/pages/Evaluations.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import AllProjects from "@/components/AllProjects.vue";
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
import EvaluationDetails from "@/components/EvaluationDetails.vue";
import Dashboard from "@/pages/Dashboard.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    children: [
      { path: "all", name: "AllProjects", component: AllProjects },
      {
        path: "details/:id",
        name: "ProjectDetails",
        component: ProjectDetails,
      },
      { path: "update", name: "UpdateProject", component: UpdateProject },
      { path: ":id/tasks", name: "ProjectTasks", component: ProjectTasks },
      {
        path: ":id/members",
        name: "ProjectMembers",
        component: ProjectMembers,
      },
      { path: ":id/tasks/new", name: "AddTask", component: AddTask },
      { path: ":id/tasks/:taskId/edit", name: "EditTask", component: EditTask },
      { path: ":id/members/add", name: "AddMember", component: AddMember },
    ],
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
    component: Evaluations,
    children: [
      { path: "all", name: "AllEvaluations", component: AllEvaluations },
      {
        path: "details/:id",
        name: "EvaluationDetails",
        component: EvaluationDetails,
      },
    ],
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
