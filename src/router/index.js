import {createRouter,createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: "/",
        name: "login",
        component: () => import( "@/views/auth/Login.vue"),
    },{
        path: "/index",
        name: "index",
        component: () => import( "@/views/demo/Student.vue"),
    }]
})

export default router