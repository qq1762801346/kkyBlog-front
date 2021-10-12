<template>
    <div v-for="item in prop.menuList">
        <!-- 如果当前有子菜单，则显示 el-sub-menu ，在el-sub-menu 里调用 递归组件 -->
        <el-sub-menu
                v-if='item.children != null'
                :index='item.menuName'
                :key="item.id"
        >
            <template #title>{{item.menuName}}</template>
            <!-- 调用自身  此处是重点-->
            <tree-menu :menuList='item.children'></tree-menu>
        </el-sub-menu>
        <!-- 如果没有子菜单，则显示当前内容 -->
        <el-menu-item
                v-else
                :index='item.menuName'
                :key='item.id'
        >{{item.menuName}}
        </el-menu-item>
    </div>
</template>

<script setup>
    import {defineProps, onMounted} from "@vue/runtime-core";

    onMounted(() => {
        console.log(prop.menuList)
    })

    const prop = defineProps({
        menuList: {
            type: Array,
            default: null
        }
    })

</script>

<style scoped>

</style>