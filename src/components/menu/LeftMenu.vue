<template>
    <div class="left-menu">
        <div class="left-menu-title">
            {{ title }}
        </div>
        <el-menu
                text-color="#eae1e1"
                active-text-color="#ffd04b"
                background-color="#20222A"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                :collapse-transition="false"
                unique-opened
        >
            <tree-menu v-if="menuList.data.length > 0" :menuList="menuList.data"></tree-menu>
        </el-menu>
    </div>
</template>

<script setup>
    import {reactive, ref} from "@vue/reactivity";
    import {onMounted, watch} from "@vue/runtime-core";
    import {routersApi} from "@/api/system/Menu";
    import TreeMenu from './TreeMenu.vue'
    import store from '@/store'


    onMounted(() => {
        initRouters()
    })

    watch(
        () => store.getters.getIsCollapse,
        (newVal, oldVal) => {
            isCollapse.value = newVal
        }
    )

    const isCollapse = ref(store.getters.getIsCollapse)

    const title = ref("管理系统")

    const menuList = reactive({data: {}});

    const initRouters = () => {
        routersApi().then(res => {
            menuList.data = res
        })
    }

</script>

<style scoped>
    .left-menu-title {
        height: 80px;
        min-width: 64px;
        line-height: 80px;
        color: white;
        font-size: 36px;
        font-weight: bold;
        letter-spacing: 4px;
        text-align: center;
        background-color: #20222A;
    }

    .el-menu {
        border: none;
        height: 100vh;;
    }
</style>