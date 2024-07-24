import axios from "@/plugins/axios";

export default {
  getAllProjects() {
    return axios.get("co-partage/projects");
  },
  getProjectDetails(id: string) {
    return axios.get(`co-partage/projects/${id}`);
  },
};
