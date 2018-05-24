<template>
    <!-- 对社区进行爬虫处理 -->
    <div class="content aui-content wh_load_content" id="wh_load_content">
        <div class="aui-card-list" v-for='(item, index) in data_list' :key='index' v-show='show_list'>
            <div class="aui-card-list-header aui-card-list-user aui-border-b">
                <div class="aui-card-list-user-avatar">
                    <!-- <img src="../../image/demo4.png" class="aui-img-round" /> -->
                </div>
                <div class="aui-card-list-user-name">
                    <div>AUI</div>
                    <small>1天前</small>
                </div>
                <div class="aui-card-list-user-info">北京朝阳</div>
            </div>
            <div class="aui-card-list-content-padded">
                <img :src="item.image_path" />
            </div>
            <p>{{item.aTitle}}</p>
            <div class="aui-card-list-footer aui-border-t">
                <div><i class="aui-iconfont aui-icon-note"></i> 0</div>
                <div><i class="aui-iconfont aui-icon-laud"></i> 0</div>
                <div><i class="aui-iconfont aui-icon-star"></i> 0</div>
            </div>
        </div>
        <div class="aui-card-list-footer aui-text-center" v-show='look_more' @click='load_more_data()'>
            查看更多
        </div>
        <div class="load_gif" v-show='load_now'>
            <img :src="load_git" alt="">
        </div>
    </div>
</template>
<script>
    import url from "../server/index";
    export default {
        data() {
            return {
                data_list: [],
                look_more: false,
                show_list: false,
                load_now: true,
                count: 1,
                load_git: require("@/assets/load.gif")
            };
        },
        mounted() {
            this.load_data();
        },
        methods: {
            // load 狗狗社区
            async load_data() {
                var that = this;
                setTimeout(function() {
                    that.load_now = false;
                    url.cheerio_data(that.count).then(function(res) {
                        that.data_list = res.data.value;
                        that.look_more = true;
                        that.show_list = true;
                    });
                }, 1000);
            },
            // 加载更多 爬虫数据
            load_more_data() {
                this.look_more = false;
                var that = this;
                this.count++;
                that.load_now = true;
                var load_srcoll = document.getElementById('wh_load_content');
                load_srcoll.scrollTop = load_srcoll.scrollHeight + 100;
                setTimeout(function() {
                    that.load_now = false;
                    url.cheerio_data(that.count).then(function(res) {
                        that.data_list = that.data_list.concat(res.data.value);
                        that.look_more = true;
                        that.show_list = true;
                    });
                }, 1000)
            }
        }
    };
</script>
<style scoped>
    .content {
        margin-top: 2.2rem;
    }
    .load_gif {
        margin-bottom: 3rem;
    }
</style>
