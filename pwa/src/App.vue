<script setup>
import { RouterLink, RouterView } from "vue-router";
import { store } from "./store/store";

const handleLogout = () => {
  localStorage.removeItem("TOKEN");

  store.setConnected(false);
};
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link">About</RouterLink>
            </li>

            <li class="nav-item" v-if="!store.user.isConnected">
              <RouterLink to="/login" class="nav-link">Login</RouterLink>
            </li>
            <li class="nav-item" v-if="!store.user.isConnected">
              <RouterLink to="/register" class="nav-link">Register</RouterLink>
            </li>
            <button
              type="button"
              class="btn btn-primary"
              v-if="store.user.isConnected"
              @click="handleLogout"
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
