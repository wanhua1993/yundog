<template>
    <div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-list-in" id="detail_list">
            <li class="aui-list-header">
                账号信息
            </li>
            <li class="aui-list-item avatar_li">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-title">UID</div>
                    <div class="aui-list-item-right">{{user._id}}</div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-title">用户名</div>
                    <div class="aui-list-item-right">{{user.username}}</div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-title">注册时间</div>
                    <div class="aui-list-item-right">{{user.createT}}</div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-title">手机号码</div>
                    <div class="aui-list-item-right"></div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-title">e-mail</div>
                    <div class="aui-list-item-right"></div>
                </div>
            </li>
            <li class="aui-list-item avatar_li">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-title">头像</div>
                    <div class="aui-list-item-right wh_avatar_box">
                        <img :src="user.avatar ? user.avatar : avatar" alt="" class="wh_avatar">
                        <input type="file" class="wh_uploadAvatar" @change='upload_photo()' id="file">
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-title">性别</div>
                    <div class="aui-list-item-right"></div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-title">昵称</div>
                    <div class="aui-list-item-right">{{user.username}}</div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-title">个性签名</div>
                </div>
            </li>
        </ul>
        <div class="aui-btn aui-btn-info aui-btn-block wh_confirm" @click='save_data()'>保存修改</div>
    </div>
</template>
<script>

    import mUtils from '@/utils/utils'
    import baseURL from '@/server/url'
    export default {
        data() {
            return {
                user: {},
                avatar: require('@/assets/timg.jpg')
            }
        },
        mounted() {
            this.user = mUtils.getStore('user');
            this.user.createT = mUtils.formatDate(new Date(this.user.createT));
            if(this.user.avatar) {
                this.user.avatar = baseURL + this.user.avatar;
            } 
        },
        methods: {
            // 保存修改
            save_data() {
                console.log(111);
            },
            // 上传头像
            async upload_photo() {
                var file = document.getElementById('file').files[0];
                var formData = new FormData();
                formData.append('file', file);
                formData.append('id', this.user._id);
                var res = await this.$store.dispatch('upload_file', formData);
                console.log(res);
                this.avatar = baseURL + res.data.value;
            }
        }
    }
</script>
<style scoped>
    .aui-content {
        /* margin-top: 2.2rem; */
    }
    .wh_confirm {
        margin-top: 1rem;
        height: 2rem;
        line-height: 2rem;
    }
    .aui-content, #detail_list {
        background: rgb(235, 234, 234);
    }
    #detail_list .aui-list-item {
        background: #fff;
        border-bottom: 1px solid rgb(204, 203, 203);
        padding: 0 .5rem;
    }
    .avatar_li {
        margin-top: .6rem;
    }
    .wh_avatar {
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 4px;
        border: 1px solid #ddd;
        margin: 2px;
    }
    .wh_avatar_box {
        position: relative;
    }
    .wh_uploadAvatar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 1000;
    }
</style>
