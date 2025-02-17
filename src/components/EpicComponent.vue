<script>
import { PATHS } from '../composables/Paths.js';
import DataBoxTable from './DataBoxTable.vue';

export default{
  components:{
    DataBoxTable
  },
  data(){
    return{
      urlPart: PATHS().epicUrlPath,
      pixPart: PATHS().epicPixUrlPath,
      APIkey: PATHS().APIkey,
      date: '',
      dateFormatted: '',
      data: [],
      error: 'Please enter date',
      showMenu_flag: true
    }
  },
  methods:{
    createRespo(){
      // Месяц и дата с ведущими нулями
      this.data = []
      this.error = 0
      if(this.date != ''){
        this.dateFormatted = `${this.date.split('-')[0]}/${this.date.split('-')[1]}/${this.date.split('-')[2]}`
        this.fullUrl = `${this.urlPart}${this.date}?api_key=${this.APIkey}`
        console.log(this.fullUrl)
        fetch(this.fullUrl)
        .then((response) => {
            this.error = 0
            if(response.ok){
              return response.json()
            }else{
              this.error = response.status
            }
          })
          .then((result) => {
            result.forEach(element => {
              this.data.push({
                text:{
                  name: element['date'],
                  body: element['coords']
                },
                pix: `${this.pixPart}${this.dateFormatted}/jpg/${element['image']}.jpg?api_key=${this.APIkey}`,
                params:{
                  rows: 5,
                  expanded: true
                }
              })
              console.log(this.data)
            })
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
    <h2>Earth <span class="expand" @click="expandMenu()">&#9660;</span></h2>
    <div class="section" v-if="showMenu_flag">
      <label>
        Date:
        <input type="date" v-model="date" required/>
      </label>
      <button @click="createRespo()" v-if="date !== ''">Submit</button>
      <button disabled v-else>Enter date</button>
      <p v-if="error">{{ error }}</p>
      <p v-else></p>
    </div>
    <div v-else="!showMenu_flag"></div>
    <div :class="showMenu_flag ? 'box dataBox hide' : 'box dataBox'">
      <DataBoxTable v-for="el in data" :paragraph="el"/>
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
