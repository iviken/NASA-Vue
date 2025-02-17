<script>
  // import { ref } from 'vue'
  export default{
    props:{
      paragraph:{
        type: Object,
        required: true
      },
      params:{
        type: Object,
        required: false
      },
      view: {
        type: String,
        required:false
      }
    },
    methods:{
      
    },
    created(){
      // this.paragraph.params.rows = this.paragraph.params.rows || '5'
      // this.paragraph.params.expanded = this.paragraph.params.expanded || false
    }
  }
</script>

<template>
  <div :class="paragraph.text.is_potentially_hazardous_asteroid ? 'dataBox hazard dataBox_fullBorder' : 'dataBox dataBox_fullBorder' ">
    <ul :class="{'dataList-table': (view === 'table'), 'dataList-tiles': (view === 'tiles')}" class="dataList">
      <li><span class="bolder">{{paragraph.text.name}}</span></li>
      <li>&#8960;{{paragraph.text.estimated_diameter[params.diameterUnits].estimated_diameter_min}}</li>
      <li>&#8960;{{paragraph.text.estimated_diameter[params.diameterUnits].estimated_diameter_max}}</li>
      <li>{{paragraph.text.absolute_magnitude_h}}</li>
      <li>{{paragraph.text.close_approach_data[0].close_approach_date_full}}</li>
      <li>{{paragraph.text.close_approach_data[0].relative_velocity[params.velocityUnits]}}</li>
      <li>{{paragraph.text.close_approach_data[0].miss_distance[params.distanceUnits]}}</li>
      <li>{{paragraph.text.is_sentry_object}}</li>
      <li>{{paragraph.text.close_approach_data[0].orbiting_body}}</li>
      <li>{{paragraph.text.is_potentially_hazardous_asteroid}}</li>
    </ul>
  </div>
</template>

<style scoped>
  .dataBox{
    cursor: default;
    /* padding: 10px; */
  }
  
  
  ul, li{
    padding-left: 0;
    margin-left: 0;
    text-decoration: none;
    list-style-type: none;
  }
  
  .bolder{
    font-weight: bolder;
  }
  
  /* desktop */
  @media screen and (min-width: 1200px) {
    .dataList-table{
      display: grid;
      grid-template-columns: repeat(10, 1fr)
    }
  
    .dataList-tiles{
      display: flex;
      flex-direction: column;
      height: 4em;
      overflow: hidden;
    }

    .dataBox{
      font-size: smaller;
    }
  }

  /* mobile <1200 */
  @media screen and (max-width: 1199px) {
    .dataBox{
      scroll-snap-align: center;
    }

    .dataList{
      display: flex;
      flex-direction: column;
      text-align: left;
      padding-left: 5px;
    }
  }

  /* mobile <800 */
  @media screen and (max-width: 800px) {
    .dataList{
      font-size:20pt;
    }
  }
</style>
