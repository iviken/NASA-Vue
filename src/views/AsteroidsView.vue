<script>
import Asteroids from '../components/AsteroidsComponent.vue'

export default{
  components:{
    Asteroids
  }
  // mounted(){
  //   document.getElementById('AsteroidsRout').scrollIntoView({behavior: 'smooth'})
  // }
}

</script>

<template>
  <section id="AsteroidsRout">
    <Asteroids id="Asteroids" class="logicSection" />
  </section>
</template>

<style scoped>
</style>