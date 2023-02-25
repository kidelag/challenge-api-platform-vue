<script setup>

import { store } from "../store/store";
import { ref, watchEffect } from "vue";

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

</script>

<template>
    <div class="wrapper">
        <h1>Title</h1>
        <div class="categories"></div>


    </div>
</template>

<style scoped>

    div.wrapper {
        min-height: 100vh;
        width: 60vw;
        margin: 5vh auto;
        background-color: blue;
    }

@media (min-width: 1280px) {
    div.wrapper {
        margin: auto;
        max-width: 1280px;
        width: 100%;
    }
}
@media (min-width: 992px){
    div.wrapper {
        margin: auto;
        max-width: 992px;
        width: 100%;
    }
}
@media (min-width: 768px){
    div.wrapper {
        margin: auto;
        max-width: 768px;
        width: 100%;
    }
}

</style>