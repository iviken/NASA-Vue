<script>
import { PATHS } from '../composables/Paths';
import DataBox from './DataBox.vue'

export default{
  components:{
    DataBox
  },
  data(){
    return{
      startDate: '',
      endDate: '',
      type: null,
      urlPart: PATHS().notifyUrlPath,
      APIkey: PATHS().APIkey,
      fullUrl: null,
      data: [],
      error: 'Please enter dates and select theme',
      showMenu_flag: true,
      selectValues:[
        "all",
        "FLR",
        "SEP",
        "CME",
        "IPS",
        "MPC",
        "GST",
        "RBE",
        'report'
      ]
    }
  },
  methods:{
    createRespo(){
      // Месяц и дата с ведущими нулями
      let regex = new RegExp("^([1-2][0-9]{3})\\-([0-9]{2})\\-([0-9]{2})$")
      this.data = []
      this.error = 0
      if( regex.test(this.startDate) && regex.test(this.endDate) && (this.type != null) ){
        if(this.startDate <= this.endDate){
          this.fullUrl = `${this.urlPart}${this.startDate}&endDate=${this.endDate}&type=${this.type}&api_key=${this.APIkey}`
          console.log(this.fullUrl)
          fetch(this.fullUrl)
            .then((response) => {
              this.error = 0
              if(response.ok){
                return response.json()
              }else{
                // console.log('notify`s problems...')
                this.error = response.status
                // this.data.push('SERVER ERROR: ' + response.status)
              }
            })
            .then((result) => {
              result.forEach(element => {
                  // console.log(element)
                  this.data.push({
                    text: element.messageBody.replace(/##/g, ''),
                    pix: false,
                    params: {
                      rows:25,
                      maxRows: 250,
                      expanded: true
                    }
                })
              })
            })
        }else{
          this.error = 'Enter start date less than end date'
          console.log('end date less than start date')
        }
      }else{
        this.error = 'date`s error'
        console.log('date`s error')
      }
      if(this.error){this.data.push(this.error)}
    },
    expandMenu(){
      this.showMenu_flag = !this.showMenu_flag
    }
  }
}

</script>

<template>
  <div class="section block">
    <ul>
      <li class="row">
        <h2>Notifications</h2>
        <span class="expand" @click="expandMenu()">&#9660;</span>
      </li>
      <li>
        <div class="section" v-if="showMenu_flag">
          <label>
            Start date:
            <input type="date" v-model="startDate" required/>
          </label>
          <label>
            End date:
            <input type="date" v-model="endDate" required/>
          </label>
          <label>
            Type:
            <select name="type" onchange="" v-model="type">
              <option v-for="option in selectValues" :value="option">{{ option }}</option>
            </select>
          </label>
          <button @click="createRespo()" v-if="(startDate !== '') && (endDate !== '') && (type !== null)">Submit</button>
          <button disabled v-else>Enter data</button>
          <p v-if="error">{{ error }}</p>
          <p v-else></p>
        </div>
      </li>
      <li>
        <div class="box dataBox" :class="{hide: showMenu_flag}">
          <DataBox v-for="el in data" :paragraph="el"/>
        </div>
      </li>
    </ul>
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
