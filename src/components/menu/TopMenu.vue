<template>
    <div class="top-menu">
        <el-row>
            <el-col :span="2">
                <fold v-if="isCollapse === false" class="top-menu-icon" @click="changeMenu"/>
                <expand v-else class="top-menu-icon" @click="changeMenu"/>
            </el-col>
            <el-col :lg="2" :md="2" :sm="3" :xs="4">
                <router-link to="" class="flex-box router-link">
                    <grid class="top-menu-icon"/>
                    <span style="margin-left: 5px;line-height: 19px;">首页</span>
                </router-link>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
    import {Fold, Expand, Grid} from '@element-plus/icons'
    import {ref} from "@vue/reactivity";
    import {defineEmits, watch} from "@vue/runtime-core";
    import store from "@/store";

    const isCollapse = ref(store.getters.getIsCollapse);

    watch (
        () => store.getters.getIsCollapse,
        (newVal, oldVal) => {
            isCollapse.value = newVal
            console.log(isCollapse.value)
        }
    )

    const changeMenu = () => {
        store.state.menu.isCollapse = !store.state.menu.isCollapse
    }

</script>

<style scoped>

    .top-menu-icon {
        width: 19px;
        height: 19px;
        cursor:pointer;
    }

    .flex-box {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: flex-start;
    }

    .router-link {
        color: black;
        text-decoration: none;
    }

</style>