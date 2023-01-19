<script setup>
import axios from "axios";
import { ref } from "vue";
import router from "../router";

const token = router.currentRoute.value.params.token;
const error = ref("Nous validons votre token");

axios
  .get("https://localhost/user/validate?token=" + token)
  .then(() => {
    // router.push("/?valid=true");
  })
  .catch(() => {
    error.value = "Votre token n'est pas valide ou manquant";
  });
</script>

<template>{{ error }}</template>
