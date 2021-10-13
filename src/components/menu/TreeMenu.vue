<template>
    <template v-for="item in prop.menuList">
        <!-- 如果当前有子菜单，则显示 el-sub-menu ，在el-sub-menu 递归调用组件 -->
        <el-sub-menu
                v-if='item.children != null'
                :index='item.menuName'
                :key="item.id"
        >
            <template #title>
                <i :class="item.menuIcon"></i>
                <span>{{ item.menuName }}</span>
            </template>
            <!-- 调用自身  此处是重点-->
            <tree-menu :menuList='item.children'></tree-menu>
        </el-sub-menu>
        <!-- 如果没有子菜单，则显示当前内容 -->
        <el-menu-item
                v-else
                :index='item.menuName'
                :key='item.id'
                @click="toRouter(item)"
        >
            <i :class="item.menuIcon"></i>
            <span>{{ item.menuName }}</span>
        </el-menu-item>
    </template>
</template>

<script setup>
    import {defineProps} from "@vue/runtime-core";

    const prop = defineProps({
        menuList: {
            type: Array,
            default: null
        }
    })

    const toRouter = (item) => {
        console.log(item.menuName)
    }

</script>

<style scoped>

</style>