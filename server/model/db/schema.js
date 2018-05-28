// 建立模型
var mongoose = require('./mongoose');
mongoose.Promise = Promise;
var ObjectId = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;
// 建立  用户  类
var UserSchema = new Schema({
    username: { type: String }, //用户账号
    password: { type: String },  //密码
    createT: {
        type: String,
        default: new Date()
    },
    avatar: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    note: {
        type: String,
        default: ''
    },
    sex: {
        type: String,
        default: ''
    }
});
var User = mongoose.model('User', UserSchema);
// 好友列表
var FriendsSchema = new Schema({
    createT: {
        type: String,
        default: new Date()
    },
    my_id: {
        type: ObjectId,
        ref: 'User'
    },
    fri_id: {
        type: ObjectId,
        ref: 'User'
    },
    status: {
        type: Number,
        default: 0
    }
});
var Friends = mongoose.model("Friend", FriendsSchema);
module.exports = {
    User: User,
    Friends: Friends
}