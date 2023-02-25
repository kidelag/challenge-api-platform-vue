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
  axios
    .post(
      import.meta.env.VITE_API_URL + "/user_courses",
      {
        account: "users/" + store.user.id,
        course: "courses/" + courseId,
      },
      {
        headers: {
          Authorization: `Bearer ${store.user.token}`,
        },
      }
    )
    .then(() => {
      setBuyCourse(courseId);
      console.log("cours acheté");
    })
    .catch((err) => {
      console.log(err);
    });
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

  // axios
  //   .post(import.meta.env.VITE_API_URL + "/comments", body, {
  //     headers: {
  //       Authorization: `Bearer ${store.user.token}`,
  //     },
  //   })
  //   .then(() => {
  commentsList.value.push({
    Note: rating.value,
    Commentaire: comment.value,
    Prénom: user.firstname,
    Nom: user.lastname,
  });
  closeCommenting();
  // })
  // .catch((err) => {
  //   console.log("dbeug", err);
  // });
};

watch(rating, () => {
  console.log("debug", rating.value);
});
</script>

<template>
  <div class="wrapper">
    <h1>{{ course?.title }}</h1>

    <div class="description">Description: {{ course?.description }}</div>

    <button
      class="bttn bttn-succ"
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
      class="bttn bttn-prim-out"
      >Reprendre ce cours</router-link
    >
    <div class="wrapperCommentsList">
      <h4>Les commentaires:</h4>
      <va-data-table :items="commentsList" />
    </div>
    <button
      v-if="!course?.possessed && store.user.isConnected"
      class="bttn bttn-succ"
      @click="handleBuy"
    >
    <va-icon name="add_shopping_cart"/>
      Acheter ce cours
    </button>
    <div class="wrapperComment" v-if="commenting">
      <vue3-star-ratings v-model="rating" />
      <textarea
        v-model="comment"
        placeholder="Rentrez votre commentaire ici"
      ></textarea>
      <button class="bttn bttn-prim" @click="submitComment">
        Valider le commentaire
      </button>
    </div>
    <button
      class="bttn bttn-prim"
      v-else-if="course?.possessed && store.user.isConnected"
      @click="handleComment"
    >
      Laisser un commentaire
    </button>
    <button
      class="bttn bttn-prim-out"
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

.description {
  margin-bottom: 5vh;
}

.wrapperCommentsList {
  margin: 15vh auto 3vh auto;
  width: 50%;

}

.wrapperComment {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
