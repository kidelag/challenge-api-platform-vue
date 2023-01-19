<script setup>
import { onMounted, watchEffect, computed, ref } from "vue";
import { store, setBuyCourse } from "../store/store";
import router from "../router";
import { checkConnection } from "../utils/checkConnection";

const courseId = router.currentRoute.value.params.id;
const courses = ref({});
const course = computed(() => {
  return store.courses.selected ? courses.value[store.courses.selected] : {};
});

watchEffect(() => {
  courses.value = store.courses.list;
});

onMounted(() => {
  checkConnection(false, "Detail");
  store.selectCourse(courseId);
});

const handleBuy = () => {
  setBuyCourse(courseId);
};
</script>

<template>
  <div class="wrapper">
    <h1>{{ course?.title }}</h1>

    <div class="description">{{ course?.description }}</div>
    <div class="content">{{ course?.content }}</div>

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
