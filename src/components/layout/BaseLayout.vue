<template>
    <div>
        <el-row class="tac">
            <el-col :xl="left" :lg="left" :md="0" :sm="0" :xs="0" class="hidden-sm-only hidden-xs-only">
                <left-menu class="left-menu hidden-sm-only hidden-xs-only" :isCollapse="isCollapse"></left-menu>
            </el-col>
            <el-col :xl="right" :lg="right" :md="24" :sm="24" :xs="24">
                <top-menu class="top-menu" :isCollapse="isCollapse"></top-menu>
                <tabs-menu class="tabs-menu hidden-sm-only hidden-xs-only"></tabs-menu>
                <router-view class="main-view"></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
    import LeftMenu from '@/components/menu/LeftMenu.vue'
    import TopMenu from '@/components/menu/TopMenu.vue'
    import TabsMenu from '@/components/menu/TabsMenu.vue'
    import {ref} from "@vue/reactivity"
    import store from '@/store'
    import {watch} from "@vue/runtime-core"
    import 'element-plus/theme-chalk/display.css'

    watch(
        () => store.getters.getIsCollapse,
        (newVal, oldVal) => {
           changeMenu(newVal)
        }
    )

    const left = ref(4)
    const right = ref(20)
    const isCollapse = ref(store.getters.getIsCollapse)

    const changeMenu = (res) => {
        isCollapse.value = res
        if(isCollapse.value === true) {
            left.value = 1
            right.value = 23
        } else {
            left.value = 4
            right.value = 20
        }
    }
</script>

<style scoped>

    .top-menu {
        height: 30px;
        margin-top: 10px;
        padding: 15px;
    }

    .main-view {
        height: 850px;
        padding: 20px;
        background-color: #EBEDF0;
    }

</style>