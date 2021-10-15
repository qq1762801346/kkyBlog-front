import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: "/",
        name: "login",
        component: () => import("@/views/auth/Login.vue"),
    }, {
        path: "/index",
        name: "index",
        redirect: "/system/home",
        component: () => import("@/components/layout/BaseLayout.vue"),
        children: [
            {
                path: "/system/home",
                name: "home",
                component: () => import("@/views/system/Home.vue")
            },
            {
                path: "/system/user",
                name: "user",
                component: () => import("@/views/system/User.vue")
            },
            {
                path: "/desk/test",
                name: "test",
                component: () => import("@/views/desk/Test.vue")
            }
        ]
    }]
})

export default router