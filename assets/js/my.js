$(function(){
    var layer = layui.layer;
    $('#link_reg').on('click',function(){
        $('.reg-box').show().siblings('.login-box').hide()
    })
    $('#link_login').on('click',function(){
        $('.login-box').show().siblings('.reg-box').hide()
    })
    var form = layui.form;
    form.verify({
    pass: [/^[\S]{6,12}$/,'密码必须6-12位，且不能为空格'] ,
    aoligei(value){
        if($('#form_reg [name=password]').val()!==value) return '两次密码不一致'; 
    }
    });
    $("#form_reg").on('submit',function(e){
        e.preventDefault();
        // console.log(12);
        var data = {
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        }
        $.ajax({
            method:'post',
            url:'/api/reguser',
            data:data,
            success:function(res){
                console.log(res);
                if(res.status!==0)return layer.msg(res.message, {icon: 5})
                // alert('注册成功')
                layer.msg('用户注册成功', {icon: 1})
                $('.login-box').show().siblings('.reg-box').hide()
            }
        })
    }) 
    $("#form_login").on('submit',function(e){
        e.preventDefault();
        // var data=$(this).serialize();
        // console.log(data);
        $.ajax({
            method:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                // console.log(res);
                if(res.status!==0)return layer.msg('登录失败',{icon:5})
                layer.msg('登录成功',{icon:1})
                localStorage.setItem('token',res.token)
                location.href = 'index.html'
            }
        })
    })
})