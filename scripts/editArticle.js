// 新建文档之后用 typora 打开文件
var spawn = require('child_process').spawn;
hexo.on('new', function(data){
    var typora_path = "D:\\Program Files\\Typora\\Typora.exe";

    spawn(typora_path, [data.path]);
});