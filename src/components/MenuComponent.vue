<script>

export default{
  data(){
    return{
      showMenu_flag: false
    }
  },
  methods:{
    expandMenu(){
      this.showMenu_flag = !this.showMenu_flag
    },
    scrollMeTo(ref) {
      // window.scrollTo(0, this.$refs[ref].offsetTop)
      // console.log(this)
   }
  }
}

</script>

<template>
<header @click="expandMenu()">
  <menu>
    <div class="menuBlock">
      <span class="burger">&equiv;</span>
      <ul class="menuList" :class="{mobile: !showMenu_flag}">
        <li>
          <router-link :to="{name: 'asteroids'}">
            <span @click="scrollMeTo('asteroids')">Asteroids</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'notify'}">
            Notifications
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'epic'}">
            Earth
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'tech'}">
            TechTransfer
          </router-link>
        </li>
      </ul>
    </div>
  </menu>
</header>
</template>

<style scoped>
  /* desktop */
  @media screen and (min-width: 1200px) {
    .menuBlock, menu, header{
      /* text-align: center; */
      display: flex;
      justify-content: center;
      width: 100%;
      padding-left: 0px;
      /* border: solid red; */
    }

    .menuList{
      /* border: solid rgb(0, 225, 255); */
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content:center;
      /* display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr 1fr 2fr; */
      /* text-align: center; */
      list-style-type: none;
      padding-left: 0px;
      padding-right: 4ex;
      /* margin-left: 0px; */
      /* margin-top: 2rem; */
    }
    
    ul>li{
      /* text-align: center; */
      padding-left: 0px;
      /* margin-left: 0px; */
    }
    
    a{
      /* text-align: center;
      width: 200px;
      display: block; */
      margin-left: 20px;
      margin-right: 20px;
      text-decoration: none;
      text-transform: uppercase;
    }

    .burger{
      display: none;
    }
  }

  /* mobile */
  @media screen and (max-width: 1199px) {
    .menuList{
      width: 100%;
      display: flex;
      flex-direction: column;
      list-style-type: none;
      padding-left: 0px;
    }

    .menuBlock, menu, header, .menuList{
      padding-top: 0px;
      margin-top: 0px;
    }

    .menuBlock{
      background-position: 50% 1.5em;
    }

    a{
      text-decoration: none;
      text-transform: uppercase;
      font-size: 2em;
    }

    .burger{
      font-size: 3em;
    }

    .mobile{
      display: none;
    }
  }
</style>
