$(function(){
    var layer = layui.layer;
    getuserinfo()
    $('#logout').on('click',function(){
        layer.confirm('您确定要退出吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href='login.html'
            layer.close(index);
          })
    })
})
function getuserinfo(){
    $.ajax({
        url:'/my/userinfo',
        method:'get',
        success:function(res){
            // console.log(res);
            if(res.status!==0){
                return layer.msg('获取数据失败',{icon:5})
            }
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     console.log(res)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //       localStorage.removeItem('token')
        //       location.href = '/login.html'
        //     }
        //   }
    })
}
function renderAvatar(user){
    var uname = user.nickname || user.username ;
   $('#welcome').html(`欢迎 ${uname}`);
   var first = uname[0].toUpperCase()
   if(user.user_pic == null){
       $('.text-avatar').html(first);
       $('.layui-nav-img').hide()
   }else{
    $('.layui-nav-img').attr('src',user.user_pic);
    $('.text-avatar').hide()
   }
}
