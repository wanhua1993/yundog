<template>
    <div class="wh_content_fri">
        <div class="aui-searchbar" id="search">
            <div class="aui-searchbar-input aui-border-radius" tapmode>
                <i class="aui-iconfont aui-icon-search"></i>
                <form action="javascript:search();">
                    <input type="search" placeholder="用户名/ID号" id="search-input" v-model='user_val'>
                </form>
            </div>
            <div class="aui-searchbar-cancel" tapmod @click='cancel()'>取消</div>
        </div>
        <div class="aui-info aui-margin-t-10 aui-padded-l-10 aui-padded-r-10 wh-mes" 
        v-for='(item, index) in data_list' 
        :key='index'
        @click='friends_detail(item)'>
            <div class="aui-info-item">
                <img :src="item.avatar" style="width:1.5rem; height: 1.5rem;" class="aui-img-round" /><span class="aui-margin-l-5">{{item.username}}</span>
            </div>
            <div class="aui-info-item">{{item.sex ? item.sex : '女'}}</div>
        </div>
    </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
    import url from '../server/index'
    import baseURL from '@/server/url'
    export default {
        data() {
            return {
                user_val: '',
                data_list: []
            }
        },
        mounted() {},
        methods: {
            search_data(val) {
                if(val) {
                    var that = this;
                url.search_friends(val).then(function(data) {
                    that.data_list = data.data.value;
                    for (var i = 0; i < that.data_list.length; i++) {
                        var avatar = that.data_list[i].avatar;
                        if (avatar) {
                            that.data_list[i].avatar = baseURL + avatar;
                        } else {
                            that.data_list[i].avatar = require('@/assets/timg.jpg');
                        }
                    }
                });
                }
            },
            // 點擊跳轉到好友 詳情頁面
            friends_detail(user) {
                this.$router.push({
                    path: '/friends_detail',
                    query: user
                });
            },
            // 点击取消
            cancel() {
                this.user_val = '';
            }
        },
        watch: {
            user_val: function(to, from) {
                this.search_data(to);
            }
        }
    }
</script>
<style scoped>
    .wh_content_fri {
        margin-top: 2.2rem;
    }
    .aui-searchbar-cancel {
        margin-right: 10px;
    }
    .wh-mes {
        border-bottom: 1px solid #ddd;
    }
</style>
