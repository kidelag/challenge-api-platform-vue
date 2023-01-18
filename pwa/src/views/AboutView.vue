<script setup>
import { onMounted } from "vue";
import { checkConnection } from "../utils/checkConnection";

onMounted(() => {
  checkConnection();
});
</script>

<template>
  <div class="about">
    <h1>SIIIKE</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
