import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Projects from "@/pages/Projects.vue";
import Users from "@/pages/Users.vue";
import Evaluations from "@/pages/Evaluations.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import AllProjects from "@/components/AllProjects.vue";
import ProjectDetails from "@/components/ProjectDetails.vue";
import AllUsers from "@/components/AllUsers.vue";
import SpecificUser from "@/components/SpecificUser.vue";
import AllEvaluations from "@/components/AllEvaluations.vue";
import EvaluationDetails from "@/components/EvaluationDetails.vue";

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
    ],
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    redirect: "/users/all", // Redirect to All Users by default
    children: [
      { path: "all", name: "AllUsers", component: AllUsers },
      { path: "specific/:id", name: "SpecificUser", component: SpecificUser },
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;