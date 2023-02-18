<script setup>
import router from "../router";
import { store } from "../store/store";
import { ref, isReactive, watchEffect } from "vue";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import Carrousel from "./Home/Carousel.vue";
import BoxLeft from "./Home/BoxLeft.vue";
import BoxRight from "./Home/BoxRight.vue";
import IconBox from "./Home/IconBox.vue";

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

const content = [
      {
        icon: "star",
        text: "test"
      },
      {
        icon: "redeem",
        text: "test"
      },
      {
        icon: "sell",
        text: "test"
      },
    ]

let cnt = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam delectus ipsam praesentium fugit inventore. Distinctio eius totam quasi laboriosam porro nulla. Amet earum sequi soluta nulla, recusandae ea consequuntur eligendi?";
</script>

<template>
  <div class="wrapper">
    <h1>Nos formations</h1>

    <Carrousel :title="'Les derniers cours ajoutés : '" :validItems="validItems"/>
    <BoxLeft :title="'Les derniers cours ajoutés : '" :text="cnt" :img="'https://via.placeholder.com/250x250'"/>
    <BoxRight :title="'Les derniers cours ajoutés : '" :text="cnt" :img="'https://via.placeholder.com/250x250'"/>

    <IconBox :content="content"/>

  </div>
  

</template>

<style scoped>
.wrapper {
  padding: 3vh 3vw;
  text-align: center;
}



</style>