<template>
    <div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-media-list">
            <li class="aui-list-item">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media">
                        <img :src="user.avatar" style="width: 4rem; height: 4rem;">
                    </div>
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-text">
                            <div class="aui-list-item-title">{{user.name}}</div>
                            <div class="aui-list-item-right" @click='my_detail()'>
                                <i class="aui-iconfont aui-icon-right                                                                                                             "></i>
                            </div>
                        </div>
                        <div class="aui-list-item-text">
                            {{user.note}}
                        </div>
                    </div>
                </div>
                <div class="aui-info" style="padding-top:0">
                    <div class="aui-info-item">
                        <img :src="user.avatar" style="width:1rem; height: 1rem" class="aui-img-round" />
                        <span class="aui-margin-l-5">{{user.name}}</span>
                    </div>
                    <div class="aui-info-item">{{user.time}}</div>
                </div>
            </li>
            <li class="aui-list-item aui-bar aui-bar-tab wh_aui_li">
                <div class="aui-bar-tab-item" tapmode 
                v-for='(item, index) in dog_list' 
                :key='index'
                @click='dog_click(index)'>
                    <i class="aui-iconfont " :class='item.icon'></i>
                    <div class="aui-bar-tab-label">{{item.val}}</div>
                </div>
            </li>
        </ul>
        <ul class="aui-list aui-list-in">
            <li class="aui-list-item">
                <div class="aui-list-item-label-icon">
                    <i class="aui-iconfont aui-icon-home"></i>
                </div>
                <div class="aui-list-item-inner">
                    我的主页
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-label-icon">
                    <i class="aui-iconfont aui-icon-like"></i>
                </div>
                <div class="aui-list-item-inner">
                    我赞过的
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-label-icon">
                    <i class="aui-iconfont aui-icon-comment"></i>
                </div>
                <div class="aui-list-item-inner">
                    我评论的
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-label-icon">
                    <i class="aui-iconfont aui-icon-star"></i>
                </div>
                <div class="aui-list-item-inner">
                    我的收藏
                </div>
            </li>
        </ul>
        <div class="aui-btn aui-btn-danger aui-btn-block wh_confirm" @click='login_out'>退出登录</div>
    </div>
</template>  
<script>
import "@/assets/js/aui-dialog.js";
import mUtils from "@/utils/utils";
import baseURL from "@/server/url";
import url from "@/server/index.js";
export default {
  data() {
    return {
      user: {
        name: "流浪者",
        avatar: require("@/assets/timg.jpg"),
        note: "一个爱吃番茄的西红柿一枚！",
        time: "2018-05-21 10:31"
      },
      dog_list: [
        {
          icon: "aui-icon-pencil",
          val: "已签3天",
          path: ""
        },
        {
          icon: "aui-icon-star",
          val: "免费领养",
          path: ""
        },
        {
          icon: "aui-icon-calendar",
          val: "查看任务",
          path: ""
        },
        {
          icon: "aui-icon-my",
          val: "狗狗家园",
          path: ""
        }
      ]
    };
  },

  mounted() {
    this.user.name = mUtils.getStore("user").username;
    var avatar = mUtils.getStore("user").avatar;
    if (avatar) {
      this.user.avatar = baseURL + "" + avatar;
    }
    // 获取签到天数
    this.get_days();
  },

  methods: {
    // 退出登录
    login_out() {
      mUtils.setStore("user", "");
      this.$router.push("/");
    },
    // 跳转到我的信息页面
    my_detail() {
      this.$router.push("/my_detail");
    },
    // 点击狗狗一列
    dog_click(index) {
      if (index == 0) {
        var dialog = new auiDialog({});
        url.report_in().then(data => {
            this.dog_list[0].val = '已签' + data.data.days + '天';
          if (data.data.status == "2001") {
            dialog.alert({
              title: "",
              msg: "您已签到过了！",
              buttons: ["确定"]
            });
          } else {
            dialog.alert({
              title: "",
              msg: "您已签到成功！",
              buttons: ["确定"]
            });
          }
        });
      }
    },
    // 获取天数
    get_days() {
        url.get_days().then(data => {
            this.dog_list[0].val = '已签' + data.data.value + '天';
        })
    }
  }
};
</script>
<style scoped>
.aui-content {
  margin-top: 2.2rem;
}

.wh_confirm {
  margin-top: 2rem;
}

.aui-list-item {
  margin-top: 0.2rem;

  background: #fff;
}

.aui-list {
  background: rgb(238, 237, 237);
}

.aui-list-in {
  margin-top: 1rem;
}

.wh_qiandao {
  text-align: left;

  color: #212121;
}
.wh_aui_li {
  margin-top: 0.6rem;
}
</style>
