$.ajaxPrefilter(function(options) {
    //在调用ajax之前进行补充接口
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;


    //调用权限问题complete
    options.complete = function(res) {
        if (res.responseJSON.status !== 0) {
            localStorage.removeItem('token');
            location.href = 'login.html';
        }
    }
    if (options.url.indexOf('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
})