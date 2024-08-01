import axios from "axios";

const API_URL = "http://localhost:8080/co-partage/projects";

class ProjectService {
  getProjectById(id: number) {
    return axios.get(`${API_URL}/${id}`);
  }
}

export default new ProjectService();
