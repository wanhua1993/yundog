<template>
    <div>
        <header class="aui-bar aui-bar-nav" v-show='header_0'>
            <a class="aui-pull-left aui-btn aui-btn-outlined" @click='wh_fri_list'>
                <div class="aui-badge" v-if='req_fri_num != 0'>{{req_fri_num}}</div>
                <span class="aui-iconfont aui-icon-menu"></span>
            </a>
            <div class="aui-title">好友列表</div>
            <a class="aui-pull-right aui-btn aui-btn-outlined wh_search_friends" @click='search_friends()'>
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
            <div class="aui-info aui-margin-t-10 aui-padded-l-10 aui-padded-r-10 wh-mes" v-for='(item, index) in data_list' @click='chat_room(item)' :key='index'>
                <div class="aui-info-item">
                    <img :src="item.fri_id.avatar" style="width:1.5rem;height: 1.5rem;" class="aui-img-round" />
                    <span class="aui-margin-l-5">{{item.fri_id.username}}</span>
                </div>
                <div class="aui-info-item">111</div>
            </div>
        </section>
        <section class="wh_section_1" v-show='wh_section_1'>
            <div class="aui-info aui-margin-t-10 aui-padded-l-10 aui-padded-r-10 wh-mes" v-for='(item, index) in req_fri' :key='index'>
                <div class="aui-info-item">
                    <img :src="avatar" style="width:1.5rem" class="aui-img-round" />
                    <span class="aui-margin-l-5">{{item.my_id.username}} 请求添加好友</span>
                </div>
                <div class="aui-info-item aui-btn aui-btn-success" v-if='item.status==0' @click='agree(item.my_id._id, item._id)'>同意</div>
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
                data_list: [],
                user: {},
                req_fri_num: 0,
                req_fri: [],
                fri_show: false,
                baseURL: '',
                wh_section: true,
                wh_section_1: false,
                header_0: true,
                header_1: false,
                avatar: require('@/assets/timg.jpg')
            };
        },
        mounted() {
            this.baseURL = baseURL;
            this.user = mUtils.getStore('user');
            this.load_friends_req();
            this.load_friends();
        },
        methods: {
            // 跳轉到聊天页面
            chat_room(item) {
                this.$router.push({
                    path: "/chat_room",
                    query: {
                        id: item.fri_id._id,
                    }
                });
            },
            // 加载好友请求
            load_friends_req() {
                var that = this;
                url.load_friends_req(this.user._id).then(data => {
                    // that.req_fri_num = data.data.value.length;
                    that.req_fri = data.data.value;
                    for (var i = 0; i < that.req_fri.length; i++) {
                        if (that.req_fri[i].avatar) {
                            that.req_fri[i].avatar = baseURL + that.req_fri[i].avatar;
                        } else {
                            that.req_fri[i].avatar = this.avatar;
                        }
                        if (that.req_fri[i].status == 0) {
                            that.req_fri_num++
                        }
                    }
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
            // 点击同意以后 需要再建立一个 好友对应关系 并且使两条数据中的status 都为1
            agree(my_id, id) {
                var val = {
                    fri_id: this.user._id,
                    my_id: my_id,
                    id: id
                }
                url.agree_friends(val).then(data => {
                    if (data.status == 200) {}
                });
            },
            // 跳转到 搜索好友页面
            search_friends() {
                this.$router.push('/search_friends');
            },
            // 加载好友列表
            load_friends() {
                url.load_friends().then(data => {
                    if (data.status == 200) {
                        this.data_list = data.data.value;
                        for (var i = 0; i < this.data_list.length; i++) {
                            var avatar = this.data_list[i].fri_id.avatar;
                            if (avatar) {
                                this.data_list[i].fri_id.avatar = baseURL + avatar;
                            } else {
                                this.data_list[i].fri_id.avatar = require('@/assets/timg.jpg');
                            }
                        }
                    }
                })
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


