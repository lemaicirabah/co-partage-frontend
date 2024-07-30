<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters>
      <!-- Image covering the top half -->
      <v-col cols="12" class="pa-0 ma-0" style="height: 50vh;">
        <v-img
          src="../assets/Home.png"
          alt="Home Page"
          class="half-height-background"
          cover
        ></v-img>
      </v-col>

      <!-- Welcome message and additional text in the bottom half -->
      <v-col
        cols="12"
        class="pa-0 ma-0 d-flex flex-column align-center justify-center"
        style="height: 50vh; background-color: white;">
        <h1 class="display-1" style="color: #2196F3;">Welcome to Co-Partage!</h1>
        <br><br><br>
        <h3 style="margin-top: -10px;">Connect. Collaborate. Create.</h3>
        <br>
        <p class="subtitle-1 text-center" style="padding: 0 15px; max-width: 600px;">
          Join Co-Partage, where students come together to bring ideas to life. Create your profile, explore projects, and collaborate on exciting initiatives using our user-friendly tools.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.half-height-background {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the div completely */
}
</style>

<script setup>
</script>

<style scoped>
h1 {
  margin-top: 20px;
  font-size: 24px;
  color: #1976D2;
}
</style>
