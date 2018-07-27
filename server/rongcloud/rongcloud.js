/**
 * Created by wanhua on 2017/12/19.
 */
// var rongcloudSDK = require('rongcloud-sdk');
const Url = require('../config/datebase').Url;
const app_key = '8brlm7uf8z6o3';
const app_secret = 'OosAjt252LQkk';
const rongcloudSDK = require('rongcloud-sdk')({
    appkey: app_key,
    secret: app_secret
});

// rongcloudSDK.init(app_key, app_secret);
function getToken(id, callback) {
    console.log(id);
    var user = {
        id: id,
        name: 'Maritn',
        portrait: 'http://7xogjk.com1.z0.glb.clouddn.com/IuDkFprSQ1493563384017406982'
    };
    rongcloudSDK.User.register(user).then(result => {
            if (result.code === 200) {
                callback(result.token);
            }
    }, error => {
        console.log(error);
    });
}
function checkOnline(userId, callback) {
    rongcloudSDK.user.checkOnline(userId, 'Lance', 'http://files.domain.com/avatar.jpg', function (err, resultText) {
        if (err) {
            // Handle the error
        }
        else {
            var result = JSON.parse(resultText);
            if (result.code === 200) {
                callback(result);
            }
        }
    });
}
module.exports = getToken;
