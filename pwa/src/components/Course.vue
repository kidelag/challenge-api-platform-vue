<script setup>
import { onMounted, watch, computed, toRaw } from "vue";
import { store, setBuyCourse } from "../store/store";
import router from "../router";
import { checkConnection } from "../utils/checkConnection";

const courseId = router.currentRoute.value.params.id;

const course = computed(() => {
  return store.courses.array[store.courses.selected];
});

onMounted(() => {
  checkConnection(false, "Detail");
  store.selectCourse(courseId);

  if (!course.value.possessed) router.push(`/detail/${courseId}`);
});
</script>

<template>
  <div class="wrapper">
    <h1>{{ course?.title }}</h1>
    <iframe :src="course?.pdf" width="100%" height="500px" />
  </div>
</template>

<style scoped>
.wrapper {
  padding: 3vh 3vw;
  text-align: center;
}
</style>
