<template>
  <div>
    <h1>All Evaluations</h1>
    <v-list>
      <v-list-item
        v-for="evaluation in evaluations"
        :key="evaluation.id"
        @click="goToEvaluationDetails(evaluation.id)"
      >
        <v-list-item-title>{{ evaluation.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import EvaluationService from '@/services/EvaluationService';
import { useRouter } from 'vue-router';

const evaluations = ref([]);
const router = useRouter();

const fetchEvaluations = async () => {
  try {
    const response = await EvaluationService.getAllEvaluations();
    evaluations.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const goToEvaluationDetails = (id) => {
  router.push(`/evaluations/details/${id}`);
};

onMounted(fetchEvaluations);
</script>
