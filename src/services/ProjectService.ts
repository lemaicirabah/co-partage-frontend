import axios from "@/plugins/axios";

export default {
  getAllProjects() {
    return axios.get("co-partage/projects");
  },
  getProjectById(id: number) {
    return axios.get(`co-partage/projects/${id}`);
  },
  getProjectDetails(id: string) {
    return axios.get(`co-partage/projects/${id}`);
  },
  updateProject(id: string, projectData: string) {
    return axios.put(`co-partage/projects/${id}`, projectData);
  },
  goToTasks(projectId: string) {
    return axios.post(`co-partage/projects/${projectId}/tasks`);
  },
  getTask(projectId: string, taskId: string) {
    return axios.get(`co-partage/projects/${projectId}/tasks/${taskId}`);
  },
  createTask(projectId: string, taskData: string) {
    return axios.post(`co-partage/projects/${projectId}/tasks`, taskData);
  },
  updateTask(projectId: string, taskId: string, taskData: string) {
    return axios.put(
      `co-partage/projects/${projectId}/tasks/${taskId}`,
      taskData
    );
  },
  deleteTask(projectId: string, taskId: string) {
    return axios.delete(`co-partage/projects/${projectId}/tasks/${taskId}`);
  },
  goToMembers(projectId: string) {
    return axios.post(`co-partage/projects/${projectId}/members`);
  },
  addMember(projectId: string, memberId: string) {
    return axios.post(`co-partage/projects/${projectId}/members/${memberId}`);
  },
  getMember(projectId: string, memberId: string) {
    return axios.get(`co-partage/projects/${projectId}/members/${memberId}`);
  },
  deleteMember(projectId: string, memberId: string) {
    return axios.delete(`co-partage/projects/${projectId}/members/${memberId}`);
  },
};
