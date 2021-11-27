$(function() {
    //调用函数 获取用户信息
    var layer = layui.layer;
    getInfo();
    //实现退出功能
    $('#btnLogout').on('click', function() {
        layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token');
            location.href = 'login.html';
            layer.close(index);
        });
    })
})

//获取登录用户信息
function getInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        //请求头配置对象
        success: function(res) {
            // 判断是否获取数据成功
            if (res.status !== 0) {
                return layui.layer.msg('获取数据失败');
            }
            //渲染用户头像
            changePic(res.data);
        }
    })
};

// 渲染用户的头像函数
function changePic(user) {
    //获取用户名称
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic) {
        $('.layui-nav-img').css('src', 'user_pic').show();
        $('.resuerfo').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.resuerfo').show();
    }
};