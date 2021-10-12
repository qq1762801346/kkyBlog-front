<template>
    <div class="main">
        <div class="login-box">
            <div class="login-box-left">

            </div>
            <div class="login-box-right">
                <div class="right-content">
                    <div class="login-box-title">管理系统</div>
                    <el-form ref="loginRef" :model="loginForm" :rules="loginRules">
                        <el-form-item prop="account">
                            <el-input v-model="loginForm.userAcc" size="medium" placeholder="请输入登录账号"
                                      prefix-icon="el-icon-user" clearable></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="loginForm.userPwd" size="medium" placeholder="请输入登录密码"
                                      prefix-icon="el-icon-lock" clearable show-password></el-input>
                        </el-form-item>
                        <el-form-item prop="captcha">
                            <el-row>
                                <el-col :span="16">
                                    <el-input v-model="loginForm.captcha" size="medium" placeholder="请输入验证码"
                                              prefix-icon="el-icon-lock" clearable>
                                    </el-input>
                                </el-col>
                                <el-col :span="8">
                                    <img class="login-captcha" :src="captcha.code" alt="点击刷新" @click="getCaptcha"/>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="login-button" type="primary" @click.native.prevent="toLogin">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {loginApi, captchaApi} from '@/api/system/User'
    import md5 from 'js-md5'
    import {reactive, ref} from "@vue/reactivity";
    import {onMounted} from "@vue/runtime-core";
    import { ElMessage } from 'element-plus'
    import { useRouter } from "vue-router";

    onMounted(() => {
        getCaptcha()
    })

    /* ref 和 reactive 的区别
     * reactive用于定于复杂对象 ref一般用于定义简单变量
     * 使用reactive不可以直接将整个对象赋值为另一个对象, 会导致reactive属性失效
     * 使用ref赋值使需要加上 .value 后赋值
     */
    const loginForm = reactive({
        userAcc: '',
        userPwd: '',
        key: '',
        captcha: '',
    })

    let captcha = ref( {
            key: '',
            code: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        })

    const loginRules = {
        userAcc: [{
            required: true,
            message: '请输入登录账号',
            trigger: ['blur', 'change']
        }],
        userPwd: [{
            required: true,
            message: '请输入登录密码',
            trigger: ['blur', 'change']
        }],
    }

    const router = useRouter()

    const toLogin = () => {
        let md5Login = Object.assign({}, loginForm)
        md5Login.userPwd = md5(md5Login.userPwd)
        loginApi(md5Login).then(res => {
            ElMessage({
                message: res.msg,
                type: 'success'
            })
            router.push({
                name: 'index',
                path: '/index'
            })
        }).catch(err => {
            getCaptcha()
        })
    }

    const getCaptcha = () => {
        captchaApi().then(res => {
            captcha.value = Object.assign({}, res)
            loginForm.key = res.key
        })
    }

</script>

<style scoped>
    .main {
        display: flex;
        align-items: center;
        position: relative;
        margin: 0 auto;
        width: 100%;
        height: 100%;
        background-size: 100%;
        background-image: url("@/assets/bg.jpg");
    }

    @keyframes animated-border {
        0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
        }
        100% {
            box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
        }
    }

    .login-box {
        width: 70%;
        height: 500px;
        margin: 0 auto;
        background-color: #ffffff;
        animation: animated-border 1.5s infinite;
        color: white;
        border-radius: 10px;
        display: flex;
    }

    .login-box-left {
        width: 50%;
        background-color: #D1E5F0;
        background-image: url("@/assets/login.png");
        background-repeat: no-repeat;
        padding: 0;
        border-radius: 10px;
        background-size: 100%;
    }

    .login-box-right {
        width: 50%;
        color: black;
    }

    .right-content {
        padding: 5% 20%;
    }

    .login-box-title {
        font-size: 26px;
        letter-spacing: 4px;
        font-family: Song;
        width: 80%;
        margin: 40px auto;
        text-align: center;
    }

    .login-button {
        width: 100%;
    }

    .login-captcha {
        margin-top: 2px;
        width: 100px;
        height: 34px;
        background-color: #fdfdfd;
        border: 1px solid #f0f0f0;
        color: #333;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 5px;
        line-height: 38px;
        text-indent: 5px;
        text-align: center;
        cursor:pointer!important;
    }

</style>