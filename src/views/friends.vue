<template>
    <div>
        <header class="aui-bar aui-bar-nav" v-show='header_0'>
            <a class="aui-pull-left aui-btn aui-btn-outlined" @click='wh_fri_list'>
                <div class="aui-badge">{{req_fri_num}}</div>
                <span class="aui-iconfont aui-icon-menu"></span>
            </a>
            <div class="aui-title">最近联系人</div>
            <a class="aui-pull-right aui-btn aui-btn-outlined wh_search_friends">
                <span class="aui-iconfont aui-icon-search"></span>
            </a>
        </header>
        <header class="aui-bar aui-bar-nav" v-show='header_1'>
            <a class="aui-pull-left aui-btn" @click='back()'>
                <span class="aui-iconfont aui-icon-left"></span>返回
            </a>
            <div class="aui-title">好友添加</div>
        </header>
        <section class="wh_section" v-show='wh_section'>
            <div class="aui-info aui-margin-t-10 aui-padded-l-10 aui-padded-r-10 wh-mes" v-for='(item, index) in data_list' @click='chat_room()' :key='index'>
                <div class="aui-info-item">
                    <img :src="item.img" style="width:1.5rem" class="aui-img-round" />
                    <span class="aui-margin-l-5">{{item.val}}</span>
                </div>
                <div class="aui-info-item">{{item.time}}</div>
            </div>
        </section>
        <section class="wh_section_1" v-show='wh_section_1'>
            <div class="aui-info aui-margin-t-10 aui-padded-l-10 aui-padded-r-10 wh-mes" v-for='(item, index) in req_fri' :key='index'>
                <div class="aui-info-item">
                    <img :src="baseURL + item.my_id.avatar" style="width:1.5rem" class="aui-img-round" />
                    <span class="aui-margin-l-5">{{item.my_id.username}} 请求添加好友</span>
                </div>
                <div class="aui-info-item aui-btn aui-btn-success" v-if='item.status==0' @click='agree()'>同意</div>
                <div class="aui-info-item" v-else>已同意</div>
            </div>
        </section>
    </div>
</template>
<script>
    import url from '../server/index'
    import mUtils from '@/utils/utils'
    import baseURL from '@/server/url'
    export default {
        data() {
            return {
                data_list: [{
                        img: require("@/assets/demo2.png"),
                        val: "你好AUI！",
                        time: "2015-07-13 22:31"
                    },
                    {
                        img: require("@/assets/demo3.png"),
                        val: "你好AUI！",
                        time: "2015-07-13 22:31"
                    },
                    {
                        img: require("@/assets/demo4.png"),
                        val: "你好AUI！",
                        time: "2015-07-13 22:31"
                    },
                    {
                        img: require("@/assets/demo5.png"),
                        val: "你好AUI！",
                        time: "2015-07-13 22:31"
                    },
                    {
                        img: require("@/assets/demo1.png"),
                        val: "你好AUI！",
                        time: "2015-07-13 22:31"
                    },
                    {
                        img: require("@/assets/demo2.png"),
                        val: "你好AUI！",
                        time: "2015-07-13 22:31"
                    },
                    {
                        img: require("@/assets/demo3.png"),
                        val: "你好AUI！",
                        time: "2015-07-13 22:31"
                    },
                    {
                        img: require("@/assets/demo4.png"),
                        val: "你好AUI！",
                        time: "2015-07-13 22:31"
                    },
                    {
                        img: require("@/assets/demo5.png"),
                        val: "你好AUI！",
                        time: "2015-07-13 22:31"
                    },
                    {
                        img: require("@/assets/demo1.png"),
                        val: "你好AUI！",
                        time: "2015-07-13 22:31"
                    }
                ],
                user: {},
                req_fri_num: 0,
                req_fri: [],
                fri_show: false,
                baseURL: '',
                wh_section: true,
                wh_section_1: false,
                header_0: true,
                header_1: false
            };
        },
        mounted() {
            this.baseURL = baseURL;
            this.user = mUtils.getStore('user');
            this.load_friends_req();
        },
        methods: {
            // 跳轉到聊天页面
            chat_room() {
                this.$router.push("/chat_room");
            },
            // 加载好友请求
            load_friends_req() {
                var that = this;
                url.load_friends_req(this.user._id).then(data => {
                    console.log(data);
                    that.req_fri_num = data.data.value.length;
                    that.req_fri = data.data.value;
                });
            },
            // 加载好友请求列表
            wh_fri_list() {
                this.wh_section = false;
                this.wh_section_1 = true;
                this.header_0 = false;
                this.header_1 = true;
            },
            back() {
                this.wh_section = true;
                this.wh_section_1 = false;
                this.header_0 = true;
                this.header_1 = false;
            },
            // 同意添加好友
            agree() {
                console.log(1111);
            }
        }
    };
</script>
<style scoped>
    .wh-mes {
        border-bottom: 1px solid #ddd;
    }
    .wh_section,
    .wh_section_1 {
        margin-top: 2.2rem;
    }
    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2.2rem;
        z-index: 10;
    }
    .aui-badge {
        top: -0.3rem;
    }
</style>


