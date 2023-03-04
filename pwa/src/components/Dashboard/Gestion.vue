<script async setup>
import axios from "axios";
import { ref } from "vue";
import { store } from "../../store/store";

const editedUserId = ref(null);
const editedUser = ref(null);

const {
  data: { ["hydra:member"]: usersRaw },
} = await axios.get(import.meta.env.VITE_API_URL + "/users", {
  headers: {
    Authorization: `Bearer ${store.user.token}`,
  },
});
const {
  data: { ["hydra:member"]: requestRaws },
} = await axios.get(import.meta.env.VITE_API_URL + "/formers", {
  headers: {
    Authorization: `Bearer ${store.user.token}`,
  },
});

const users = ref(
  usersRaw.map((user) => ({
    id: user.id,
    mail: user.mail,
    firstname: user.firstname,
    lastname: user.lastname,
  }))
);
console.log("debug", requestRaws);

const requests = ref(
  requestRaws
    .filter((item) => !item.valid)
    .map((item) => {
      const userId = item.userId.split("/")[item.userId.split("/").length - 1];
      const user = users.value.filter(
        (user) => user.id === parseInt(userId)
      )[0];

      return {
        id: item.id,
        firstname: user.firstname,
        lastname: user.lastname,
        mail: user.mail,
        accountBankName: item.accountBankName,
        accountIban: item.accountIban,
        accountOwner: item.accountOwner,
      };
    })
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
const columnsRequest = [
  {
    key: "firstname",
    sortable: true,
  },
  {
    key: "lastname",
    sortable: true,
  },
  {
    key: "mail",
    sortable: true,
  },
  {
    key: "accountBankName",
    sortable: true,
  },
  {
    key: "accountIban",
    sortable: true,
  },
  {
    key: "accountOwner",
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

const validateChangeRole = (index) => {
  const formerId = requests.value[index].id;

  axios
    .put(
      import.meta.env.VITE_API_URL + "/formers/" + formerId,
      { valid: true },
      {
        headers: {
          Authorization: `Bearer ${store.user.token}`,
        },
      }
    )
    .then(() => {
      console.log();
      requests.value.splice(index, 1);
    });
};
const refuseChangeRole = () => {};
</script>

<template>
  <div class="wrapperPage">
    <div>
      <h1>Gestion des Utilisateurs</h1>
      <div class="wrapperUsers">
        <va-data-table
          :items="users"
          :columns="columns"
          :wrapper-size="500"
          :item-size="46"
          virtual-scroller
          ><template #cell(actions)="{ rowIndex }">
            <va-button
              preset="plain"
              icon="edit"
              @click="openModalToEditItemById(rowIndex)"
            /> </template
        ></va-data-table>
      </div>
    </div>
    <div>
      <h1>Demandes de Passage en Prof</h1>
      <div class="wrapperRequests">
        <va-data-table
          :items="requests"
          :columns="columnsRequest"
          :wrapper-size="500"
          :item-size="46"
          virtual-scroller
          ><template #cell(actions)="{ rowIndex }">
            <va-button
              preset="plain"
              icon="check"
              @click="validateChangeRole(rowIndex)"
            />
            <va-button
              preset="plain"
              icon="close"
              @click="refuseChangeRole(rowIndex)"
            /> </template
        ></va-data-table>
      </div>
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
  margin-left: 10vw;
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 5vw;
}

.modalEditUser {
  .va-input {
    display: block;
  }
}
</style>
