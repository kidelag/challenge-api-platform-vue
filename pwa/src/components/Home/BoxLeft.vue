<script setup>

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    }
});


</script>

<template>

    <div class="box-container bc-left">
        <h2 class="title-box">{{ title }}</h2>

        <div class="bc-main">

            <div class="box-item box-left">
                <img :src="img" alt="image">
            </div>
            
            <div class="box-item box-right">
                {{ text }}
            </div>
        
        </div>

    </div>

</template>


<style scoped>

div.box-container {
    margin: 0 0 7rem 0;
}

div.box-container > div.title-box {
    text-align: center;
    /* font-size: 2.5rem; */
    width: 100%;
}

div.box-container > div.bc-main {
    display: flex;
    width: 100%;

}

div.box-container > div.bc-main > div.box-left {
    /* flex: 2; */
}

div.box-container > div.bc-main > div.box-left > img {
    width: 250px;
    height: 250px;
    object-fit: cover;
}

div.box-container > div.bc-main > div.box-right {
    flex: auto;
    padding: 1rem 0 0 1rem;
    text-align: left;
}


</style>