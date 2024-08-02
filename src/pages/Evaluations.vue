<template>
  <v-container fluid>
    <SideNav />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1>Evaluations</h1>
            <v-data-table :headers="headers" :items="evaluations" class="elevation-1">
              <template v-slot:item.rating="{ item }">
                <v-rating :value="item.rating" color="yellow" dense readonly></v-rating>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SideNav from '@/components/SideNav.vue';
import EvaluationService from '@/services/EvaluationService';

const evaluations = ref([]);



const fetchEvaluations = async () => {
  try {
    const response = await EvaluationService.getAllEvaluations();
    evaluations.value = response.data;
  } catch (error) {
    console.error('Failed to fetch evaluations:', error);
  }
};

onMounted(fetchEvaluations);
</script>

<style scoped>
.v-container {
  display: flex;
  flex-direction: row;
}

.v-main {
  flex-grow: 1;
  padding: 20px;
}

.v-container {
  margin-top: 20px;
}
</style>
