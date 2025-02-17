<script>
import {PATHS} from '../composables/Paths.js';

export default{
  data(){
    return{
      urlPart: PATHS().APODurlPart,
      APIkey: PATHS().APIkey,
      fullUrl: '',
      error: '',
      pixUrl: '',
      pixHdUrl: '',
      params: {
        type: 'image'
      }
    }
  },
  created(){
      this.fullUrl = `${this.urlPart}?api_key=${this.APIkey}`
      console.log(this.fullUrl)
      fetch(this.fullUrl)
      .then((response) => {
          this.error = ''
          if(response.ok){
            return response.json()
          }else{
            this.error = response.status
          }
        })
        .then((result) => {
          switch(result.media_type){
            case 'image':
              this.pixUrl = result.url
              this.pixHdUrl = result.hdurl
              this.params.type = 'image'
            break
          }
        })
  }
}

</script>

<template>
  <div class="section" :style="{ 'background-image': 'url(' + pixUrl + ')' }">
    <div clas="hello-block">
      <span class="hello-text">Awesom!</span>
    </div>
  </div>
</template>

<style scoped>
  .section{
    height: 100vh;
    width: 100vw;
    margin: 0px;
    padding: 0px;
    text-align: center;
    cursor: default;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  
  /* desktop */
  /* @media screen and (min-width: 1200px) { */
    .section{
      background-origin: border-box;
      -moz-background-origin: border-box;
      background-size:cover;
      background-repeat: no-repeat;
      background-position: 0% 5em;
    }

    .hello-text{
      /* z-index: 100; */
      /* font-size: 8rem;
      font-weight: 300; */
      color:rgb(250, 235, 215, 0);
      /* padding-top: 23vh;  */
      animation: pictureofdaytext 5s forwards;
    }
  
    @keyframes pictureofdaytext {
      0% {color:rgb(250, 235, 215, 0);}
      20% {color:rgb(250, 235, 215, 0);}
      100% {
        color:rgb(250, 235, 215, 1);
        /* padding-top: 40vh; */
        /* transform: translate(0px, 40vh); */
      }
    }

    /* .hello-block{
      animation: pictureofdayBlock 5s forwards;
    }
  
    @keyframes pictureofdayBlock {
      0% {
        transform: translate(0px, 0px);
      }
      100% {
        transform: translate(0px, 40vh);
      }
    } */

  /* } */
  
  /* mobile */
  /* @media screen and (max-width: 1199px) { */

  /* } */
</style>
