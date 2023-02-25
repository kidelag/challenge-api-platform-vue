<script setup>

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  }
});

</script>



<template>
    <div>
      <button class="bttn link_tab" type="button">
        <div class="container-tab">

          <va-icon :name="icon" size="small"/>
          {{ text }}
          
        </div>
        <va-icon name="chevron_right" />
      </button>
    </div>
</template>



<style lang="scss" scoped>

// div.container-tab {
//   display: flex;
//   justify-content: space-between;
  
//   button.link_tab {
//     font-size: 12px;
//     width: auto;

//     > i {
//       margin-right: 0.3rem;
//     }
//   }
//   // div.right-div {
//   //   margin-right: 1rem;
//   // }
//    > i {
//     margin-right: 1rem;
//    }
  
// }

button.link_tab {
  display: flex;
  justify-content: space-between;
  width: 100%;
  
  div.container-tab {
    font-size: 12px;
    width: 2rem;
    display: flex;

    > i {
      margin-right: 1rem;
    }
  }
  // div.right-div {
  //   margin-right: 1rem;
  // }
   > i {
    margin-right: 1rem;
   }
  
}


</style>