<script setup>
import { store } from "../../store/store";

const {
  user: { isTeacherValid },
} = store;
</script>

<template>
  <h1 v-if="isTeacherValid">Gérer vos cours</h1>
  <h1 v-else>Un administrateur va valider votre demande.</h1>
</template>
