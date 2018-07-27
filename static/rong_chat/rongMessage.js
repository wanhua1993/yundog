/**
 * Created by wanhua on 2018/1/23.
 */
$(function () {
    var token = $('.mess_token').val(); // 获取 token 值 该值从后台请求过来渲染到页面上的
    var appkey = "pvxdm17jpiaor";  // appKey 值 （目前是测试账号的值）
    var serviceId = '';// 这个值最后是ajax从后台请求过来的 即随机过来的客服 id 值；
    var user = {  // 获取当前登录用户的信息
        userId: $('.mess_userId').val(),
        name: $('.mess_username').val(),
        avatar: $('.am-circle').attr('src')
    };

    RongIMClient.init(appkey);//这是初始化，需要填参数就是你的APPKEY。这个不难理解。

    RongIMClient.connect(token, { // 连接融云服务器。
        onSuccess: function (userId) {
            console.log("Login successfully." + userId);
            //userId是申请token时的填写的id，到时候可以封装在下面的extra中传过去
            // 获取未读消息
            RongIMClient.getInstance().getTotalUnreadCount({
                onSuccess: function (count) {
                    if (count == 0) {
                        $('.wh_massNum').hide();
                    } else {
                        $('.wh_massNum').show();
                        $('.wh_massNum').html(count);// 所有未读消息的总数
                    }
                },
                onError: function (error) {
                    concole.log(error);
                }
            });
            fileMessage(RongIMClient.getInstance());
        },
        onTokenIncorrect: function () {
            console.log('token无效');
        },
        onError: function (errorCode) {
            var info = '';
            switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                    info = '超时';
                    break;
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                    info = '未知错误';
                    break;
                case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                    info = '不可接受的协议版本';
                    break;
                case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                    info = 'appkey不正确';
                    break;
                case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                    info = '服务器不可用';
                    break;
            }
            console.log(errorCode);
        }
    });
    // 连接状态监听器
    RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
            switch (status) {
                //链接成功
                case RongIMLib.ConnectionStatus.CONNECTED:
                    console.log('链接成功');
                    break;
                //正在链接
                case RongIMLib.ConnectionStatus.CONNECTING:
                    console.log('正在链接');
                    break;
                //重新链接
                case RongIMLib.ConnectionStatus.DISCONNECTED:
                    console.log('断开连接');
                    break;
                //其他设备登陆
                case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                    console.log('其他设备登陆');
                    break;
                //网络不可用
                case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                    console.log('网络不可用');
                    break;
            }
        }
    });
    // 消息监听器
    RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
            var user = message.content.user;
            var userId = message.senderUserId;  // 发送信息用户的 id 号
            var tarId = message.targetId;  // 发送信息用户的 id 号
            var messLi = ' <li class=""> <input type="hidden" value="' + userId + '" class="wh_userId"> <div class="chat-head"><img src="' + user.avatar + '"></div> <div class="chat-infr"><h4>' + user.name + '</h4><i class="mass-ico-i"></i><p>' + message.content.content + '</p></div><a class="chat-colse" href="javascript:void(0)"></a></li>';

            var detailLi = '<li class="mass-box"></li>';

            if ($('.wh_userId').length) {  // 如果已经收到一条消息
                var length = $('.wh_userId').length;
                var res = '';
                for (var i = 0; i < length; i++) {
                    res += $('.wh_userId').eq(i).val() + '-';
                }
                if (res.indexOf(userId) === -1) {
                    // 如果没有这个用户 ，则新添加一栏聊天窗口
                    $('.sidebar-ul').append(messLi);
                    $('.mass-box-ul').append(detailLi);
                    var indexLi = $('.mass-box-ul').find('li').length - 1;
                    messSwitch(message, indexLi, user, userId, tarId);
                } else {
                    // 如果有这个用户
                    $('.wh_userId').each(function (index) {
                        if ($('.wh_userId').eq(index).val() == userId) {
                            $('.sidebar-ul').find('li').eq(index).find('p').html(message.content.content);
                            messSwitch(message, index, user, userId, tarId);
                        }
                    });
                }
            } else { // 如果还没有收到任何消息
                $('.sidebar-ul').append(messLi);
                $('.mass-box').show();
                messSwitch(message, 0, user, userId, tarId);
            }
            $('.sidebar-ul').find('li').removeClass('cur');
            $('.sidebar-ul').find('li').eq(0).addClass('cur');
            // 接收到消息以后，将该消息变成已读状态
            $.ajax({
                type: 'POST',
                url: '/website/show/myMedia/hadBecomeRead',
                data: {
                    fromId: userId,
                },
                success: function (data){
                    console.log(data);
                }
            });
        }
    });

    function messSwitch(message, index, user) {
        switch (message.messageType) {
            case RongIMClient.MessageType.TextMessage:
                // 发送的消息内容将会被打印
                var extra = message.content.extra;
                console.log(message.content);
                if (extra == '发起约稿') {
                    $('.mass-box').eq(index).append('<div class="manu"> <div class="manutitle">约稿</div><p>「' + user.name + '」向「客服经理」发起约稿，来自' + user.type + '</p><div class="manuBtn"><a href="javascript:void(0)">接稿</a></div></div>');
                } else if(extra == 'sendTemFile') {
                    var type = message.content.user.text.split('=')[1].split('-')[0];
                    var wh_massTem = '';
                    if(type == 'H5') {
                        wh_massTem = 'mass-h5';
                    }
                    if(type == 'softWen') {
                        wh_massTem = 'mass-rw';
                    }
                    if(type == 'poster') {
                        wh_massTem = 'mass-hb';
                    }
                    if(type == 'ad') {
                        wh_massTem = 'mass-gg';
                    }
                    $('.mass-box').eq(index).append('<div class="mass-box-right clearFloat"> <div class="mass-box-head"><img src="' + user.avatar + '"></div><a class="mass-record ' + wh_massTem + '" href="' + message.content.user.text + '" target="_blank"> <p class="mass-title">' +  message.content.content + '</p></a></div>');
                }else {
                    $('.mass-box').eq(index).append('<div class="mass-box-right clearFloat"><div class="mass-box-head"><img src="' + user.avatar + '"></div><span class="mass-record">' + message.content.content + '</div> </span> </div>');
                    $('.mass-record').find('span').css('display', 'inline-block');
                }

                break;
            case RongIMClient.MessageType.ImageMessage:
                // message.content.imageUri
                var mass_t = '';
                $('.mass-box').eq(index).append('<div class="mass-box-right clearFloat"><div class="mass-box-head"><img src="' + user.avatar + '"></div><span class="mass-record ' + mass_t + '"><img src="' + message.content.imageUri + '"></span></div>');
                $('.mass-box').eq(index).find('.mass-record').find('img').load(function () {
                    var width = this.width;
                    var height = this.height;
                    if (width > height) {
                        $(this).addClass('mass-wt');
                    } else {
                        $(this).addClass('mass-ct');
                    }
                });
                // do something...
                break;
            case RongIMClient.MessageType.FileMessage:
                //
                $('.mass-box').eq(index).append('<div class="mass-box-right clearFloat"> <div class="mass-box-head"><img src="' + user.avatar + '"></div><a class="mass-record mass-rw" download="" href="' + message.content.fileUrl + '"> <p class="mass-title">' + message.content.name + '</p></a></div>');
                // do something...
                break;
            case RongIMClient.MessageType.RichContentMessage:
                // do something...
                break;
            case RongIMClient.MessageType.DiscussionNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.InformationNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.ContactNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.ProfileNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.CommandNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.CommandMessage:
                // do something...
                break;
            case RongIMClient.MessageType.UnknownMessage:
                // do something...
                break;
            default:
            // 自定义消息
            // do something...
        }
        $('.mass-box').scrollTop($('.mass-box')[0].scrollHeight);
    }

    // 文字发送
    function getMessage(content, index, targetId) {
        //生成聊天内容
        //在页面追加你要生成的内容
        content = RongIMLib.RongIMEmoji.symbolToHTML(content);
        $('.mass-box').eq(index).show();
        $('.mass-box').eq(index).append('<div class="mass-box-left clearFloat"><div class="mass-box-head"><img src="' + user.avatar + '"></div><span class="mass-record">' + content + '</span></div>');
        // 定义消息类型,文字消息使用 RongIMLib.TextMessage
        var msg = new RongIMLib.TextMessage({content: content, extra: "附加要传递的值", user: user});
        var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
        RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                // 发送消息成功
                onSuccess: function (message) {
                    //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                    console.log(message);
                    console.log("Send successfully");
                    $('.mass-box').scrollTop($('.mass-box')[0].scrollHeight);
                },
                onError: function (errorCode, message) {
                    onError(errorCode, message);
                }
            }
        );
    }

    //  文件发送
    function fileMessage(im) {
        var file = document.getElementById('file-Id');

        // 第一步
        file.onchange = function () {
            var _file = this.files[0];
            var type = _file.type.split('/')[0];
            if (type != 'image') {
                alert('文件格式不正确，只能发送图片');
            } else {
                initType[getFileType(_file.name)](_file);
            }
        };
        // 第二步
        var getFileType = function (filename) {
            // 默认支持两种图片格式，可自行扩展
            var imageType = {
                'jpg': 1,
                'png': 2
            };
            var index = filename.lastIndexOf('.') + 1,
                type = filename.substring(index);
            return type in imageType ? 'image' : 'file';
        };
        // 第三步
        var config = {
            domain: 'http://upload.qiniu.com',
            fileType: RongIMLib.FileType.IMAGE,
            getToken: function (callback) {
                /****************************
                 * 使用融云文件存储注意事项：
                 * 1、有效期为 1 个月。
                 * 2、文件不可迁移。
                 ****************************
                 */
                im.getFileToken(this.fileType, {
                    onSuccess: function (data) {
                        callback(data.token);
                    },
                    onError: function (error) {
                        console.log('getFileToken error:' + error);
                    }
                });
            }
        };
        // 第四步
        var initType = {
            file: function (_file) {
                config.fileType = RongIMLib.FileType.FILE;
                UploadClient.initFile(config, function (uploadFile) {
                    uploadFile.upload(_file, callback);
                });
            },
            image: function (_file) {
                UploadClient.initImage(config, function (uploadFile) {
                    uploadFile.upload(_file, callback);
                });
            }
        };
        // 第五步
        var callback = {
            onError: function (errorCode) {
                console.log(errorCode);
            },
            onProgress: function (loaded, total) {
                /*var percent = Math.floor(loaded / total * 100);
                 var progressBar = document.getElementById('progressBar');
                 var progressContent = document.getElementById('progressContent');
                 progressBar.style.width = percent + '%';
                 progressContent.innerHTML = percent + "%";*/
            },
            onCompleted: function (data) {
                // 文件上传完成时
                data.fileType = getFileType(data.name);
                getFileUrl(data);
            }
        };

        var getFileUrl = function (data) {
            urlItem[data.fileType](data);
        };

        var urlItem = {
            // 文件上传
            file: function (data) {
                var fileType = RongIMLib.FileType.FILE;
                im.getFileUrl(fileType, data.filename, data.name, {
                    onSuccess: function (result) {
                        data.downloadUrl = result.downloadUrl;
                        createMessage(data);
                    },
                    onError: function (error) {
                        console.log('getFileToken error:' + error);
                    }
                });
            },
            // 图片上传
            image: function (data) {
                var fileType = RongIMLib.FileType.IMAGE;
                im.getFileUrl(fileType, data.filename, null, {
                    onSuccess: function (result) {
                        data.downloadUrl = result.downloadUrl;
                        createMessage(data);
                        $('.mass-box').scrollTop($('.mass-box')[0].scrollHeight);
                    },
                    onError: function (error) {
                        console.log('getFileToken error:' + error);
                    }
                });
            }
        };

        var createMessage = function (file) {
            var msg = messageItem[file.fileType](file);
            var index = $('.sidebar-ul').find('li').index($('.cur'));
            var targetId = '';
            if ($('.sidebar-ul').find('li').length) {
                targetId = $('.sidebar-ul').find('li').eq(index).find('.wh_userId').val();
            } else {
                targetId = serviceId;
            }
            var conversationType = RongIMLib.ConversationType.PRIVATE; // 私聊
            RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
                onSuccess: function (message) {
                    var content = {};
                    if (message.messageType == "ImageMessage") {
                        content.text = message.content.imageUri;
                        content.type = 'imageMessage';
                        content.name = 'image';
                    }
                    if (message.messageType == "FileMessage") {
                        content.text = message.content.fileUrl;
                        content.type = 'fileMessage';
                        content.name = message.content.name;
                    }
                    saveChatRecord(user.userId, targetId, content);
                },
                onError: function (errorCode, message) {
                    onError(errorCode, message)
                }
            });
        };

        var messageItem = {
            file: function (file) {
                var ind = $('.sidebar-ul').find('li').index($('.cur'));
                var name = file.name || '',
                    index = name.lastIndexOf('.') + 1,
                    type = name.substring(index);
                // 创建文件消息
                $('.mass-box').eq(ind).append('<div class="mass-box-left clearFloat"> <div class="mass-box-head"><img src="' + user.avatar + '"></div><a class="mass-record mass-rw" download="" href="' + file.downloadUrl + '"> <p class="mass-title">' + file.name + '</p></a></div>');
                return new RongIMLib.FileMessage({
                    name: file.name,
                    size: file.size,
                    type: type,
                    fileUrl: file.downloadUrl,
                    user: user
                });
            },
            image: function (image) {
                var index = $('.sidebar-ul').find('li').index($('.cur'));
                var width = image.w;
                var height = image.h;
                var mass_t = '';
                if (width > height) {
                    mass_t = 'mass-wt';
                } else {
                    mass_t = 'mass-ct';
                }
                $('.mass-box').eq(index).show();
                $('.mass-box').eq(index).append('<div class="mass-box-left clearFloat"><div class="mass-box-head"><img src="' + user.avatar + '"></div><span class="mass-record ' + mass_t + '"><img src="' + image.downloadUrl + '"></span></div>');
                return new RongIMLib.ImageMessage({content: image.thumbnail, imageUri: image.downloadUrl, user: user});
            }
        };

        var createA = function (url) {
            var tmpl = '<a href={0} target="_blank">[{1}]</a><br>', str = '';
            url = Object.prototype.toString.call(url) == '[object Array]' ? url : [url];
            for (var i = 0, len = url.length; i < len; i++) {
                var item = url[i];
                str += stringFormat(tmpl, [item.url, item.memo]);
            }
            return str;
        };
    }

    // 模板地址发送 主要用于聊天第三个文件发送 按钮
    function MessageFile(content, index, targetId) {
        //生成聊天内容
        //在页面追加你要生成的内容
        var type = content.text.split('=')[1].split('-')[0];
        var wh_massTem = '';
        if(type == 'H5') {
            wh_massTem = 'mass-h5';
        }
        if(type == 'softWen') {
            wh_massTem = 'mass-rw';
        }
        if(type == 'poster') {
            wh_massTem = 'mass-hb';
        }
        if(type == 'ad') {
            wh_massTem = 'mass-gg';
        }
        $('.mass-box').eq(index).show();
        $('.mass-box').eq(index).append('<div class="mass-box-left clearFloat"><div class="mass-box-head"><img src="' + user.avatar + '"></div><a class="mass-record ' + wh_massTem + '" href="' + content.text + '" target="_blank"> <p class="mass-title">' + content.name + '</p></a></div>');
        // 定义消息类型,文字消息使用 RongIMLib.TextMessage
        user.text = content.text;
        var msg = new RongIMLib.TextMessage({content: content.name, extra: "sendTemFile", user: user});
        var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
        RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                // 发送消息成功
                onSuccess: function (message) {
                    //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                    console.log(message);
                    console.log("Send successfully");
                    $('.mass-box').scrollTop($('.mass-box')[0].scrollHeight);
                },
                onError: function (errorCode, message) {
                    onError(errorCode, message);
                }
            }
        );
    }
    // 表情发送
    $('.emoji').on('click', function () {
        RongIMLib.RongIMEmoji.init();  // 初始化表情
        var list = RongIMLib.RongIMEmoji.list;  // 获取表情列表
        var newList = list.slice(0, 32);  // 截取表情前  32 个
        if ($(this).hasClass('wh_emoji')) {
            // 关闭表情库
            $('.wh_emoji_box').hide();
            $(this).css('background', 'url(/assets/img/bq11609.png) no-repeat');
            $(this).removeClass('wh_emoji');
        } else {
            // 打开表情库
            $(this).addClass('wh_emoji');
            $(this).css('background', 'url(/assets/img/bq21609.png) no-repeat');
            $('.wh_emoji_box').show();
            var res = '';
            for (var i = 0; i < newList.length; i++) {
                res += '<li>' + newList[i].node.outerHTML + '</li>'
            }
            $('.wh_emoji_box_ul').html(res);
        }
    });
    // 点击表情
    $('.wh_emoji_box_ul').on('click', 'li', function () {
        var textCon = $('.chat-area').val();
        var emoji = textCon + $(this).find('span').attr('name');
        $('.chat-area').val(emoji);
    });
    // 点击发送按钮
    $('.chat-box-submit').on('click', function () {
        var index = $('.sidebar-ul').find('li').index($('.cur'));
        var targetId = '';
        if ($('.sidebar-ul').find('li').length) {
            targetId = $('.sidebar-ul').find('li').eq(index).find('.wh_userId').val();
        } else {
            targetId = serviceId;
        }
        var content = {};
        content.text = $('.chat-area').val();
        content.type = 'textMessage';
        content.name = 'text';
        $('.wh_emoji_box').hide();
        $('.emoji').removeClass('wh_emoji');
        $('.emoji').css('background', 'url(/assets/img/bq11609.png) no-repeat');
        if (content.text != '') {
            saveChatRecord(user.userId, targetId, content);
            getMessage(content.text, index, targetId);
        } else {
            alert('消息不能为空');
        }
        $('.chat-area').val('');
        $('.chat-area').blur();
    });

    $('.chat-box-content').keydown(function (event) {
        event.preventDefault = true;
        if (event.keyCode == 13) {
            var index = $('.sidebar-ul').find('li').index($('.cur'));
            var targetId = '';
            if ($('.sidebar-ul').find('li').length) {
                targetId = $('.sidebar-ul').find('li').eq(index).find('.wh_userId').val();
            } else {
                targetId = serviceId;
            }
            var content = {};
            content.text = $('.chat-area').val();
            content.type = 'textMessage';
            content.name = 'text';
            $('.wh_emoji_box').hide();
            $('.emoji').removeClass('wh_emoji');
            $('.emoji').css('background', 'url(/assets/img/bq11609.png) no-repeat');
            if (content.text != '') {
                saveChatRecord(user.userId, targetId, content);
                getMessage(content.text, index, targetId);
            } else {
                alert('消息不能为空');
            }
            $('.chat-area').val('');
            $('.chat-area').blur();
        }
    });
    // 错误信息打印
    function onError(errorCode, message) {
        var info = '';
        switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
                info = '超时';
                break;
            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                info = '未知错误';
                break;
            case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                info = '在黑名单中，无法向对方发送消息';
                break;
            case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                info = '不在讨论组中';
                break;
            case RongIMLib.ErrorCode.NOT_IN_GROUP:
                info = '不在群组中';
                break;
            case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                info = '不在聊天室中';
                break;
            default :
                info = "x";
                break;
        }
        console.log('发送失败:' + info);
    }

    // ajax 存储聊天记录
    function saveChatRecord(fromId, toId, content) {
        var id = $('.mess_id').val();
        $.ajax({
            type: 'POST',
            url: '/website/show/myMedia/saveChatRecord',
            data: {
                fromId: fromId,
                toId: toId,
                content: content,
                id: id
            },
            success: function (data) {
                if (data.code == '200') {
                    $('.mess_id').val(data.id);
                } else {
                    JSON.stringify(data);
                }
            }
        });
    }

    // ajax 加载聊天记录
    loadChatRecord();
    function loadChatRecord() {
        // 首先查看该用户是否有固定的客服id，，有的话直接拿到客服id，，没有则随机挑选一位客服
        $.ajax({
            type: 'GET',
            url: '/website/show/myMedia/lookAtService',
            success: function (data){
                if(data.code == '200') {
                    serviceId = data.result;
                    var toId = serviceId;
                    var index = 0;
                    if (user.userId == serviceId) {
                        // 说明是客服人员登录状态，则要加载所有的聊天数据 首先要找最近和她聊天人的 聊天记录（ 可能有好多人 ）
                        $.ajax({
                            type: 'GET',
                            url: '/website/show/myMedia/recentChatRecord?toId=' + toId,
                            success: function (data) {
                                if (data.code == '200') {
                                    var users = data.result.lookAtUser;
                                    var value = data.result.lookAtFirstChatRecord;
                                    // 展示聊天用户
                                    for (var i = 0; i < users.length; i++) {
                                        if (users[i].avatarWeb == null) {
                                            users[i].avatarWeb = '/assets/img/selfimg.png';
                                        }
                                        var messLi = ' <li class=""> <input type="hidden" value="' + users[i].id + '" class="wh_userId"> <div class="chat-head"><img src="' + users[i].avatarWeb + '"></div> <div class="chat-infr"><h4>' + users[i].username + '</h4><i class="mass-ico-i"></i><p></p></div><a class="chat-colse" href="javascript:void(0)"></a></li>';
                                        $('.sidebar-ul').append(messLi);
                                        $('.sidebar-ul').find('li').eq(0).addClass('cur');
                                        var detailLi = '<li class="mass-box"></li>';
                                        $('.mass-box-ul').append(detailLi);
                                    }
                                    // 展示最近用户的聊天信息
                                    for (var i = 0; i < value.length; i++) {
                                        var fromId = value[i].fromId;
                                        var type = JSON.parse(value[i].content).type; // 消息的类型 （图片，文字，文件）
                                        var content = JSON.parse(value[i].content).text; // 消息的内容（图片地址，文字内容，文件地址）
                                        if (type == 'textMessage') {
                                            content = RongIMLib.RongIMEmoji.symbolToHTML(content); // 如果消息类型是文字的话 需要将其中的表情转换
                                        }
                                        var name = JSON.parse(value[i].content).name; // 消息的名字 （一般是用于 文件 名字的获取）
                                        setChatRecord(fromId, type, content, name, users[0].avatarWeb, index, value[i]);
                                    }

                                } else {
                                    JSON.stringify(data);
                                }
                            }
                        });
                    } else {
                        $.ajax({
                            type: 'GET',
                            url: '/website/show/myMedia/loadChatRecord?targetId=' + toId,
                            cache: false,
                            success: function (data) {
                                if (data.code == '200') {
                                    var value = data.result;
                                    var toIdUser = data.user;
                                    for (var i = 0; i < value.length; i++) {
                                        var fromId = value[i].fromId;
                                        var type = JSON.parse(value[i].content).type; // 消息的类型 （图片，文字，文件）
                                        var content = JSON.parse(value[i].content).text; // 消息的内容（图片地址，文字内容，文件地址）
                                        if (type == 'textMessage') {
                                            content = RongIMLib.RongIMEmoji.symbolToHTML(content); // 如果消息类型是文字的话 需要将其中的表情转换
                                        }
                                        var name = JSON.parse(value[i].content).name; // 消息的名字 （一般是用于 文件 名字的获取）
                                        setChatRecord(fromId, type, content, name, toIdUser.avatarWeb, index, value[i]);
                                    }
                                    var messLi = ' <li class="cur"> <input type="hidden" value="' + toIdUser.id + '" class="wh_userId"> <div class="chat-head"><img src="' + toIdUser.avatarWeb + '"></div> <div class="chat-infr"><h4>' + toIdUser.username + '</h4><i class="mass-ico-i"></i><p>' + content + '</p></div><a class="chat-colse" href="javascript:void(0)"></a></li>';
                                    $('.sidebar-ul').append(messLi);
                                } else {
                                    JSON.stringify(data);
                                }
                            }
                        });
                    }
                } else {
                    alert('未链接到客服！');
                }
            }
        });
        /*--------------------------------------------------*/
        /*var toId = serviceId;
        var index = 0;
        if (user.userId == serviceId) {
            // 说明是客服人员登录状态，则要加载所有的聊天数据 首先要找最近和她聊天人的 聊天记录（ 可能有好多人 ）
            $.ajax({
                type: 'GET',
                url: '/website/show/myMedia/recentChatRecord?toId=' + toId,
                success: function (data) {
                    if (data.code == '200') {
                        var users = data.result.lookAtUser;
                        var value = data.result.lookAtFirstChatRecord;
                        // 展示聊天用户
                        for (var i = 0; i < users.length; i++) {
                            if (users[i].avatarWeb == null) {
                                users[i].avatarWeb = '/assets/img/selfimg.png';
                            }
                            var messLi = ' <li class=""> <input type="hidden" value="' + users[i].id + '" class="wh_userId"> <div class="chat-head"><img src="' + users[i].avatarWeb + '"></div> <div class="chat-infr"><h4>' + users[i].username + '</h4><i class="mass-ico-i"></i><p></p></div><a class="chat-colse" href="javascript:void(0)"></a></li>';
                            $('.sidebar-ul').append(messLi);
                            $('.sidebar-ul').find('li').eq(0).addClass('cur');
                            var detailLi = '<li class="mass-box"></li>';
                            $('.mass-box-ul').append(detailLi);
                        }
                        // 展示最近用户的聊天信息
                        for (var i = 0; i < value.length; i++) {
                            var fromId = value[i].fromId;
                            var type = JSON.parse(value[i].content).type; // 消息的类型 （图片，文字，文件）
                            var content = JSON.parse(value[i].content).text; // 消息的内容（图片地址，文字内容，文件地址）
                            if (type == 'textMessage') {
                                content = RongIMLib.RongIMEmoji.symbolToHTML(content); // 如果消息类型是文字的话 需要将其中的表情转换
                            }
                            var name = JSON.parse(value[i].content).name; // 消息的名字 （一般是用于 文件 名字的获取）
                            setChatRecord(fromId, type, content, name, users[0].avatarWeb, index, value[i]);
                        }

                    } else {
                        JSON.stringify(data);
                    }
                }
            });
        } else {
            $.ajax({
                type: 'GET',
                url: '/website/show/myMedia/loadChatRecord?targetId=' + toId,
                cache: false,
                success: function (data) {
                    if (data.code == '200') {
                        var value = data.result;
                        var toIdUser = data.user;
                        for (var i = 0; i < value.length; i++) {
                            var fromId = value[i].fromId;
                            var type = JSON.parse(value[i].content).type; // 消息的类型 （图片，文字，文件）
                            var content = JSON.parse(value[i].content).text; // 消息的内容（图片地址，文字内容，文件地址）
                            if (type == 'textMessage') {
                                content = RongIMLib.RongIMEmoji.symbolToHTML(content); // 如果消息类型是文字的话 需要将其中的表情转换
                            }
                            var name = JSON.parse(value[i].content).name; // 消息的名字 （一般是用于 文件 名字的获取）
                            setChatRecord(fromId, type, content, name, toIdUser.avatarWeb, index, value[i]);
                        }
                        var messLi = ' <li class="cur"> <input type="hidden" value="' + toIdUser.id + '" class="wh_userId"> <div class="chat-head"><img src="' + toIdUser.avatarWeb + '"></div> <div class="chat-infr"><h4>' + toIdUser.username + '</h4><i class="mass-ico-i"></i><p>' + content + '</p></div><a class="chat-colse" href="javascript:void(0)"></a></li>';
                        $('.sidebar-ul').append(messLi);
                    } else {
                        JSON.stringify(data);
                    }
                }
            });
        }*/
    }

    function setChatRecord(fromId, type, content, name, avatar, index, sharedContent) {

        if (avatar == null) {
            avatar = '/assets/img/selfimg.png'; // 默认的头像
        }
        var divMess = '';
        if (user.userId == fromId) { // 自己发送的信息
            if (type == 'textMessage') {
                // 文字信息
                divMess = '<div class="mass-box-left clearFloat"><input type="hidden" value="' + sharedContent.createTime + '"><div class="mass-box-head"><img src="' + user.avatar + '"></div><span class="mass-record">' + content + '</span></div>';
            } else if (type == 'imageMessage') {
                // 图片信息
                var mass_t = '';
                divMess = '<div class="mass-box-left clearFloat"><input type="hidden" value="' + sharedContent.createTime + '"><div class="mass-box-head"><img src="' + user.avatar + '"></div><span class="mass-record  ' + mass_t + '"><img src="' + content + '"></span></div>';
            } else if (type == 'fileMessage') {
                // 文件信息
                var typeTem = content.split('=')[1].split('-')[0];
                var wh_massTem = '';
                if(typeTem == 'H5') {
                    wh_massTem = 'mass-h5';
                }
                if(typeTem == 'softWen') {
                    wh_massTem = 'mass-rw';
                }
                if(typeTem == 'poster') {
                    wh_massTem = 'mass-hb';
                }
                if(typeTem == 'ad') {
                    wh_massTem = 'mass-gg';
                }
                divMess = '<div class="mass-box-left clearFloat"><input type="hidden" value="' + sharedContent.createTime + '"><div class="mass-box-head"><img src="' + user.avatar + '"></div><a class="mass-record ' + wh_massTem + '" href="' + content + '" target="_blank"> <p class="mass-title">' + name + '</p></a></div>';
            } else {
                // 约稿消息
                var username = $('.sidebar-ul').find('li').eq(index).find('h4').html();
                divMess = '<div class="manu"><div class="manutitle">约稿</div><p>「' + username + '」向「客服经理」发起约稿，来自' + content + '</p><div class="manuBtn"><a href="javascript:void(0)" data-id="' + sharedContent.id + '" class="receiveManu">接稿</a></div></div>';
            }
        } else { // 对方发送的信息
            if (type == 'textMessage') {
                // 文字信息
                divMess = '<div class="mass-box-right clearFloat"><input type="hidden" value="' + sharedContent.createTime + '"><div class="mass-box-head"><img src="' + avatar + '"></div><span class="mass-record">' + content + '</div> </span> </div>';
            } else if (type == 'imageMessage') {
                // 图片信息
                mass_t = '';
                divMess = '<div class="mass-box-right clearFloat"><input type="hidden" value="' + sharedContent.createTime + '"><div class="mass-box-head"><img src="' + avatar + '"></div><span class="mass-record ' + mass_t + '"><img src="' + content + '"></span></div>';
            } else if (type == 'fileMessage') {
                // 文件信息
                var typeTem = content.split('=')[1].split('-')[0];
                var wh_massTem = '';
                if(typeTem == 'H5') {
                    wh_massTem = 'mass-h5';
                }
                if(typeTem == 'softWen') {
                    wh_massTem = 'mass-rw';
                }
                if(typeTem == 'poster') {
                    wh_massTem = 'mass-hb';
                }
                if(typeTem == 'ad') {
                    wh_massTem = 'mass-gg';
                }
                divMess = '<div class="mass-box-right clearFloat"><input type="hidden" value="' + sharedContent.createTime + '"><div class="mass-box-head"><img src="' + avatar + '"></div><a class="mass-record ' + wh_massTem + '" href="' + content + '" target="_blank"> <p class="mass-title">' + name + '</p></a></div>';
            } else if (type == 'sendMan') {
                // 约稿消息
                var username = $('.sidebar-ul').find('li').eq(index).find('h4').html();
                divMess = '<div class="manu"> <div class="manutitle">约稿</div><p>「' + username + '」向「客服经理」发起约稿，来自' + content + '</p><div class="manuBtn"><a href="javascript:void(0)" data-id="' + sharedContent.id + '" class="receiveManu">接稿</a></div></div>';
            } else {
                // 共享邀请
                divMess = '<div class="manu"> <div class="manutitle">共享邀请</div> <p>「' + JSON.parse(sharedContent.content).username + '」向「你」发起共享邀请</p> <div class="manuBtn"><a href="javascript:void(0)" class="sharedBtn" data-sharedTemId="' + JSON.parse(sharedContent.content).sharedTemId + '" data-sharedUserId="' + JSON.parse(sharedContent.content).sharedUserId + '" data-messageId="' + sharedContent.id + '">同意</a><a class="refused" href="javascript:void(0)">拒绝</a> </div> </div>';
            }
        }
        $('.mass-box').eq(index).show();
        $('.mass-box').eq(index).append(divMess);
        // 判断时间是否超过半小时，超过半小时 则显示聊天的时间点
        /*--------------------------------------------------------------*/
        var lastLen = $('.mass-box').eq(index).find('.clearFloat').length - 2;
        var nowLen = $('.mass-box').eq(index).find('.clearFloat').length - 1;
        var lastTime = Date.parse($('.mass-box').eq(index).find('.clearFloat').eq(lastLen).find('input').val());
        var nowTime = Date.parse($('.mass-box').eq(index).find('.clearFloat').eq(nowLen).find('input').val());
        var timeCha = nowTime - lastTime;
        lastTime = new Date(lastTime);
        var month = lastTime.getMonth() + 1 + '月';
        var date = lastTime.getDate() + '日';
        var hour = lastTime.getHours() + ':';
        var min = lastTime.getMinutes();
        if(min == 0) {
            min = min + '0';
        }
        var wh_nowTime = month + date + ' ' + hour + min;
        if (timeCha > 1800000) {
            $('.mass-box').eq(index).find('.clearFloat').eq(nowLen).before('<p class="wh-nowTime">' + wh_nowTime + '</p>');
        }
        /*-------------------------------------------------------------*/
        $('.mass-box').eq(index).find('.mass-record').find('img').load(function () {
            var width = this.width;
            var height = this.height;
            if (width > height) {
                $(this).addClass('mass-wt');
            } else {
                $(this).addClass('mass-ct');
            }
        });
        $('.mass-box').scrollTop($('.mass-box')[0].scrollHeight);
    }

    // 点击每一个用户 加载聊天数据

    $('.sidebar-ul').on('click', 'li', function () {
        $('.mass-ico-i').hide();
        var fromId = $(this).find('.wh_userId').val();
        var index = $(this).index();
        $('.mass-box').eq(index).html('');
        $.ajax({
            type: 'get',
            url: '/website/show/myMedia/loadEveryRecord?fromId=' + fromId,
            success: function (data) {
                if (data.code == '200') {
                    var value = data.result;
                    var userNow = data.user;
                    for (var i = 0; i < value.length; i++) {
                        var fromId = value[i].fromId;
                        var type = JSON.parse(value[i].content).type; // 消息的类型 （图片，文字，文件）
                        var content = JSON.parse(value[i].content).text; // 消息的内容（图片地址，文字内容，文件地址）
                        if (type == 'textMessage') {
                            content = RongIMLib.RongIMEmoji.symbolToHTML(content); // 如果消息类型是文字的话 需要将其中的表情转换
                        }
                        var name = JSON.parse(value[i].content).name; // 消息的名字 （一般是用于 文件 名字的获取）
                        setChatRecord(fromId, type, content, name, userNow[0].avatarWeb, index, value[i]);
                    }
                } else {
                    alert(JSON.stringify(data));
                }
            }
        });
    });

    // 点击共享邀请 同意
    $('body').on('click', '.sharedBtn', function () {
        var sharedTemId = $(this).attr('data-sharedTemId');
        var sharedUserId = $(this).attr('data-sharedUserId');
        var messageId = $(this).attr('data-messageId');
        $.ajax({
            type: 'POST',
            url: '/website/show/myShow/agreeShared',
            data: {
                sharedTemId: sharedTemId,
                sharedUserId: sharedUserId,
                messageId: messageId
            },
            success: function (data) {
                if (data.code == '200') {
                    $('.manuBtn').html('<span style="border: 1px solid #ea5147;height: 30px;line-height: 30px;width: 80px;text-align: center;background: #ea5147;border-radius: 4px;color: #fff;display: inline-block;margin: 0 10px">已同意</span>');
                } else {
                    alert(1111);
                    alert(JSON.stringify(data));
                }
            }
        });
    });

    // 点击共享邀请 拒绝

    $('body').on('click', '.refused', function () {
        var sharedTemId = $(this).siblings('a').attr('data-sharedTemId');
        var sharedUserId = $(this).siblings('a').attr('data-sharedUserId');
        var messageId = $(this).siblings('a').attr('data-messageId');
        $.ajax({
            type: 'POST',
            url: '/website/show/myShow/refuseShared',
            data: {
                sharedTemId: sharedTemId,
                sharedUserId: sharedUserId,
                messageId: messageId
            },
            success: function (data) {
                if (data.code == '200') {
                    $('.manuBtn').html('<span style="border: 1px solid #ea5147;height: 30px;line-height: 30px;width: 80px;text-align: center;background: #ea5147;border-radius: 4px;color: #fff;display: inline-block;margin: 0 10px">已拒绝</span>');
                } else {
                    alert(JSON.stringify(data));
                }
            }
        });
    });

    // 点击上传文件的按钮，改变图片
    /*$('.pics').on('click', function (){
        if ($(this).hasClass('wh_pics')) {
            $(this).css('background', 'url(/assets/img/tp1022.png) no-repeat');
            $(this).removeClass('wh_pics');
        } else {
            $(this).addClass('wh_pics');
            $(this).css('background', 'url(/assets/img/tp21022.png) no-repeat');
        }
    });*/

    // 接稿
    $('body').on('click', '.manuBtn .receiveManu', function (){
        $(this).html('已接稿');
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: '/website/show/myMedia/receiveDraft?id=' + id,
            success: function (data){
                if(data.code == '200') {
                    console.log(data);
                } else {
                    alert(JSON.stringify(data));
                }
            }
        });
    });

    // 点击发送我的制作我文件 形成预览地址
    $('body').on('click', '.confirm', function (){
        $('.media-box-ul li').each(function () {
            var a = $(this).find('input').is(':checked');
            if (a == true) {
                var temId = $(this).find('.temId').html();
                var title = $(this).find('.media-box-p').html();
                var type = $(this).find('.wh_type').html();
                if(type == 'H5模板') {
                    type = 'H5';
                }
                if(type == '软文模板') {
                    type = 'softWen';
                }
                if(type == '海报模板') {
                    type = 'poster';
                }
                if(type == 'PPT模板') {
                    type = 'PPT';
                }
                if(type == '广告模板') {
                    type = 'ad';
                }
                var index = $('.sidebar-ul').find('li').index($('.cur'));
                var targetId = '';
                if ($('.sidebar-ul').find('li').length) {
                    targetId = $('.sidebar-ul').find('li').eq(index).find('.wh_userId').val();
                } else {
                    targetId = serviceId;
                }
                var content = {};
                content.text = '/website/show/myShow/webLook?temId=' + type + '-' + temId;
                content.type = 'fileMessage';
                content.name = title;
                saveChatRecord(user.userId, targetId, content);
                MessageFile(content, index, targetId);
            }
        });
    });
});