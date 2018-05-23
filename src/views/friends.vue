<template>
    <section class="wh_section">
        <div class="aui-info aui-margin-t-10 aui-padded-l-10 aui-padded-r-10 wh-mes" 
        v-for='(item, index) in data_list' 
        @click='chat_room()'
        :key='index'>
            <div class="aui-info-item">
                <img :src="item.img" style="width:1.5rem" class="aui-img-round" /><span class="aui-margin-l-5">{{item.val}}</span>
            </div>
            <div class="aui-info-item">{{item.time}}</div>
        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                data_list: [
                    {
                        img: require('@/assets/demo2.png'),
                        val: '你好AUI！',
                        time: '2015-07-13 22:31'
                    },
                    {
                        img: require('@/assets/demo3.png'),
                        val: '你好AUI！',
                        time: '2015-07-13 22:31'
                    },
                    {
                        img: require('@/assets/demo4.png'),
                        val: '你好AUI！',
                        time: '2015-07-13 22:31'
                    },
                    {
                        img: require('@/assets/demo5.png'),
                        val: '你好AUI！',
                        time: '2015-07-13 22:31'
                    },
                    {
                        img: require('@/assets/demo1.png'),
                        val: '你好AUI！',
                        time: '2015-07-13 22:31'
                    },
                    {
                        img: require('@/assets/demo2.png'),
                        val: '你好AUI！',
                        time: '2015-07-13 22:31'
                    },
                    {
                        img: require('@/assets/demo3.png'),
                        val: '你好AUI！',
                        time: '2015-07-13 22:31'
                    },
                    {
                        img: require('@/assets/demo4.png'),
                        val: '你好AUI！',
                        time: '2015-07-13 22:31'
                    },
                    {
                        img: require('@/assets/demo5.png'),
                        val: '你好AUI！',
                        time: '2015-07-13 22:31'
                    },
                    {
                        img: require('@/assets/demo1.png'),
                        val: '你好AUI！',
                        time: '2015-07-13 22:31'
                    },
                ]
            };
        },
        mounted() {

        },
        methods: {
            // 跳轉到聊天页面
            chat_room() {
                this.$router.push('/chat_room');
            }
        }
    };
</script>
<style scoped>
.wh-mes {
    border-bottom: 1px solid #ddd;
}
.wh_section {
    margin-top: 2.2rem;
}
</style>


