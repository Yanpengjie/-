$(function() {
    $('#link_login').on('click', function() {
        $('.changeLogin').hide();
        $('.changeReg').show();
    });

    $('#link_reg').on('click', function() {
            $('.changeLogin').show();
            $('.changeReg').hide();
        })
        //  从 layui中获取对象
    var form = layui.form;
    var layer = layui.layer;
    //通过 form.varyfy();自定义校验规则
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                var pwd = $('#reword').val();
                if (pwd !== value) {
                    return '与输入密码不一致';
                }
            }
        })
        //监听注册表单事件
    $('#form_reg').on('submit', function(e) {
        //阻止默认提交行为
        e.preventDefault();
        //发起ajax 的post请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,返回登录', { time: 1000 },
                function() {
                    $('.changeLogin').show();
                    $('.changeReg').hide();
                });
        })
    })
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功');
                // 将token储存到页面中
                localStorage.setItem('token', res.token);
                //location.href = 'index.html';
            }

        })
    })
})