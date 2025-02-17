import { createRouter } from 'vue-router'
import AsteroidsView from '../views/AsteroidsView.vue'
import NotifyView from '../views/NotifyView.vue'
import EpicView from '../views/EpicView.vue'
import TechView from '../views/TechView.vue'
import Apod from '../components/APODComponent.vue'

const routes= [
    {
        path: '/',
        name: 'apod',
        component: Apod
    },
    {
        path: '/asteroids',
        name: 'asteroids',
        component: AsteroidsView
    },
    {
        path: '/notifications',
        name: 'notify',
        component: NotifyView
    },
    {
        path: '/epic',
        name: 'epic',
        component: EpicView
    },
    {
        path: '/tech-transfer',
        name: 'tech',
        component: TechView
    }
]

export default function(history){
    return createRouter( {history, routes} )
}
// export default function(history){
//     return createRouter({
//         history, routes, scrollBehavior(to){
//             console.log(to.name)
//             if(to.name == 'asteroids'){
//                 return{
//                     // el: '#AsteroidsRout'
//                     top: 1000
//                 }
//             }
//         }
//     })
// }