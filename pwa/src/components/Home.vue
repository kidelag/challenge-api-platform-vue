<script setup>
import router from "../router";
import { store } from "../store/store";
import { ref, isReactive, watchEffect } from "vue";

const items = ref({});

watchEffect(() => {
  items.value = store.courses.list;
});
</script>

<template>
  <div class="wrapper">
    <h1>Nos formations</h1>

    <div class="wrapperItems">
      <div
        v-for="item in items"
        :key="item.id"
        class="card mt-3"
        style="width: 18rem"
      >
        <img
          src="https://media.istockphoto.com/id/1322277517/fr/photo/herbe-sauvage-dans-les-montagnes-au-coucher-du-soleil.jpg?s=612x612&w=0&k=20&c=tQ19uZQLlIFy8J6QWMyOL6lPt3pdSHBSDFHoXr1K_g0="
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.description }}</p>
          <router-link
            v-if="item.possessed"
            :to="`/course/${item.id}`"
            class="btn btn-outline-primary"
            >Reprendre ce cours</router-link
          >
          <router-link v-else :to="`/detail/${item.id}`" class="btn btn-primary"
            >Suivre ce cours</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 3vh 3vw;
  text-align: center;
}

.wrapperItems {
  display: grid;

  grid-template-columns: repeat(3, 1fr);
}
</style>
