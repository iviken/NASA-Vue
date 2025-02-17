<script>
import Menu from './components/MenuComponent.vue'
import TransitionComponent from './components/TransitionComponent.vue'

export default{
  components:{
    Menu, TransitionComponent
  }
}

</script>

<template>
  <section>
    <Menu class="menu" />
  </section>
  <section>
    <!-- <router-view v-slot="{Component, route}">
      <Rout :component="Component" :route="route" />
    </router-view> -->
    <!-- <router-view v-slot="{Component, route}">
      <Transition name="fade" mode="out-in">
        <div :key="route.name">
          <component :is="Component" />
        </div>
      </Transition>
    </router-view> -->
    <router-view v-slot="{Component, route}">
      <TransitionComponent :route="route">
        <component :is="Component" />
      </TransitionComponent>
    </router-view>
  </section>
</template>

<style scoped>
  .menu{
    position: fixed;
    top: 0px;
    width: 100%;
  }

  /* .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  } */
</style>