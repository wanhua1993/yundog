<template>
        <footer class="aui-bar aui-bar-tab" id="footer" v-if='wh_footer == 1'>
            <div v-for='(item, index) in tab_list' class="aui-bar-tab-item" :key='index' :class='[item.active]' tapmode @click='change_tab(index)'>
                <i class="aui-iconfont" :class='item.icon'></i>
                <div class="aui-bar-tab-label">{{item.val}}</div>
            </div>
        </footer>
</template>
<script>
    import mUtils from "../utils/utils";
    export default {
        data() {
            return {
                wh_footer: 1,
                tab_list: [{
                        val: "首页",
                        icon: "aui-icon-home",
                        active: "aui-active",
                        path: "/index"
                    },
                    {
                        val: "好友",
                        icon: "aui-icon-star",
                        active: "",
                        path: "/friends"
                    },
                    {
                        val: "发表",
                        icon: "aui-icon-pencil",
                        active: "",
                        path: "/goods_car"
                    },
                    {
                        val: "我的",
                        icon: "aui-icon-my",
                        active: "",
                        path: "/my"
                    }
                ]
            };
        },
        mounted() {},
        methods: {
            change_tab(index) {
                for (var i = 0; i < this.tab_list.length; i++) {
                    this.tab_list[i].active = "";
                    this.tab_list[index].active = "aui-active";
                }
                this.$router.push(this.tab_list[index].path);
            }
        },
        watch: {
            $route: function(to, from) {
                for (var i = 0; i < this.tab_list.length; i++) {
                    this.tab_list[i].active = "";
                    if (to.path == this.tab_list[i].path)
                        this.tab_list[i].active = "aui-active";
                }
                //
                if (to.path == "/chat_room") {
                    // 说明是聊天区域
                    this.wh_footer = 2;
                } else {
                    this.wh_footer = 1;
                }
            }
        }
    };
</script>
<style scoped>

</style>
