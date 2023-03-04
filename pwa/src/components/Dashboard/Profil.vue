<script setup>
import axios from "axios";
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
const isModalRequestOpen = ref(false);
const initBody = {
  user_id: "users/" + store.user.id,
  valid: false,
  accountOwner: "",
  accountIban: "",
  accountBankName: "",
  userId: "users/" + store.user.id,
};
const requestBody = ref({ ...initBody });
const { user_id, valid, userId, ...requestInput } = requestBody.value;

const isDifferent = computed(() => {
  return Object.keys(currentUser.value).some(
    (key) => currentUser.value[key] !== infos[key]
  );
});

const submitRequest = () => {
  axios
    .post(import.meta.env.VITE_API_URL + "/formers", requestBody.value)
    .then(() => {
      store.setProf(true, false);
      resetRequest();
    })
    .catch((err) => {
      console.log(err);
    });
};
const resetRequest = () => {
  requestBody.value = { ...initBody };
  isModalRequestOpen.value = !isModalRequestOpen;
};
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
    <button
      class="btn btn-outline-primary requestProf"
      v-if="!isTeacher"
      @click="isModalRequestOpen = !isModalRequestOpen"
    >
      Demande pour passer Prof
    </button>
  </div>

  <va-modal
    class="modalProf"
    :model-value="isModalRequestOpen"
    title="Demande de changement de profil"
    size="small"
    @ok="submitRequest"
    @cancel="resetRequest"
  >
    <va-input
      v-for="key in Object.keys(requestInput)"
      :key="key"
      class="my-3"
      :label="key"
      v-model="requestBody[key]"
    />
  </va-modal>
</template>

<style lang="scss" scoped>
.wrapperForm {
  display: block;
}

.requestProf {
  margin-top: 2vh;
}

.modalProf {
  .va-input {
    display: block;
  }
}
</style>
