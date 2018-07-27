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
        <footer class="aui-bar aui-bar-tab" id="footer">
            <div class="aui-searchbar-input aui-border-radius wh_input_box" tapmode>
                <i class="iconfont icon-soundlight icon_1"></i>
                <form action="javascript:search();">
                    <input type="search" placeholder="" id="search-input" v-model='text'>
                </form>
                <i class="iconfont icon-emojilight icon_2"></i>
                <i class="iconfont icon-roundaddlight icon_3"></i>
            </div>
        </footer>
    </section>
</template>
<script>
    import "@/assets/rong_chat/init.js";
    import "@/assets/rong_chat/qiniu.js";
    import "@/assets/rong_chat/upload.js";
    import url from "../server/index";
    import mUtils from "@/utils/utils";
    export default {
        data() {
            return {
                data_list: [
                    // {
                    //     avatar: require("@/assets/demo2.png"), // 头像
                    //     name: "流浪者", // 名字
                    //     location: "aui-chat-left",
                    //     type: 1, // 1 表示文字内容 2 表示图片内容 3 表示表情内容
                    //     val: "以前拍摄的牛背山星空！" // 内容 信息
                    // },
                    // {
                    //     avatar: require("@/assets/demo3.png"), // 头像
                    //     name: "诗人", // 名字
                    //     location: "aui-chat-right",
                    //     type: 2, // 1 表示文字内容 2 表示图片内容 3 表示表情内容
                    //     val: require("@/assets/l1.png") // 内容 信息
                    // },
                    // {
                    //     avatar: require("@/assets/demo2.png"), // 头像
                    //     name: "流浪者", // 名字
                    //     location: "aui-chat-left",
                    //     type: 1, // 1 表示文字内容 2 表示图片内容 3 表示表情内容
                    //     val: "以前拍摄的牛背山星空！" // 内容 信息
                    // },
                    // {
                    //     avatar: require("@/assets/demo3.png"), // 头像
                    //     name: "诗人", // 名字
                    //     location: "aui-chat-right",
                    //     type: 1, // 1 表示文字内容 2 表示图片内容 3 表示表情内容
                    //     val: "以前拍摄的牛背山星空！" // 内容 信息
                    // },
                    // {
                    //     avatar: require("@/assets/demo2.png"), // 头像
                    //     name: "流浪者", // 名字
                    //     location: "aui-chat-left",
                    //     type: 2, // 1 表示文字内容 2 表示图片内容 3 表示表情内容
                    //     val: require("@/assets/l2.png") // 内容 信息
                    // },
                    // {
                    //     avatar: require("@/assets/demo3.png"), // 头像
                    //     name: "诗人", // 名字
                    //     location: "aui-chat-right",
                    //     type: 1, // 1 表示文字内容 2 表示图片内容 3 表示表情内容
                    //     val: "以前拍摄的牛背山星空！" // 内容 信息
                    // }
                ],
                token: "",
                appKey: "8brlm7uf8z6o3",
                user: {
                    userId: "111111",
                    name: "wanhua",
                    avatar: ""
                },
                instance: null,
                config: {},
                conversationType: RongIMLib.ConversationType.PRIVATE, // 私聊
                userId: mUtils.getStore("user")._id,
                text: '',
                targetId: ''
            };
        },
        mounted() {
            this.targetId = this.$route.query.id;
            this.get_token(this.userId);
        },
        methods: {
            // 获取 token 值
            get_token(userId) {
                let that = this;
                url.get_token({
                    userId: userId
                }).then(function(data) {
                    that.token = data.data.token;
                    var params = {
                        appKey: that.appKey,
                        token: that.token,
                        imClient: null
                    };
                    var callbacks = {
                        getInstance: function(_instance) {},
                        receiveNewMessage: function(message) {
                            // 判断消息类型
                            console.log(message);
                            let content = message.content.content;
                            that.data_list.push({
                                avatar: require("@/assets/demo3.png"), // 头像
                                name: "诗人", // 名字
                                location: "aui-chat-left",
                                type: 1, // 1 表示文字内容 2 表示图片内容 3 表示表情内容
                                val: content // 内容 信息
                            });
                        },
                        getCurrentUser: function(userInfo) {
                            console.log(userInfo);
                            // showTips("链接成功 用户id：" + userInfo.userId + ", 耗时" + getTimer(begin));
                            // userId = userInfo.userId;
                            // afterConnected();
                        }
                    };
                    that.init(params, callbacks, that.config);
                });
            },
            // init 初始化
            init(params, callbacks, config, modules) {
                var appKey = params.appKey;
                var token = params.token;
                var navi = params.navi || "";
                modules = modules || {};
                var RongIMLib = modules.RongIMLib || window.RongIMLib;
                var RongIMClient = RongIMLib.RongIMClient;
                var protobuf = modules.protobuf || null;
                var config = {};
                //私有云切换navi导航，私有云格式 '120.92.10.214:8888'
                if (navi !== "") {
                    config.navi = navi;
                }
                //私有云切换api,私有云格式 '172.20.210.38:81:8888'
                var api = params.api || "";
                if (api !== "") {
                    config.api = api;
                }
                //support protobuf url + function
                if (protobuf != null) {
                    config.protobuf = protobuf;
                }
                var dataProvider = null;
                var imClient = params.imClient;
                if (imClient) {
                    dataProvider = new RongIMLib.VCDataProvider(imClient);
                }
                RongIMLib.RongIMClient.init(appKey, dataProvider, config);
                this.instance = RongIMClient.getInstance();
                // 连接状态监听器
                RongIMClient.setConnectionStatusListener({
                    onChanged: function(status) {
                        // console.log(status);
                        switch (status) {
                            case RongIMLib.ConnectionStatus["CONNECTED"]:
                            case 0:
                                console.log("连接成功");
                                callbacks.getInstance && callbacks.getInstance(this.instance);
                                break;
                            case RongIMLib.ConnectionStatus["CONNECTING"]:
                            case 1:
                                console.log("连接中");
                                break;
                            case RongIMLib.ConnectionStatus["DISCONNECTED"]:
                            case 2:
                                console.log("当前用户主动断开链接");
                                break;
                            case RongIMLib.ConnectionStatus["NETWORK_UNAVAILABLE"]:
                            case 3:
                                console.log("网络不可用");
                                break;
                            case RongIMLib.ConnectionStatus["CONNECTION_CLOSED"]:
                            case 4:
                                console.log("未知原因，连接关闭");
                                break;
                            case RongIMLib.ConnectionStatus["KICKED_OFFLINE_BY_OTHER_CLIENT"]:
                            case 6:
                                console.log("用户账户在其他设备登录，本机会被踢掉线");
                                break;
                            case RongIMLib.ConnectionStatus["DOMAIN_INCORRECT"]:
                            case 12:
                                console.log("当前运行域名错误，请检查安全域名配置");
                                break;
                        }
                    }
                });
                RongIMClient.setOnReceiveMessageListener({
                    // 接收到的消息
                    onReceived: function(message) {
                        // 判断消息类型
                        callbacks.receiveNewMessage && callbacks.receiveNewMessage(message);
                    }
                });
                //开始链接
                RongIMClient.connect(token, {
                    onSuccess: function(userId) {
                        callbacks.getCurrentUser &&
                            callbacks.getCurrentUser({
                                userId: userId
                            });
                        console.log("链接成功，用户id：" + userId);
                    },
                    onTokenIncorrect: function() {
                        console.log("token无效");
                    },
                    onError: function(errorCode) {
                        console.log(errorCode);
                    }
                });
            },
            // 发送文字消息
            sendTextMessage(content) {
                var that = this;
                console.log(this.instance);
                var pushData = "pushData" + Date.now();
                var isMentioned = false;
                var content = {
                    content: content,
                    user: {
                        id: this.userId, //不支持中文及特殊字符
                        name: "张三",
                        portrait: "https://avatars1.githubusercontent.com/u/10265829?s=96&v=4"
                    },
                    extra: '{"key": "value", "key2": 12, "key3": true}'
                };
                // var targetId = '5b5a838e8dcba81ce470bf28';
                var msg = new RongIMLib.TextMessage(content);
                var start = new Date().getTime();
                console.log(that.targetId);
                this.instance.sendMessage(
                    that.conversationType,
                    that.targetId,
                    msg, {
                        onSuccess: function(message) {
                            let content = message.content.content;
                            that.data_list.push({
                                avatar: require("@/assets/demo3.png"), // 头像
                                name: "诗人", // 名字
                                location: "aui-chat-left",
                                type: 1, // 1 表示文字内容 2 表示图片内容 3 表示表情内容
                                val: content // 内容 信息
                            })
                        },
                        onError: function(errorCode, message) {
                            console.log(message);
                        }
                    },
                    isMentioned,
                    pushData
                );
            },
            // 发送图片消息
            sendImageMessage() {
                var content = {
                    imageUri: "http://rongcloud.cn/images/newVersion/log_wx.png",
                    content: getBase64Image()
                };
                var msg = new RongIMLib.ImageMessage(content);
                var start = new Date().getTime();
                instance.sendMessage(conversationType, targetId, msg, {
                    onSuccess: function(message) {
                        markMessage(message);
                        showResult("发送图片消息 成功", message, start);
                    },
                    onError: function(errorCode, message) {
                        showResult("发送图片消息 失败", message, start);
                    }
                });
            },
            // 发送文件消息
            sendFileMessage() {
                var content = {
                    name: 'log_wx', // 文件名称
                    size: '20k', // 文件大小，单位自己约定
                    type: 'png', // 文件的后缀名，例如 png、js、doc ...
                    fileUrl: 'http://rongcloud.cn/images/newVersion/log_wx.png' // 文件地址
                };
                var msg = new RongIMLib.FileMessage(content);
                var start = new Date().getTime();
                instance.sendMessage(conversationType, targetId, msg, {
                    onSuccess: function(message) {
                        markMessage(message);
                        showResult("发送文件消息成功", message, start);
                    },
                    onError: function(errorCode, message) {
                        showResult("发送文件消息失败", message, start);
                    }
                });
            },
            // 发送语音消息
            sendVoiceMessage() {
                var content = {
                    content: voice, //form res/voice-amr-base64.json
                    duration: 20
                };
                var msg = new RongIMLib.VoiceMessage(content);
                var start = new Date().getTime();
                instance.sendMessage(conversationType, targetId, msg, {
                    onSuccess: function(message) {
                        markMessage(message);
                        showResult("发送语音消息成功", message, start);
                    },
                    onError: function(errorCode, message) {
                        showResult("发送语音消息失败", message, start);
                    }
                });
            },
            // 
        },
        watch: {
            text(new_val, old_val) {
                this.sendTextMessage(new_val)
            }
        }
    };
</script>
<style scoped>
    .aui-chat {
        margin-top: 2.2rem;
    }
    .wh_input_box {
        position: relative;
        margin: 0;
        height: 2.2rem;
        line-height: 2.2rem;
    }
    form {
        width: 100%;
        height: 2.2rem;
    }
    form input {
        height: 2.2rem;
        margin-left: 0.4rem;
        margin-left: 2rem;
    }
    .iconfont {
        position: absolute;
        font-size: 1.5rem;
    }
    .icon_1 {
        left: 0.5rem;
    }
    .icon_2 {
        right: 2.5rem;
    }
    .icon_3 {
        right: 0.5rem;
    }
</style>

