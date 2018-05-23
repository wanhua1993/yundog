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
module.exports = {
    User: User
}