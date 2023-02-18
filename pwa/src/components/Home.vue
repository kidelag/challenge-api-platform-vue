<script setup>
import router from "../router";
import { store } from "../store/store";
import { ref, isReactive, watchEffect } from "vue";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import Carrousel from "./Home/Carousel.vue";

const items = ref({});
const validItems = ref({});

watchEffect(() => {
  items.value = store.courses.list;
  console.log(items.value);

  for (const item in items.value) {
    if (items.value[item].valid) {
      validItems.value = {
        ...validItems.value,
        [item]: { ...items.value[item] },
      };
    }
  }
});

let content;
</script>

<template>
  <div class="wrapper">
    <h1>Nos formations</h1>

    <Carrousel :title="'Les derniers cours ajoutés : '" :validItems="validItems"/>

  </div>

</template>

<style scoped>
.wrapper {
  padding: 3vh 3vw;
  text-align: center;
}



</style>