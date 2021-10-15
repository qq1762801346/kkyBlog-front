import {createStore} from 'vuex'
import {mutations} from './mutations'
import {actions} from './actions'

const store = createStore({
    state: {
        user: {},
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
    getters: {
        getIsCollapse(state) {
            return state.menu.isCollapse
        },
        getTabs(state) {
            return state.menu.tabs
        },
        getUser(state) {
            return state.user
        },
        getToken(state) {
            if(!state.user.token) return localStorage.getItem("Kky-Token")
            else return state.user.token
        }
    },
    mutations,
    actions
})

export default store