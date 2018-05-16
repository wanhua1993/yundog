<template>
    <div class="aui-tab" id="tab">
        <div class="aui-tab-item aui-active">Item1</div>
        <div class="aui-tab-item">Item2</div>
        <div class="aui-tab-item">Item3</div>
        <div class="aui-tab-item">Item4</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tab: {}
            };
        },
        mounted() {
            this.tab = new auiTab({
                element: document.getElementById("tab"),
                index: 1,
                repeatClick: false
            }, function(ret) {
                console.log(ret);
            });
        },
        methods: {

        }
    };
</script>
<style scoped>

</style>
