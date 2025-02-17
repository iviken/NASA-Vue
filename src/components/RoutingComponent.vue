<script>

export default{
  props:{
    component:{
      type: Object,
      required: true
    },
    route:{
      type: Object,
      required: true
    }
  },
  mounted(){
    console.log(this.component)
  }
}

</script>

<template>
  <Transition name="fade" mode="out-in">
    <div :key="route.name">
      <component :is="component" />
    </div>
  </Transition>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
