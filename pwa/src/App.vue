<script setup>
import { ref } from "vue";
import { Modal } from "bootstrap";
import { RouterLink, RouterView } from "vue-router";

import router from "./router";
import { store } from "./store/store";
import LoginView from "./views/LoginView.vue";
import { initData } from "./utils/initData";

const handleLogout = () => {
  localStorage.removeItem("TOKEN");

  store.reset();
  router.push("/");
};

const modalRef = ref(null);
const closeModal = () => Modal.getInstance(modalRef.value)?.hide();

initData();
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg" style="background-color: #e3f2fd">
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand">E learning</RouterLink>
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
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item" v-if="store.user.isConnected">
            <RouterLink to="/dashboard" class="nav-link">Vos cours</RouterLink>
          </li>
        </ul>
        <div class="d-flex">
          <div class="wrapperRole" v-if="store.user.isConnected">
            <va-badge
              class="m-9"
              text="Admin"
              color="success"
              v-if="store.user.isAdmin"
            />
            <va-badge
              class="m-9"
              text="Professeur"
              color="success"
              v-if="store.user.isTeacher && store.user.isTeacherValid"
            />
          </div>
          <button
            class="btn btn-primary"
            v-if="!store.user.isConnected"
            data-bs-toggle="modal"
            data-bs-target="#ModalConnection"
          >
            Connexion
          </button>
          <button
            type="button"
            class="btn btn-warning"
            v-if="store.user.isConnected"
            @click="handleLogout"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  </header>
  <body>
    <div
      class="modal fade"
      id="ModalConnection"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="modalRef"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <LoginView :closeModal="closeModal" />
        </div>
      </div>
    </div>
  </body>

  <RouterView />
</template>

<style scoped></style>
