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
        rows: this.paragraph.params.rows || 1,
        maxRows: this.paragraph.params.maxRows || 1,
        pix: this.paragraph.pix || false,
        expanded: this.paragraph.params.expanded || false
      }
    },
    methods:{
      expand(event){
        if(this.paragraph.params.expanded){
          event.currentTarget.rows = event.currentTarget.rows == this.rows ? this.maxRows : this.rows
        }
      }
    },
    created(){}
  }
</script>

<template>
  <div :class="pix ? 'dataBox dataBox_grid' : 'dataBox'">
      <textarea :rows="rows" readonly :class="expanded ? 'dataBox_textarea cursor_pointer' : 'dataBox_textarea cursor_default'" @click="expand">
        {{paragraph.text}}
      </textarea>
      <img v-if="pix" :src="pix" :class="pix ? 'dataBox_pix' : 'hide'">
  </div>
</template>

<style scoped>
  .dataBox_textarea, .dataBox_textarea:focus{
    text-align: justify;
    padding: 10px;
    border: transparent;
    resize: none;
    outline: none;
  }
  
  .dataBox{
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .cursor_default{
    cursor: default;
  }
  
  .cursor_pointer{
    cursor: pointer;
  }
  /* desktop */
  @media screen and (min-width: 1200px) {
    .dataBox_textarea{
      overflow: hidden;
    }
    
    .dataBox_pix{
      width: 100%;
    }
    
    .hide{
      display: none;
    }
    
    .dataBox_grid{
      display: grid;
      grid-template-columns: 3fr 1fr;
    }
    
  }
  /* mobile */
  @media screen and (max-width: 1199px) {
    .dataBox_textarea{
      overflow: hidden;
    }

    .dataBox_pix{
      display: none;
    }
  }
</style>
