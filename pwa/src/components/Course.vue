<script setup>
import { onMounted, ref, computed, watchEffect } from "vue";
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
  checkConnection(false, true, "Detail");
  store.selectCourse(courseId);

  if (typeof course.value?.possessed === "boolean" && !course.value?.possessed)
    router.push(`/detail/${courseId}`);
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
