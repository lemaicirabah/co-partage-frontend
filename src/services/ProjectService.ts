import axios from "@/plugins/axios";

export default {
  getAllProjects() {
    return axios.get("/projects");
  },
  getProjectDetails(id: string) {
    return axios.get(`/projects/${id}`);
  },
};
