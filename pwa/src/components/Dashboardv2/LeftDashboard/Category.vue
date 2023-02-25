<script setup>

import Tab from './Tab.vue';

const links2 = [
  {
    title: "Yahoo",
    link: "https://www.yahoo.com",
    icon: "face",
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com",
    icon: "shopping_cart",
  },
  {
    title: "Spotify",
    link: "https://www.spotify.com",
    icon: "star",
  },
  
]

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

</script>



<template>
    <div class="box">
        <h5 class="title">{{ title }}</h5>
        <div class="fill-title"></div>
        <div v-for="l in links2">
            <Tab :text="l.title" :icon="l.icon"/>
        </div>
    </div>
</template>



<style lang="scss" scoped>

div.box {
    // margin: 2rem;
    text-align: left;
    margin-bottom: 1rem;

    h5.title {
        color: rgb(187, 187, 187);
        text-transform: uppercase;
    }
    div.fill-title {
      width: auto;
      height: 1px;
      background-color: rgb(153, 153, 153);
      margin: 0 2rem 0.3rem 0;
    }
}


</style>