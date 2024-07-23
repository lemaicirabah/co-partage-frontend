import axios from "@/plugins/axios";

export default {
  getAllEvaluations() {
    return axios.get("co-partage/evaluations");
  },
  getEvaluationDetails(id: string) {
    return axios.get(`co-partage/evaluations/${id}`);
  },
};
