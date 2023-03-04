<template>
  <div class="container mt-4">
    <form @submit.prevent="handleSubmit">
      <div class="form-group mb-3">
        <label for="mail">mail</label>
        <input
          type="mail"
          class="form-control"
          id="mail"
          v-model="initialValue.mail"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="initialValue.password"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="firstname">firstname</label>
        <input
          type="firstname"
          class="form-control"
          id="firstname"
          v-model="initialValue.firstname"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="lastname">lastname</label>
        <input
          type="lastname"
          class="form-control"
          id="lastname"
          v-model="initialValue.lastname"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Créer le compte</button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { login } from "../utils/login";
import { onMounted } from "vue";
import { store } from "./../store/store";
import router from "../router";
import { checkConnection } from "../utils/checkConnection";

onMounted(() => {
  checkConnection(true, false, "register");
});

const initialValue = {
  password: "test",
  mail: "test@test.com",
  firstname: "test",
  lastname: "test",
};

const handleSubmit = () => {
  axios
    .post(import.meta.env.VITE_API_URL + "/users", {
      password: initialValue.password,
      mail: initialValue.mail,
      firstname: initialValue.firstname,
      lastname: initialValue.lastname,
    })
    .then(() => {
      router.push("/");
    })
    .catch((error) => {
      // Gestion des erreurs
      console.log(error);
    });
};
</script>
