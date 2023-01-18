<script setup>
import { onMounted, ref } from "vue";
import { getCourse, store } from "../store/store";
import router from "../router";

const courseId = router.currentRoute.value.params.id;
const course = getCourse(courseId);

onMounted(() => {
  console.log(course);
});
</script>

<template>
  <div class="wrapper">
    <h1>{{ course.title }}</h1>

    <div class="description">{{ course.description }}</div>

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
      v-if="course.possessed && store.user.isConnected"
      :to="`/`"
      class="btn btn-outline-primary"
      >Reprendre ce cours</router-link
    >
    <router-link
      v-if="!course.possessed && store.user.isConnected"
      :to="`/detail/${course.id}`"
      class="btn btn-primary"
      >Acheter ce cours</router-link
    >
  </div>
</template>

<style scoped>
.wrapper {
  padding: 3vh 3vw;
  text-align: center;
}
</style>
