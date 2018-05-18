<template>
    <section class='aui-content'>
        <w-header></w-header>
        <router-view class='wh_content'></router-view> 
        <w-footer></w-footer>
    </section>
</template>
<script>
import wHeader from '@/components/wHeader.vue'
import wFooter from '@/components/wFooter.vue'
export default {
    components: {
        wHeader,
        wFooter
    },
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.wh_content {
    margin-top: 2.2rem;
    margin-bottom: 2.3rem;
}
</style>
