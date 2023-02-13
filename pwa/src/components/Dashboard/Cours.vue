<script setup>
import axios from "axios";
import { ref } from "vue";
import { store } from "../../store/store";

const editedCourseId = ref(null);
const editedCourse = ref(null);

const {
  data: { ["hydra:member"]: coursesRaw },
} = await axios.get("https://localhost/courses");

const courses = ref(
  coursesRaw.map((course) => {
    // TO CHANGE WITH USERID
    // const {
    //   data: { ["hydra:member"]: user },
    // } = axios.get("https://localhost/users/" + 10);
    const user = {
      firstname: "Prénom",
      lastname: "Nom",
    };

    return {
      Titre: course.title,
      Author: `${user.firstname} ${user.lastname}`,
      isValid: course.valid,
      id: course.id,
    };
  })
);

const columns = [
  {
    key: "Titre",
    sortable: true,
  },
  {
    key: "Author",
    sortable: true,
  },
  {
    key: "actions",
    width: 80,
  },
];

const openModalToEditItemById = (index) => {
  const { isValid, id, Author, ...editableField } = courses.value[index];
  editedCourse.value = { ...editableField };
  editedCourseId.value = index;
};

const editCourse = () => {
  courses.value[editedCourseId.value] = { ...editedCourse.value };

  editedCourse.value = null;
  editedCourseId.value = null;
};

const resetEditedCourse = () => {
  editedCourse.value = null;
  editedCourseId.value = null;
};

const reviewCourse = (isValid, id, rowIndex) => {
  axios
    .put("https://localhost/courses/" + id, {
      valid: isValid,
    })
    .then(() => {
      courses.value[rowIndex] = {
        ...courses.value[rowIndex],
        isValid: isValid,
      };
    })
    .catch((err) => {
      console.log("debug", err);
    });
};
</script>

<template>
  <div class="wrapperPage">
    <h1
      v-if="
        (store.user.isTeacherValid && store.user.isTeacher) ||
        store.user.isAdmin
      "
    >
      Gérer les cours
    </h1>
    <h1 v-else-if="store.user.isTeacherValid && store.user.isTeacher">
      Gérer vos cours
    </h1>
    <h1 v-else>Un administrateur va valider votre demande.</h1>

    <va-data-table
      :items="courses"
      :columns="columns"
      :wrapper-size="500"
      :item-size="46"
      virtual-scroller
      ><template #cell(actions)="{ rowIndex }">
        <va-button
          v-if="!courses[rowIndex].isValid"
          preset="plain"
          icon="check"
          @click="reviewCourse(true, courses[rowIndex].id, rowIndex)"
        />
        <va-button
          v-if="!courses[rowIndex].isValid"
          preset="plain"
          icon="close"
          @click="reviewCourse(false, courses[rowIndex].id, rowIndex)"
        />
        <va-button
          v-else
          preset="plain"
          icon="edit"
          @click="openModalToEditItemById(rowIndex)"
        /> </template
    ></va-data-table>

    <va-modal
      class="modalEditCourse"
      :model-value="!!editedCourse"
      title="Edit item"
      size="small"
      @ok="editCourse"
      @cancel="resetEditedCourse"
    >
      <va-input
        v-for="key in Object.keys(editedCourse)"
        :key="key"
        class="my-3"
        :label="key"
        v-model="editedCourse[key]"
      />
    </va-modal>
  </div>
</template>

<style lang="scss" scoped>
.wrapperPage {
  display: flex;

  flex-direction: column;
}

.modalEditCourse {
  .va-input {
    display: block;
  }
}
</style>
