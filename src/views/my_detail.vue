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
                    <div class="aui-list-item-right"></div>
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
    export default {
        data() {
            return {
                user: {}
            }
        },
        mounted() {
            this.user = mUtils.getStore('user');
            this.user.createT = mUtils.formatDate(new Date(this.user.createT));
        },
        methods: {
            // 保存修改
            save_data() {
                console.log(111);
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

</style>
