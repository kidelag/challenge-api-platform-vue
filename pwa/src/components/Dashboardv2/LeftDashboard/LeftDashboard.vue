<script setup>

import Category from './Category.vue';

const links2 = [
  {
    title: "Yahoo",
    link: "https://www.yahoo.com"
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com"
  },
  {
    title: "Spotify",
    link: "https://www.spotify.com"
  },
  
]

</script>



<template>
    <div class="left-board">
        <h3>Dashboard</h3>
        <div class="fill-title"></div>
        <div v-for="l in links2" class="content">
            <Category :title="l.title"/>
        </div>
    </div>
</template>



<style lang="scss" scoped>

div.left-board {
    width: 15vw;
    min-height: 100vh;
    padding-top: 1rem;
    background-color: #262C31;
    color: var(--color-text-dark);
    text-align: center;

    div.fill-title {
      width: auto;
      height: 1px;
      background-color: rgb(153, 153, 153);
      margin: 1rem 2rem;
    }

    div.content {
        padding: 1rem 0 0 .5rem;
    }
}


</style>