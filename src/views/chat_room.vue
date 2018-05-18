<template>
    <section class="aui-chat">
        <div class="aui-chat-header">2016年7月13日</div>
        <div class="aui-chat-item" v-for='(item, index) in data_list' :key='index' :class='[item.location]' style="margin-bottom: 2.75rem;">
            <div class="aui-chat-media">
                <img :src="item.avatar" />
            </div>
            <div class="aui-chat-inner">
                <div class="aui-chat-name">{{item.name}} <span class="aui-label aui-label-warning">2.0</span></div>
                <div class="aui-chat-content" v-if='item.type==1'>
                    <div class="aui-chat-arrow"></div>
                    {{item.val}}
                </div>
                 <div class="aui-chat-content" v-if='item.type==2'>
                    <div class="aui-chat-arrow"></div>
                    <img :src="item.val" alt="">
                </div>
                <div class="aui-chat-status aui-chat-status-refresh">
                    <i class="aui-iconfont aui-icon-correct aui-text-success"></i>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                data_list: [
                    {
                        avatar: require('@/assets/demo2.png'), // 头像
                        name: '流浪者', // 名字
                        location: 'aui-chat-left',
                        type: 1, // 1 表示文字内容 2 表示图片内容 3 表示表情内容
                        val: '以前拍摄的牛背山星空！' // 内容 信息
                    },
                    {
                        avatar: require('@/assets/demo3.png'), // 头像
                        name: '诗人', // 名字
                        location: 'aui-chat-right',
                        type: 2, // 1 表示文字内容 2 表示图片内容 3 表示表情内容
                        val: require('@/assets/l1.png') // 内容 信息
                    },
                    {
                        avatar: require('@/assets/demo2.png'), // 头像
                        name: '流浪者', // 名字
                        location: 'aui-chat-left',
                        type: 1, // 1 表示文字内容 2 表示图片内容 3 表示表情内容
                        val: '以前拍摄的牛背山星空！' // 内容 信息
                    },
                    {
                        avatar: require('@/assets/demo3.png'), // 头像
                        name: '诗人', // 名字
                        location: 'aui-chat-right',
                        type: 1, // 1 表示文字内容 2 表示图片内容 3 表示表情内容
                        val: '以前拍摄的牛背山星空！' // 内容 信息
                    },
                    {
                        avatar: require('@/assets/demo2.png'), // 头像
                        name: '流浪者', // 名字
                        location: 'aui-chat-left',
                        type: 2, // 1 表示文字内容 2 表示图片内容 3 表示表情内容
                        val: require('@/assets/l2.png') // 内容 信息
                    },
                    {
                        avatar: require('@/assets/demo3.png'), // 头像
                        name: '诗人', // 名字
                        location: 'aui-chat-right',
                        type: 1, // 1 表示文字内容 2 表示图片内容 3 表示表情内容
                        val: '以前拍摄的牛背山星空！' // 内容 信息
                    }
                ]
            }
        },
        mounted() {

        },
        methods: {

        }
    }
</script>
<style scoped>

</style>

