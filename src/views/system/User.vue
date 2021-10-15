<template>
    <basic-container>
        <div class="flex-between">
            <el-button type="primary" size="small" @click="openDialog('新增')">
                <i class="el-icon-plus"></i>
                新增
            </el-button>
            <div class="flex-around">
                <el-button size="medium" icon="el-icon-refresh-right" circle @click="list"></el-button>
            </div>
        </div>
        <el-table :data="tableData" style="width: 100%; margin-top: 20px;" :height="450" v-loading="loading"
                  @selection-change="handleSelection" :border="true" :row-style="{height: '0'}" :cell-style="{padding: '0', textAlign: 'center'}"
                  :header-row-style="{height: '0'}" :header-cell-style="{padding: '0', textAlign: 'center'}">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="userNick" label="姓名" width="120" />
            <el-table-column prop="userAcc" label="账号" width="120" />
            <el-table-column prop="headIcon" label="头像" width="600" />
            <el-table-column fixed="right" label="操作" width="200">
                <template #default="scope">
                    <el-button type="text" size="small" @click="openDialog('查看', scope.row)">查看</el-button>
                    <el-button type="text" size="small" @click="openDialog('编辑', scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteOne(scope.row)">删除</el-button>
                </template>
            </el-table-column>
            <template #empty>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K" alt="">
                <p style="height: 10px; line-height: 10px;">暂无数据</p>
            </template>
        </el-table>

        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%">
            <el-form ref="formRef" :model="data" :rules="dataRules" label-width="60px" label-position="right">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="userNick">
                            <el-input v-model="data.userNick" placeholder="请输入姓名" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="账号" prop="userAcc">
                            <el-input v-model="data.userAcc" placeholder="请输入账号" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="密码" prop="userPwd">
                            <el-input v-model="data.userPwd" placeholder="请输入密码" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div style="margin-top: 2%; width: 100%; text-align: center">
                    <el-button type="primary" size="medium" @click="submit">确定</el-button>
                    <el-button size="medium" @click="cancel">取消</el-button>
                </div>
            </el-form>
        </el-dialog>
    </basic-container>
</template>

<script setup>
    import BasicContainer from '@/components/layout/BasicContainer.vue'
    import {reactive, ref} from "@vue/reactivity";
    import {listApi, submitApi, detailApi, deleteApi} from '@/api/system/User.js'
    import {onMounted} from "@vue/runtime-core";
    import {ElMessage, ElMessageBox} from "element-plus";
    import md5 from 'js-md5'

    onMounted(() => {
        list();
    })

    const formRef = ref()
    const tableData = reactive([])
    const selection = reactive([])
    const loading = ref(false)
    const dialogVisible = ref(false)
    const dialogTitle = ref()
    const data = reactive({
        userNick: '',
        userAcc: '',
        userPwd: ''
    })
    const dataRules = {
        userNick: [{
           required: true,
           message: '请输入昵称',
           trigger: ['blur', 'change']
        }],
        userAcc: [{
            required: true,
            message: '请输入账号',
            trigger: ['blur', 'change']
        }],
        userPwd: [{
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
        }],
    }

    /* 列表获取 */
    const list = () => {
        loading.value = true
        listApi().then(res => {
            tableData.splice(0, tableData.length)
            for(let data of res.data) {
                tableData.push(data)
            }
            loading.value = false
        })
    }

    /* 对话框 */
    const openDialog = (type, row) => {
        if(type === '编辑' || type === '查看') {
            detailApi(row.id).then(res => {
                console.log(res.data)
            })
        }
        dialogTitle.value = type
        dialogVisible.value = true
    }

    /* 提交 */
    const submit = () => {
        formRef.value.validate(valid => {
            if(valid) {
                let md5Data = Object.assign({}, data)
                md5Data.userPwd = md5(md5Data.userPwd)
                submitApi(data).then(res => {
                    ElMessage({
                        type: 'success',
                        message: res.msg
                    })
                    dialogVisible.val = false
                    list()
                })
            }
        })
    }

    /* 取消 */
    const cancel = () => {
        dialogVisible.value = false
    }

    /* 单条删除 */
    const deleteOne = (row) => {
        ElMessageBox.confirm('确认删除该条记录', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            deleteApi(row.id).then(res => {
                ElMessage.success("删除成功")
                list()
            })
        })
    }

    /* 多选框 */
    const handleSelection = (val) => {
        console.log(val)
    }

    /* 批量删除 */
    const deleteBatch = () => {

    }
</script>

<style scoped>
    /deep/ .el-input {
        margin-left: 5%;
        width: 80%;
    }
</style>