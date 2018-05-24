<template>
    <div class="aui-searchbar" id="search">
        <div class="aui-searchbar-input aui-border-radius" tapmode>
            <i class="aui-iconfont aui-icon-search"></i>
            <form action="javascript:search();">
                <input type="search" placeholder="用户名/ID号" id="search-input" v-model='user_val'>
            </form>
        </div>
        <div class="aui-searchbar-cancel" tapmod>取消</div>
    </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js">

</script>

<script>
    import url from '../server/index'
    export default {
        data() {
            return {
                user_val: ''
            }
        },
        mounted() {},
        methods: {
            search_data(val) {
                url.search_friends(val).then(function (data){
                    console.log(data);
                });
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
    .aui-searchbar {
        margin-top: 2.2rem;
    }
    .aui-searchbar-cancel {
        margin-right: 10px;
    }
</style>
