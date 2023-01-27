<script async setup>
import axios from "axios";

const {
  data: { ["hydra:member"]: usersRaw },
} = await axios.get("https://localhost/users");

const users = usersRaw.map((user) => ({
  mail: user.mail,
  firstname: user.firstname,
  lastname: user.lastname,
}));

const input = "";
</script>

<template>
  <div class="wrapperPage">
    <h1>Gestion des Utilisateurs</h1>
    <div class="wrapperUsers">
      <va-data-table :items="users" />
    </div>
  </div>
</template>

<style scoped>
.wrapperPage {
  display: flex;

  flex-direction: column;
}
</style>
