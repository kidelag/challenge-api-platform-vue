<script setup>
import { onMounted, ref, shallowReactive, computed, markRaw } from "vue";
import { checkConnection } from "../../utils/checkConnection";
import { store } from "../../store/store";

import Cours from "./Cours.vue";
import Gestion from "./Gestion.vue";
import Profil from "./Profil.vue";
import Avancement from "./Avancement.vue";

const {
  user: { isAdmin, isTeacher },
} = store;
const minimized = ref(true);

const tabsAdmin = isAdmin
  ? [
      {
        icon: "settings_accessibility",
        name: "Gestion User",
        component: Gestion,
      },
    ]
  : [];
const tabsTeacher = isTeacher
  ? [{ icon: "menu_book", name: "Vos cours", component: Cours }]
  : [{ icon: "donut_small", name: "Avancement", component: Avancement }];

const userTabs = [{ icon: "face", name: "Profil", component: Profil }];

const config = shallowReactive({
  tabs: [...tabsAdmin, ...tabsTeacher, ...userTabs],
  selected: [...tabsAdmin, ...tabsTeacher][0].name,
  setSelected(name) {
    this.selected = name;
  },
});
const currentPage = computed(() => {
  const tabs = markRaw(config.tabs);
  const index = tabs.findIndex((tab) => tab.name === config.selected);

  return config.tabs[index].component;
});

const toggleMenu = () => {
  minimized.value = !minimized.value;
};

onMounted(() => {
  checkConnection(true, "dashboard");
});
</script>

<template>
  <div style="height: 90vh">
    <va-sidebar :minimized="minimized" minimizedWidth="64px">
      <va-icon
        class="m-3"
        name="arrow_forward"
        @click="toggleMenu"
        :rotation="!minimized ? 180 : 0"
      />
      <va-sidebar-item
        v-for="tab in config.tabs"
        :active="tab.name === config.selected"
        @click="
          () => {
            config.setSelected(tab.name);
          }
        "
      >
        <va-sidebar-item-content>
          <va-icon :name="tab.icon" />
          <va-sidebar-item-title>{{ tab.name }}</va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>

    <component v-bind:is="currentPage"></component>
  </div>
</template>
