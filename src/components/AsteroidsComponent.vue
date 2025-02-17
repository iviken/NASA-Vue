<script>
import DataBoxTable from './AsteroidsDataBox.vue'
import {PATHS} from '../composables/Paths.js'

export default{
  components:{
    DataBoxTable
  },
  data(){
    return{
      urlPart: PATHS().asteroidsUrlPart,
      APIkey: PATHS().APIkey,
      date: '',
      data: [],
      error: 'Meteor forecast today',
      showMenu_flag: true,
      view: 'table',
      viewParams:{
        diameterUnits: 'meters',
        velocityUnits: 'kilometers_per_second',
        distanceUnits: 'astronomical'
      },
      selectValues:{
        diameterUnits:[
          'meters',
          'kilometers',
          'miles',
          'feet'
        ],
        velocityUnits:{
          'km/s': 'kilometers_per_second',
          'km/h': 'kilometers_per_hour',
          'miles/h': 'miles_per_hour'
        },
        distanceUnits:[
          'astronomical',
          'kilometers',
          'lunar',
          'miles'
        ]
      }
    }
  },
  created(){
    this.date = new Date().toJSON().split('T')[0]
    if(this.date != ''){
      this.error = 0
      this.fullUrl = `${this.urlPart}?start_date=${this.date}&end_date=${this.date}&api_key=${this.APIkey}`
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
          result.near_earth_objects[this.date].forEach(element => {
            this.data.push({
              text: element,
              pix: '',
              params:{
                // rows: 5,
                expanded: false
              }
            })
            // console.log(element)
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
  methods:{
  }
}

</script>

<template>
  <div class="section block">
    <h2>Asteroids today</h2>
    <p><span v-if="error">{{ error }}</span></p>
    <div class="section hideMobile">
      <label>
        View:
        <select name="view" v-model="view">
          <option value="tiles">tiles</option>
          <option value="table" selected>table</option>
        </select>
      </label>
      <p></p>
    </div>
    <div class="sectionMobile">
      <div :class="{hideDesktop: (view==='tiles')}">
        <ul class="table-name">
          <li>name</li>
          <li>
            estimated dia. (Min)
            <select name="diameterUnits" v-model="viewParams.diameterUnits">
              <!-- <option value="meters" selected>m</option>
              <option value="kilometers">km</option>
              <option value="miles">miles</option>
              <option value="feet">feet</option> -->
              <option v-for="option in selectValues.diameterUnits" :value="option">{{ option }}</option>
            </select>
          </li>
          <li>estimated dia. (Max)</li>
          <li>absolute magnitude</li>
          <li>close approach date</li>
          <li>
            relative velocity
            <select name="velocityUnits" v-model="viewParams.velocityUnits">
              <!-- <option value="kilometers_per_second" selected>km/s</option>
              <option value="kilometers_per_hour">km/h</option>
              <option value="miles_per_hour">miles/h</option> -->
              <option v-for="(option, index) in selectValues.velocityUnits" :value="option">{{ index }}</option>
            </select>
          </li>
          <li>
            miss dist.
            <select name="distanceUnits" v-model="viewParams.distanceUnits">
              <!-- <option value="astronomical" selected>astronomical</option>
              <option value="kilometers">kilometers</option>
              <option value="lunar">lunar</option>
              <option value="miles">miles</option> -->
              <option v-for="option in selectValues.distanceUnits" :value="option">{{ option }}</option>
            </select>
          </li>
          <li>is sentry object</li>
          <li>orbiting body</li>
          <li>potentially hazardous</li>
        </ul>
      </div>
      <div class="box dataBox" :class="{tiles: (view==='tiles')}">
        <DataBoxTable v-for="el in data" :paragraph="el" :params="this.viewParams" :view="view" :class="{tileSpace: (view==='tiles')}" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  // Variables

  $tile-Margin: 20px;
  $tableHead-fontSize: 20pt;
  $box-height_desktop: 75vh;

  //

  // .section{
  //   text-align: center;
  // }

  .table-name{
    text-transform: capitalize;
    list-style-type: none;
    padding-left: 0;
    margin-left: 0;
  }
  
  
  
  /* desktop */
  @media screen and (min-width: 1200px) {
    .table-name{
      text-decoration: underline;
    }
    
    .box {
      height: $box-height_desktop;
      overflow: scroll;
    }

    .tiles{
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      width: fit-content;
    }
    
    .tileSpace{
      margin: $tile-Margin;
    }

    .table-name{
      display: grid;
      grid-template-columns: repeat(10, 1fr)
    }

    .hideDesktop{
      display: none;
    }
  }
  
  /* mobile  <1200 */
  @media screen and (max-width: 1199px) {
    .box {
      height: 30rem;
      overflow: scroll;
      scroll-snap-type: y mandatory;
    }

    .sectionMobile{
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    /* .section>label{
      margin-top: 20px;
      margin-bottom: 20px;
    } */

    .table-name{
      display: flex;
      flex-direction: column;
      text-align: right;
    }
    
    .hideMobile{
      display: none;
    }
  }
  
  /* mobile <800 */
  @media screen and (max-width: 800px) {
    .box{
      height: 25rem;
    }

    .table-name{
      font-size: $tableHead-fontSize;
    }
  }
</style>
