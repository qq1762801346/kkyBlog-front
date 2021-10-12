<template>
    <el-radio-group v-model="isCollapse">
        <el-radio-button :label="false">expand</el-radio-button>
        <el-radio-button :label="true">collapse</el-radio-button>
    </el-radio-group>
    <el-menu
            text-color="#eae1e1"
            active-text-color="#ffd04b"
            background-color="#20222A"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            unique-opened
            @open="handleOpen"
            @close="handleClose"
    >
        <tree-menu v-if="menuList.data.length > 0" :menuList="menuList.data"></tree-menu>
    </el-menu>
</template>

<script setup>
    import {reactive, ref} from "@vue/reactivity";
    import {onMounted} from "@vue/runtime-core";
    import {routersApi} from "@/api/system/Menu";
    import TreeMenu from './TreeMenu.vue'
    import HelloWorld from '../HelloWorld.vue'

    const msg = ref("hello")

    onMounted(() => {
        initRouters()
    })

    let menuList = reactive({data: {}});

    const initRouters = () => {
        routersApi().then(res => {
            menuList.data = res
            console.log(menuList.data)
        })
    }

    const isCollapse = ref(false)
    const handleOpen = (key, keyPath) => {
        console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
        console.log(key, keyPath)
    }
</script>

<style scoped>
    left {
        color: #eae1e1;
    }
</style>