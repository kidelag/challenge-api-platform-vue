<script setup>
import { onMounted, watch, computed, toRaw } from "vue";
import { store, setBuyCourse, selectCourse } from "../store/store";
import router from "../router";
import { checkConnection } from "../utils/checkConnection";

const courseId = router.currentRoute.value.params.id;

const course = computed(() => {
  return store.courses.array[store.courses.selected];
});

onMounted(() => {
  checkConnection(false, "Detail");
  selectCourse(courseId);
});

const handleBuy = () => {
  setBuyCourse(courseId);
  store.selectCourse(null);
  selectCourse(courseId);
};
</script>

<template>
  <div class="wrapper">
    <h1>{{ course?.title }}</h1>

    <div class="description">{{ course?.description }}</div>

    <button
      class="btn btn-primary"
      type="submit"
      v-if="!store.user.isConnected"
      data-bs-toggle="modal"
      data-bs-target="#ModalConnection"
    >
      Connection
    </button>

    <router-link
      v-if="course?.possessed && store.user.isConnected"
      :to="`/course/${courseId}`"
      class="btn btn-outline-primary"
      >Reprendre ce cours</router-link
    >
    <button
      v-if="!course?.possessed && store.user.isConnected"
      class="btn btn-primary"
      @click="handleBuy"
    >
      Acheter ce cours
    </button>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 3vh 3vw;
  text-align: center;
}
</style>
