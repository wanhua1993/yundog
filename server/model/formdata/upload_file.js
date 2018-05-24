var formidable = require('formidable');

var upload_file = function (req, res, callback) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = './public/images/';
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.maxFields = 1000;
    // parse方法解析node.js中request请求中包含的form表单提交的数据。cb为处理请求的回调函数。
    form.parse(req, function (err, fields, files) {
        console.log(files);
        var path = '/images/' + files.file.path.split('\\')[2];
        if(err) {
            console.log(err);
            return
        }
        callback(err, path, fields);
    })
}
module.exports = upload_file;