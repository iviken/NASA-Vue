<script>
  // import { ref } from 'vue'
  export default{
    props:{
      paragraph:{
        type: Object,
        required: true
      }
    },
    data(){
      return{
        expanded: this.paragraph.params.expanded || false,
        pix: this.paragraph.pix || false,
      }
    },
    methods:{
      expand(event){
        if(this.expanded){
          event.currentTarget.classList.toggle('dataBox-box_minimize')
        }
      }
    },
    created(){}
  }
</script>

<template>
  <div class="dataBox dataBox-box_minimize" @click="expand">
    <div class="dataBox-box">
      <span class="date">{{paragraph.text.name}}</span>
      <div class="dataBox-textBox">
          <div class="dataBox-textBox-tile" v-for="(value, name) in paragraph.text.body">
            <ul>
              <li>
                <span class="parametrName">{{ name.replace(/_/g, ' ') }}</span>
              </li>
              <li>
                <ul class="dataBox-textBox-tile">
                  <li v-for="(subvalue, subname) in value">
                    {{ subname }} : {{ subvalue }} 
                  </li>
                </ul>
              </li>
            </ul>
          </div>
      </div>
    </div>
    <div class="pix-box">
      <img v-if="pix" :src="pix" :class="pix ? 'dataBox-pix' : 'hide'">
    </div>
  </div>
</template>

<style scoped>
  .pix-box{
    background-color: black;
  }

  .dataBox{
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  ul, li{
    list-style-type: none;
    margin-left: 0;
    padding-left: 0;
    text-align: left;
  }

  .dataBox-box{
    padding: 10px;
    border: transparent;
  }

  
  .dataBox-textBox-tile{
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
  }
  
  .dataBox-box_minimize{
    overflow: hidden;
  }
  
  .date{
    font-weight: bolder;
  }

  .parametrName{
    text-decoration: underline;
  }
  /* desktop */
  @media screen and (min-width: 1200px) {
    .dataBox{
      font-size: smaller;
    }

    .dataBox-box_minimize{
      height: 8rem;
    }

    .dataBox-textBox{
      display: flex;
      flex-direction: row;
      text-transform: capitalize;
      justify-content: space-around;
    }

    .dataBox-pix{
      width: 50%;
    }
    
    .hide{
      display: none;
    }
    
  }
  /* mobile */
  @media screen and (max-width: 1199px) {
    .dataBox-textBox{
      display: flex;
      flex-direction: column;
      text-transform: capitalize;
      padding-left: 20px;
    }

    .dataBox-box_minimize{
      height: 4rem;
    }

    .dataBox-pix{
      width: 100%;
    }
  }
</style>
