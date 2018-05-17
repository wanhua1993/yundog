<template>
    <div class='wh_tab'>
        <div class="aui-tab" id="tab">
            <div v-for='(item, index) in tab_list' class='aui-tab-item' :class='[item.active]' @click='change_tab(index)' :key='index'>{{item.val}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tab_list: [{
                        val: '最新',
                        active: 'aui-active'
                    },
                    {
                        val: '推荐',
                        active: ''
                    },
                    {
                        val: '分享',
                        active: ''
                    },
                    {
                        val: '社区',
                        active: ''
                    }
                ],
            };
        },
        mounted() {},
        methods: {
            change_tab(index) {
                for (var i = 0; i < this.tab_list.length; i++) {
                    this.tab_list[i].active = '';
                    this.tab_list[index].active = 'aui-active';
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

