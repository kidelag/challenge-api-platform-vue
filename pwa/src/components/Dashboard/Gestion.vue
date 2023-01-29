<script async setup>
import axios from "axios";
import { ref } from "vue";

const editedUserId = ref(null);
const editedUser = ref(null);

const {
  data: { ["hydra:member"]: usersRaw },
} = await axios.get("https://localhost/users");

const users = ref(
  usersRaw.map((user) => ({
    mail: user.mail,
    firstname: user.firstname,
    lastname: user.lastname,
  }))
);
const columns = [
  {
    key: "mail",
    sortable: true,
  },
  {
    key: "firstname",
    sortable: true,
  },
  {
    key: "lastname",
    sortable: true,
  },
  {
    key: "actions",
    width: 80,
  },
];

const openModalToEditItemById = (index) => {
  editedUser.value = { ...users.value[index] };
  editedUserId.value = index;
};

const editUser = () => {
  users.value[editedUserId.value] = { ...editedUser.value };

  editedUser.value = null;
  editedUserId.value = null;
};

const resetEditedUser = () => {
  editedUser.value = null;
  editedUserId.value = null;
};

const input = "";
</script>

<template>
  <div class="wrapperPage">
    <h1>Gestion des Utilisateurs</h1>
    <div class="wrapperUsers">
      <va-data-table :items="users" :columns="columns"
        ><template #cell(actions)="{ rowIndex }">
          <va-button
            preset="plain"
            icon="edit"
            @click="openModalToEditItemById(rowIndex)"
          /> </template
      ></va-data-table>
    </div>
  </div>

  <va-modal
    class="modalEditUser"
    :model-value="!!editedUser"
    title="Edit item"
    size="small"
    @ok="editUser"
    @cancel="resetEditedUser"
  >
    <va-input
      v-for="key in Object.keys(editedUser)"
      :key="key"
      class="my-3"
      :label="key"
      v-model="editedUser[key]"
    />
  </va-modal>
</template>

<style lang="scss" scoped>
.wrapperPage {
  display: flex;

  flex-direction: column;
}

.modalEditUser {
  .va-input {
    display: block;
  }
}
</style>
