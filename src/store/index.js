import {createStore} from 'vuex'
import {mutations} from './mutations'
import {actions} from './actions'

const store = createStore({
    state:{
         typeId: 'user001',
         showName: true,
         count: 0,
         user:{
            name: 'joy',
            pwd: '123456'
         }
    },
    getters:{
        getId(state){
            return state.typeId
        },
        getUser(state){
            return state.user
        }
 
    },
    mutations,
    actions
})

export default store