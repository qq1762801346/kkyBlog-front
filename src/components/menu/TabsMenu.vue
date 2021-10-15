<template>
    <div class="tab-menu">
        <el-row>
            <el-col :span="21">
                <el-tabs closable @tab-remove="removeTab" style="margin-left: 10px;">
                    <el-tab-pane v-for="item in editableTabs.data" :key="item.name" :label="item.title" :name="item.name">
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="2">
                <el-button type="primary" size="small">
                    更多
                    <i class="el-icon-arrow-down"></i>
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
    import {reactive, ref} from "@vue/reactivity";
    import store from '@/store'
    import {onMounted} from "@vue/runtime-core";

    onMounted(() => {
        editableTabs.data = store.getters.getTabs;
    })

    const editableTabs = reactive({data: {}})

    const removeTab = () => {

    }
</script>

<style scoped>

    .el-tabs__content {
        display: none;
    }

</style>