<template>
    <div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-media-list">
            <li class="aui-list-item">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media">
                        <img :src="user.avatar">
                    </div>
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-text">
                            <div class="aui-list-item-title">{{user.name}}</div>
                            <div class="aui-list-item-right" @click='my_detail()'>
                                <i class="aui-iconfont aui-icon-right                                                                                                             "></i>
                            </div>
                        </div>
                        <div class="aui-list-item-text">
                            {{user.note}}
                        </div>
                    </div>
                </div>
                <div class="aui-info" style="padding-top:0">
                    <div class="aui-info-item">
                        <img :src="user.avatar" style="width:1rem" class="aui-img-round" /><span class="aui-margin-l-5">{{user.name}}</span>
                    </div>
                    <div class="aui-info-item">{{user.time}}</div>
                </div>
            </li>
        </ul>
        <ul class="aui-list aui-list-in">
            <li class="aui-list-item">
                <div class="aui-list-item-label-icon">
                    <i class="aui-iconfont aui-icon-home"></i>
                </div>
                <div class="aui-list-item-inner">
                    我的主页
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-label-icon">
                    <i class="aui-iconfont aui-icon-like"></i>
                </div>
                <div class="aui-list-item-inner">
                    我赞过的
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-label-icon">
                    <i class="aui-iconfont aui-icon-comment"></i>
                </div>
                <div class="aui-list-item-inner">
                    我评论的
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-label-icon">
                    <i class="aui-iconfont aui-icon-star"></i>
                </div>
                <div class="aui-list-item-inner">
                    我的收藏
                </div>
            </li>
        </ul>
        <div class="aui-btn aui-btn-danger aui-btn-block wh_confirm" @click='login_out'>退出登录</div>
    </div>
</template>
<script>
    import mUtils from "@/utils/utils";
    export default {
        data() {
            return {
                user: {
                    name: "流浪者",
                    avatar: require("@/assets/timg.jpg"),
                    note: "一个爱吃番茄的西红柿一枚！",
                    time: "2018-05-21 10:31"
                }
            };
        },
        mounted() {
            this.user.name = mUtils.getStore("user").username;
        },
        methods: {
            // 退出登录
            login_out() {
                mUtils.setStore("user", "");
                this.$router.push("/");
            },
            // 跳转到我的信息页面
            my_detail() {
                console.log(11111);
                this.$router.push('/my_detail');
            }
        }
    };
</script>
<style scoped>
    .aui-content {
        margin-top: 2.2rem;
    }
    .wh_confirm {
        margin-top: 2rem;
    }
    .aui-list-item {
        margin-top: 0.2rem;
        background: #fff;
    }
    .aui-list {
        background: rgb(238, 237, 237);
    }
    .aui-list-in {
        margin-top: 1rem;
    }
</style>
