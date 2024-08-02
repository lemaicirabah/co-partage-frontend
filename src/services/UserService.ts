import axios from "axios";

const API_URL = "http://localhost:8080/co-partage/users";

class UserService {
  getAllUsers() {
    return axios.get(API_URL);
  }

  getUserById(id: number) {
    return axios.get(`${API_URL}/${id}`);
  }

  createUser(user: any) {
    return axios.post(API_URL, user);
  }

  updateUser(id: number, user: any) {
    return axios.put(`${API_URL}/${id}`, user);
  }

  deleteUser(id: number) {
    return axios.delete(`${API_URL}/${id}`);
  }

  createProject(userId:number, projectData:string) {
    return axios.post(`http://localhost:8080/co-partage/projects/users/${userId}`, projectData);
  }

  login(username: string) {
    return axios.post(`${API_URL}/login`, username, {
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}

export default new UserService();
