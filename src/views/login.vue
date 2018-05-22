<template>
    <section class='wh_login'>
        <ul class="aui-list aui-form-list wh_ul">
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label-icon">
                        <i class="aui-iconfont aui-icon-mobile"></i>
                    </div>
                    <div class="aui-list-item-input">
                        <input type="text" placeholder="username" v-model="username">
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label-icon">
                        <i class="aui-iconfont aui-icon-lock"></i>
                    </div>
                    <div class="aui-list-item-input">
                        <input type="password" placeholder="password" v-model='password'>
                    </div>
                    <div class="aui-list-item-label-icon">
                        <i class="aui-iconfont aui-icon-display"></i>
                    </div>
                </div>
            </li>
        </ul>
        <p class="wh_res"><a href="##">我要注册</a></p>
        <div class="aui-btn aui-btn-info aui-btn-block wh_confirm" @click='login_in'>确认登录</div>
    </section>
</template>
<script>
import mUtils from '@/utils/utils'
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    mounted() {
        
    },
    methods: {
        // 确认登录
        login_in() {
            if(this.username && this.password) {
                mUtils.setStore('username', this.username);
                this.$router.push('/my');
            } else {
                alert('请输入正确的用户名密码！');
            }
        }
    }
};
</script>
<style scoped>
.wh_login {
    padding: 0.5rem;
}
.wh_ul li {
    margin-top: 0.5rem;
    background: #ddd;
    border-radius: 4px;
}
.wh_confirm {
    margin-top: 2rem;
}
.wh_res {
    margin-top: 0.5rem;
    text-align: right;
}
</style>
