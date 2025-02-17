<script>
import { PATHS } from '../composables/Paths';
import DataBox from './DataBox.vue'

export default{
  components:{
    DataBox
  },
  data(){
    return{
      theme: '',
      type: null,
      urlPart: PATHS().techTransferUrlPath,
      APIkey: PATHS().APIkey,
      fullUrl: null,
      urls: [],
      data: [],
      error: 'Please enter theme and select type',
      showMenu_flag: true,
      selectVaues:{
        "patent": "patent",
        "patent_issued": "patent issued",
        "software": "software",
        "Spinoff": "spinoff"
      }
    }
  },
  methods:{
    createRespo(){
      // Месяц и дата с ведущими нулями
      this.data = []
      if( (this.theme != '') && (this.type != null) ){
        this.error = 0
        this.fullUrl = `${this.urlPart}${this.type}/?${this.theme}&api_key=${this.APIkey}`
        console.log(this.fullUrl)
        fetch(this.fullUrl)
          .then((response) => {
            this.error = ''
            if(response.ok){
              return response.json()
            }else{
              this.error = response.status == '404' ? 'Nothing. Try another options.' : response.status
              return 0
            }
          })
          .then((result) => {
            if(result){
              result['results'].forEach(element => {
                this.data.push({
                  text: `${element[2].replace(/(<([^>]+)>)/gi, '')}\n${element[3].replace(/(<([^>]+)>)/gi, '')}\n${element[5]}\n${element[6]}`,
                  pix: element[10],
                  params:{
                    rows: 16,
                    maxRows: 30,
                    expanded: true
                  }
                })
                // console.log(element)
              })
            }
          })
      }else{
        this.error = 'data error'
        console.log('data error')
      }
      if(this.error){
        this.data.push({
          text: this.error,
          pix: ''
        })
      }
    },
    expandMenu(){
      this.showMenu_flag = !this.showMenu_flag
    }
  }
}

</script>

<template>
  <div class="section block">
    <h2>TechTransfer <span class="expand" @click="expandMenu()">&#9660;</span></h2>
    <div class="section" v-if="showMenu_flag">
      <label>
        Theme:
        <input type="theme" v-model="theme" required/>
      </label>
      <label>
        Type:
        <select name="type" onchange="" v-model="type">
          <option v-for="option in selectVaues" :value="option">{{ option }}</option>
        </select>
      </label>
      <button @click="createRespo()" v-if="(theme !== '') && (type !== null)">Submit</button>
      <button disabled v-else>Enter data</button>
      <p><span v-if="error">{{ error }}</span></p>
    </div>
    <div v-else="!showMenu_flag"></div>
    <div :class="showMenu_flag ? 'box dataBox hide' : 'box dataBox'">
      <DataBox v-for="el in data" :paragraph="el"/>
    </div>
  </div>
</template>

<style scoped>
  /* mobile */
  @media screen and (max-width: 1199px) {
    .hide{
      display: none;
    }
  }
</style>
