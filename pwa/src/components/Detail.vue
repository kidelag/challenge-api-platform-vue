<script setup>
import { onMounted, watchEffect, watch, computed, ref } from "vue";
import { store, setBuyCourse } from "../store/store";
import router from "../router";
import { checkConnection } from "../utils/checkConnection";
import axios from "axios";

const { user } = store;

const courseId = router.currentRoute.value.params.id;
const courses = ref({});
const rating = ref(2.5);
const comment = ref("");
const commenting = ref(false);

const commentsList = ref([
  { Note: 2, Commentaire: "Franchement pas ouf", Prénom: "Prénom", Nom: "Nom" },
  { Note: 2, Commentaire: "Franchement pas ouf", Prénom: "Prénom", Nom: "Nom" },
  { Note: 2, Commentaire: "Franchement pas ouf", Prénom: "Prénom", Nom: "Nom" },
]);

const course = computed(() => {
  return store.courses.selected ? courses.value[store.courses.selected] : {};
});

watchEffect(() => {
  courses.value = store.courses.list;
});

onMounted(() => {
  checkConnection(false, false, "Detail");
  store.selectCourse(courseId);
});

const handleBuy = () => {
  setBuyCourse(courseId);
};

const handleComment = () => {
  commenting.value = !commenting.value;
};

const closeCommenting = () => {
  rating.value = 2.5;
  comment.value = "";
  commenting.value = false;
};

const submitComment = () => {
  const body = {
    course: "courses/" + courseId,
    userId: "users/" + user.id,
    star: Math.round(rating.value),
    content: comment.value,
  };

  console.log("debug", body);
  axios
    .post(import.meta.env.VITE_API_URL + "/comments", body)
    .then(() => {
      commentsList.value.push({
        Note: rating.value,
        Commentaire: comment.value,
        Prénom: user.firstname,
        Nom: user.lastname,
      });
      closeCommenting();
    })
    .catch((err) => {
      console.log("dbeug", err);
    });
};

watch(rating, () => {
  console.log("debug", rating.value);
});
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
      Connexion
    </button>

    <router-link
      v-if="course?.possessed && store.user.isConnected"
      :to="`/course/${courseId}`"
      class="btn btn-outline-primary"
      >Reprendre ce cours</router-link
    >
    <div class="wrapperCommentsList">
      <va-data-table :items="commentsList" />
    </div>
    <button
      v-if="!course?.possessed && store.user.isConnected"
      class="btn btn-primary"
      @click="handleBuy"
    >
      Acheter ce cours
    </button>
    <div class="wrapperComment" v-if="commenting">
      <vue3-star-ratings v-model="rating" />
      <textarea
        v-model="comment"
        placeholder="Rentrez votre commentaire ici"
      ></textarea>
      <button class="btn btn-primary" @click="submitComment">
        Valider le commentaire
      </button>
    </div>
    <button
      class="btn btn-primary"
      v-else-if="course?.possessed && store.user.isConnected"
      @click="handleComment"
    >
      Laisser un commentaire
    </button>
    <button
      class="btn btn-primary-outline"
      v-if="course?.possessed && store.user.isConnected && commenting"
      @click="closeCommenting"
    >
      Annuler
    </button>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 3vh 3vw;
  text-align: center;
}

.wrapperCommentsList {
  margin: 3vh 0;
}

.wrapperComment {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
