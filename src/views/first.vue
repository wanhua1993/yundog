<template>
    <section class='aui-content'>
     <div class="aui-card-list" v-for='(item, index) in data_list' :key='index'>
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
            <img :src="item.img" />
        </div>
        <div class="aui-card-list-footer aui-border-t">
            <div><i class="aui-iconfont aui-icon-note"></i> 666</div>
            <div><i class="aui-iconfont aui-icon-laud"></i> 888</div>
            <div><i class="aui-iconfont aui-icon-star"></i> 888</div>
        </div>
    </div>
    </section>
</template>
<script>
export default {
    components: {
      
    },
    data() {
        return {
            data_list: [
                {
                    img: require('@/assets/l1.png')
                },
                {
                    img: require('@/assets/l2.png')
                },
                {
                    img: require('@/assets/l3.png')
                }
            ]
        }
    },
    created() {
        localStorage.tab_status = 0;
    }
}
</script>
<style scoped>

</style>
