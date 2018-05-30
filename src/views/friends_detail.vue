<template>
    <div class="detail_content">
        <div class="back_img">
            <img :src="back_img" alt="">
            <div class="back_avatar">
                <img :src="user.avatar" alt="">
                <p>{{user.username}}</p>
            </div>
        </div>
        <div class="aui-btn aui-btn-info aui-btn-block wh_confirm aui-btn-outlined aui-btn-sm" @click='add_friend(user._id)'>{{mess}}</div>
    </div>
</template>
<script>
    import url from "../server/index";
    import mUtils from "@/utils/utils";
    export default {
        data() {
            return {
                back_img: require("@/assets/l1.png"),
                user: {},
                mess: "加他好友",
                mess_status: 0
            };
        },
        mounted() {
            this.user = this.$route.query;
            this.check_friends();
        },
        methods: {
            // 查看该好友是否是已经添加过的好友
            check_friends() {
                var data = {
                    id: this.user._id
                };
                url.check_friends(data).then(data => {
                    var res = data.data.value;
                    if (res.length) {
                        this.mess = "发消息";
                        this.mess_status = 1;
                    }
                });
            },
            // 加他好友 .... 发消息
            add_friend(id) {
                if (this.mess_status) {
                    // 发消息
                   this.$router.push('/chat_room');
                } else {
                    // 加他好友
                    var data = {
                        fri_id: id,
                        my_id: mUtils.getStore("user")._id
                    };
                    url.add_friend(data).then(function(data) {
                        console.log(data);
                    });
                }
            }
        }
    };
</script>
<style scoped>
    .back_img {
        position: relative;
    }
    .back_avatar {
        position: absolute;
        width: 3rem;
        height: 3rem;
        bottom: -1.5rem;
        left: 50%;
        margin-left: -1.5rem;
    }
    .back_avatar img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }
    .back_avatar p {
        margin-top: 0.4rem;
    }
    .wh_confirm {
        position: absolute;
        bottom: 3rem;
    }
</style>
