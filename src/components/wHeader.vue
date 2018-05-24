<template>
    <div class='wh_tab'>
        <div class="aui-tab" id="tab" v-if='tab_status==0'>
            <div v-for='(item, index) in tab_list' class='aui-tab-item' :class='[item.active]' @click='change_tab(index)' :key='index'>{{item.val}}</div>
        </div>
        <header class="aui-bar aui-bar-nav" v-if='tab_status==1'>
            <a class="aui-pull-left aui-btn aui-btn-outlined">
                <span class="aui-iconfont aui-icon-menu"></span>
            </a>
            <div class="aui-title">最近联系人</div>
            <a class="aui-pull-right aui-btn aui-btn-outlined wh_search_friends" @click='search_friends()'>
                <span class="aui-iconfont aui-icon-search"></span>
            </a>
        </header>
        <header class="aui-bar aui-bar-nav" v-if='tab_status==5'>
            <a class="aui-pull-left aui-btn" @click='back()'>
                <span class="aui-iconfont aui-icon-left"></span>返回
            </a>
            <div class="aui-title">聊天内容</div>
        </header>
        <header class="aui-bar aui-bar-nav aui-bar-light" v-if='tab_status == 3'>
            个人中心
        </header>
        <header class="aui-bar aui-bar-nav" v-if='tab_status == 4'>
            用户登录
        </header>
        <header class="aui-bar aui-bar-nav" v-if='tab_status == 6'>
            好友添加
        </header>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tab_list: [{
                        val: '最新',
                        active: 'aui-active',
                        path: '/new'
                    },
                    {
                        val: '推荐',
                        active: '',
                        path: '/recommend'
                    },
                    {
                        val: '分享',
                        active: '',
                        path: '/share'
                    },
                    {
                        val: '社区',
                        active: '',
                        path: '/community'
                    }
                ],
                tab_status: 0
            };
        },
        mounted() {
        },
        methods: {
            change_tab(index) {
                for (var i = 0; i < this.tab_list.length; i++) {
                    this.tab_list[i].active = '';
                    this.tab_list[index].active = 'aui-active';
                }
                this.$router.push(this.tab_list[index].path);
            },
            // 点击返回
            back() {
                this.$router.push('/friends');
            },
            // 跳转到 搜索好友页面
            search_friends() {
                this.$router.push('/search_friends');
            }
        },
        watch: {
            $route: function(to, from) {
                if (to.path == '/friends') {
                    this.tab_status = 1;
                }
                else if (to.path == '/index' || to.path == '/new' || to.path == '/community' || to.path == '/share' || to.path == '/recommend') {
                    this.tab_status = 0;
                }
                else if(to.path == '/chat_room') {
                    this.tab_status = 5;
                }
                else if(to.path == '/my') {
                    this.tab_status = 3;
                }
                else if(to.path == '/login') {
                    this.tab_status = 4;
                }
                else if(to.path == '/search_friends') {
                    this.tab_status = 6;
                }
                else {
                    this.tab_status = -1;
                }
            }
        }
    };
</script>
<style>
    .wh_tab {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2.2rem;
        z-index: 10;
    }
</style>

