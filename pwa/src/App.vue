<script setup>
import { ref } from "vue";
import { Modal } from "bootstrap";
import { RouterLink, RouterView } from "vue-router";

import router from "./router";
import { store } from "./store/store";

import Footer from "./components/Default/Footer.vue"
import Menu from "./components/Default/Menu.vue"
import LoginView from "./views/LoginView.vue";

import { initData } from "./utils/initData";


const modalRef = ref(null);
const closeModal = () => Modal.getInstance(modalRef.value)?.hide();

initData();
</script>

<template>
  <header>

    <div class="nav-message-container" style="display: none">
      <div class="nav-message">
        <div class="message">
          Ceci est un message sur le site
        </div>
        <div class="close">
          <button class="bttn-close">
            x
          </button>  
        </div>
      </div>
    </div>

    <Menu />

    <div class="flash-message-container" style="display: none">
      <div class="flash-message">
        <div class="message-flash-message">
          <span class="span-flash-message">Error</span>
          There is an error !
        </div>

        <div class="close-flash-message">
          <button class="bttn-close">
            x
          </button>  
        </div>
      </div>
    </div>

    <div class="modal fade" id="ModalConnection" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalRef">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Connexion</h1>
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

  </header>


  <main>
    <RouterView />
  </main>


  <Footer />

</template>

<style scoped>

div.nav-message {
  text-align: center;
  padding: 1rem 0;
  background-color: red;
  color: var(--color-text-light);
  display: flex;
  height: 56px;
}

div.message {
  flex: 10;
}

div.close {
  flex: 1;
  margin-right: 2rem;
}

button.bttn-close {
  width: 2rem;
  height: 2rem;
}



div.flash-message {
  /* width: 100%; */
  margin: 1vw 15vw;
  padding: 0.3rem 0;
  background-color: red;
  text-align: center;
  display: flex;
  /* height: 56px; */
  color: var(--color-text-light);
  /* display: table-cell; */
  border-radius: .375rem;
}


div.message-flash-message {
  vertical-align: middle;
  padding: inherit;
  /* background-color: aqua; */
  flex: 10;
}

div.close-flash-message {
  /* background-color: blue; */
  flex: 1;
  margin-right: 2rem;
}



</style>
