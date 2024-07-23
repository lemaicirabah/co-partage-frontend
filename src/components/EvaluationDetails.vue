<template>
  <div>
    <h1>Evaluation Details</h1>
    <div v-if="evaluation">
      <h2>{{ evaluation.title }}</h2>
      <p>{{ evaluation.description }}</p>
      <!-- Add more evaluation details here -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import EvaluationService from '@/services/EvaluationService';

const evaluation = ref(null);
const route = useRoute();

const fetchEvaluationDetails = async () => {
  try {
    const response = await EvaluationService.getEvaluationDetails(route.params.id);
    evaluation.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchEvaluationDetails);
</script>
