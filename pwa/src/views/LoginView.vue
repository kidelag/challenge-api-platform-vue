<script setup>
import Login from "../components/Login.vue";

const props = defineProps({
  closeModal: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <main>
    <Login :closeModal="closeModal" />
  </main>
</template>
