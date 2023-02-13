<script setup>
import { ref, computed } from "vue";
import { store } from "../../store/store";

const {
  user: {
    id,
    isValid,
    isAdmin,
    isConnected,
    isTeacher,
    isTeacherValid,
    token,
    ...infos
  },
} = store;

const currentUser = ref({ ...infos });

const isDifferent = computed(() => {
  return Object.keys(currentUser.value).some(
    (key) => currentUser.value[key] !== infos[key]
  );
});
</script>

<template>
  <div class="wrapperForm">
    <h1>Modifier votre Profil</h1>
    <va-form style="width: 300px">
      <va-input
        v-for="key in Object.keys(currentUser)"
        :key="key"
        class="my-3"
        :label="key"
        v-model="currentUser[key]"
      />

      <button class="btn btn-primary" :disabled="!isDifferent">Valider</button>
    </va-form>
    <button class="btn btn-outline-primary requestProf" v-if="!isTeacher">
      Demande pour passer Prof
    </button>
  </div>
</template>

<style lang="scss" scoped>
.wrapperForm {
  display: block;
}

.requestProf {
  margin-top: 2vh;
}
</style>
