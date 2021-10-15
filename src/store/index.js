import {createStore} from 'vuex'
import {mutations} from './mutations'
import {actions} from './actions'

const store = createStore({
    state:{
         menu: {
             isCollapse: false,
             tabs: [
                 {
                     title: '首页',
                     name: 'home'
                 }
             ]
         }
    },
    getters:{
        getIsCollapse(state) {
            return state.menu.isCollapse
        },
        getTabs(state) {
            return state.menu.tabs
        }
    },
    mutations,
    actions
})

export default store