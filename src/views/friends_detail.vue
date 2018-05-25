<template>
    <div class="detail_content">
        <div class="back_img">
            <img :src="back_img" alt="">
            <div class="back_avatar">
                <img :src="user.avatar" alt="">
                <p>{{user.username}}</p>
            </div>
        </div>
        <div class="aui-btn aui-btn-info aui-btn-block wh_confirm aui-btn-outlined aui-btn-sm" @click='add_friend(user._id)'>加他好友</div>
    </div>
</template>
<script>
    import url from '../server/index'
    import mUtils from '@/utils/utils'
    export default {
        data() {
            return {
                back_img: require("@/assets/l1.png"),
                user: {}
            };
        },
        mounted() {
            this.user = this.$route.query;
            console.log(this.user);
        },
        methods: {
            // 加他好友
            add_friend(id) {
                var data = {
                    fri_id: id,
                    my_id: mUtils.getStore('user')._id
                }
                url.add_friend(data).then(function (data){
                    console.log(data);
                });
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
