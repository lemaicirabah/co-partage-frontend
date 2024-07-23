import axios from "@/plugins/axios";

export default {
  getAllUsers() {
    return axios.get("co-partage/users");
  },
  getUserDetails(id: string) {
    return axios.get(`co-partage/users/${id}`);
  },
};
