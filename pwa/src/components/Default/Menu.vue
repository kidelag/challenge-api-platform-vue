<script setup>

import { RouterLink } from "vue-router";

import { store } from "../../store/store";

const handleLogout = () => {
  localStorage.removeItem("TOKEN");

  store.reset();
  router.push("/");
};

</script>


<template>

<nav class="navbar-nav">
      <div class="container-nav">

        <RouterLink to="/" class="item-nav home">E learning</RouterLink>

        <!--<button class="item-nav list" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span></span>
        </button>-->

        
        <div class="item-nav links">
          <div>
            <RouterLink to="/">Accueil</RouterLink>
          </div>
          <div class="fill" v-if="store.user.isConnected"></div>
          <div v-if="store.user.isConnected">
            <RouterLink to="/dashboard">Vos cours</RouterLink>
          </div>
        </div>


        <div class="item-nav left">
          <div class="inl-icon">
            <va-icon name="shopping-cart"/>
          </div>
          <div class="role left-item" v-if="store.user.isAdmin && store.user.isConnected">Admin</div>
          <div class="role left-item" v-if="store.user.isTeacherValid && store.user.isConnected">Professeur</div>

          <button class="bttn bttn-succ bttn-login left-item" v-if="!store.user.isConnected" data-bs-toggle="modal" data-bs-target="#ModalConnection">
            Connexion
          </button>

          <button class="bttn bttn-dng bttn-logout left-item" v-if="store.user.isConnected" type="button" @click="handleLogout">
            Déconnexion
          </button>
          <button class="bttn bttn-drk-out bttn-theme left-item" type="button">
            O
          </button>
          
        </div>

      </div>
    </nav>

</template>


<style scoped>

div.item-nav{
  flex: 1;
}


nav.navbar-nav {
  background-color: var(--background-color-light);
  padding: 0 24px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
}

div.container-nav {
  display: flex;
  margin: 0;
  padding: 0;
}

.home {
  margin: auto auto auto 0.5rem;
  text-decoration: none;
  color: var(--color-text-light);
  font-size: x-large;
  flex: 1;
}

.links {
  margin: auto 0;
  display: flex;
  justify-content: center;
}

.links :nth-child(1) {
  margin-right: 0.5rem;
}

.links :nth-child(2) {
  min-height: 100%;
  width: 1.5px;
  background-color: var(--color-text-light);
}

.links :nth-child(3) {
  margin-left: 0.8rem;
}

.links > div > a {
  text-decoration: none;
  color: var(--color-text-light);
}

.left {
  margin: 0.5rem 0.5rem 0.5rem 0;
  display: flex;
  justify-content: end;
}

.left > div.inl-icon {
  margin: auto;
}

.left-item{
  margin-left: 0.5rem;
}

div.left > div.role {
  margin: auto 0 auto 0.5rem;
  color: var(--color-text-light);

}

</style>