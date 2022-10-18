<template>
  <div class="d-flex h-100 text-bg-dark">
    <div class="cover-container d-flex w-100 h-100 mx-auto flex-column">
      <TheNavbar />
      <router-view />
      <TheFooter />
    </div>
  </div>
</template>

<script setup>
import TheNavbar from "@/components/TheNavbar";
import TheFooter from "@/components/TheFooter";
</script>

<style scoped>
.cover-container {
  max-width: 390px;
  min-height: 100vh;
}
</style>
