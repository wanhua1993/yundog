<template>
    <footer class="aui-bar aui-bar-tab" id="footer">
        <div v-for='(item, index) in tab_list' class="aui-bar-tab-item" :class='[item.active]' tapmode @click='change_tab(index)'>
            <i class="aui-iconfont" :class='item.icon'></i>
            <div class="aui-bar-tab-label">{{item.val}}</div>
        </div>
    </footer>
</template>
<script>
    export default {
        data() {
            return {
                tab_list: [
                    {
                        val: '首页',
                        icon: 'aui-icon-home',
                        active: 'aui-active'
                    },
                    {
                        val: '收藏',
                        icon: 'aui-icon-star',
                        active: ''
                    },
                    {
                        val: '购物车',
                        icon: 'aui-icon-cart',
                        active: ''
                    },
                    {
                        val: '我的',
                        icon: 'aui-icon-my',
                        active: ''
                    }
                ]
            };
        },
        mounted() {
            
        },
        methods: {
            change_tab(index) {
                for(var i = 0; i < this.tab_list.length; i ++) {
                    this.tab_list[i].active = '';
                    this.tab_list[index].active = 'aui-active';
                }
            }
        }
    };
</script>
<style scoped>

</style>
