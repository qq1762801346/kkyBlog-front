<template>
    <div class="tab-menu">
        <el-tabs
                v-model="editableTabsValue"
                closable
                @tab-remove="removeTab"
        >
            <el-tab-pane
                    v-for="item in editableTabs"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name"
            >
                {{ item.content }}
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
    import {reactive, ref} from "@vue/reactivity";

    const editableTabsValue = ref(2)

    const editableTabs = [
        {
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1 content',
        },
        {
            title: 'Tab 2',
            name: '2',
            content: 'Tab 2 content',
        },
    ]

    const tableIndex = ref(2)

    const removeTab = () => {

    }
</script>

<style scoped>
    .tab-menu {
        margin-left: 20px;
    }
</style>