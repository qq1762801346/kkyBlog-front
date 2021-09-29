<template>
    <div class="main">
        <div class="login-box">
            <div class="login-box-left">

            </div>
            <div class="login-box-right">
                <a-button type="primary" @click="getDetail">验证</a-button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {detail} from '@/api/demo/Student'

    const getDetail = () => {
        detail().then(res => {
            console.log(res)
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
        background-size:100%;
    }

    .login-box-right {
        width: 50%;
    }


</style>