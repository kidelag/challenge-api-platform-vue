<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="username"
          class="form-control"
          id="username"
          required
          v-model="initialValue.username"
        />
      </div>
      <div class="form-group mb-3">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="password"
          required
          v-model="initialValue.password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
  </div>
</template>

<script setup>
import { login } from "../utils/login";
import { onMounted } from "vue";
import { store } from "./../store/store";
import router from "../router";

onMounted(() => {
  console.log("debug", store.user.isConnected);
  if (store.user.isConnected) {
    router.push("/");
  }
});

const initialValue = {
  username: "test",
  password: "test",
};

const handleSubmit = () => {
  login(initialValue.username, initialValue.password);
};
</script>
