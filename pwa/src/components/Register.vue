<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="form-group mb-3">
        <label for="username">Username</label>
        <input
          type="username"
          class="form-control"
          id="username"
          v-model="initialValue.username"
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

const initialValue = {
  username: "test",
  password: "test",
  mail: "test@test.co",
  firstname: "Firs",
  lastname: "Last",
};

const handleSubmit = () => {
  axios
    .post("https://localhost/users", {
      username: initialValue.username,
      password: initialValue.password,
    })
    .then(() => {
      login(initialValue.username, initialValue.password);
    })
    .catch((error) => {
      // Gestion des erreurs
      console.log(error);
    });
};
</script>
