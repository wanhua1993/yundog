<template>
    <div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-media-list">
            <li class="aui-list-item">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media">
                        <img :src="user.avatar">
                    </div>
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-text">
                            <div class="aui-list-item-title">{{user.name}}</div>
                            <div class="aui-list-item-right"></div>
                        </div>
                        <div class="aui-list-item-text">
                            {{user.note}}
                        </div>
                    </div>
                </div>
                <div class="aui-info" style="padding-top:0">
                    <div class="aui-info-item">
                        <img :src="user.avatar" style="width:1rem" class="aui-img-round" /><span class="aui-margin-l-5">{{user.name}}</span>
                    </div>
                    <div class="aui-info-item">{{user.time}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                user: {
                    name: '流浪者',
                    avatar: require('@/assets/timg.jpg'),
                    note: '一个爱吃番茄的西红柿一枚！',
                    time: '2018-05-21 10:31'
                }
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
