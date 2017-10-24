/**
 * Created by alone on 2017/5/9.
 */
$(function () {
    var from_which = 0;
//            !!!!!旋转操作无论如何根据都是根据开始位置！！！
    $('.enter_password').hide(0);
    $('.flip_to_register').bind('click', function () {
        $('.enter_password').show(500);
        css3Transform(document.getElementsByClassName('login')[0], "translateZ(150px) rotateY(-90deg)");
        css3Transform(document.getElementsByClassName('register_page')[0], "rotateY(0deg)");
        css3Transform(document.getElementsByClassName('enter_password')[0], "translateZ(-150px) rotateY(90deg)");
        css3Transform(document.getElementsByClassName('forget_password')[0], "rotateY(-180deg)");
        $('.forget_password').hide(500);
    });
    $('.go_to_forget').bind('click', function () {
        $('.enter_password').show(500);
        css3Transform(document.getElementsByClassName('login')[0], "translateZ(-150px) rotateY(90deg)");
        css3Transform(document.getElementsByClassName('register_page')[0], "rotateY(-180deg)");
        css3Transform(document.getElementsByClassName('enter_password')[0], "translateZ(150px) rotateY(-90deg)");
        css3Transform(document.getElementsByClassName('forget_password')[0], "rotateY(0deg)");
        $('.register_page').hide(500);
    });

    $('.go_back_login_from_forget').bind('click', function () {
        $('.enter_password').hide(500);
        css3Transform(document.getElementsByClassName('login')[0], "translateZ(-150px) rotateY(0deg)");
        css3Transform(document.getElementsByClassName('register_page')[0], "rotateY(90deg)");
        css3Transform(document.getElementsByClassName('enter_password')[0], "translateZ(150px) rotateY(180deg)");
        css3Transform(document.getElementsByClassName('forget_password')[0], "rotateY(-90deg)");
        $('.register_page').show(500);
    });
    $('a.go_back_login').bind('click', function () {
        $('.forget_password').show(500);
        css3Transform(document.getElementsByClassName('login')[0], "translateZ(-150px) rotateY(0deg)");
        css3Transform(document.getElementsByClassName('register_page')[0], "rotateY(90deg)");
        css3Transform(document.getElementsByClassName('enter_password')[0], "translateZ(150px) rotateY(180deg)");
        css3Transform(document.getElementsByClassName('forget_password')[0], "rotateY(-90deg)");
        $('.enter_password').hide(500);
    });
    $('.forget_password_button').bind('click',function () {
        from_which = 2;
        $('.register_page').show(1000);
        css3Transform(document.getElementsByClassName('login')[0], "translateZ(-150px) rotateY(180deg)");
        css3Transform(document.getElementsByClassName('register_page')[0], "rotateY(-90deg)");
        css3Transform(document.getElementsByClassName('enter_password')[0], "translateZ(150px) rotateY(00deg)");
        css3Transform(document.getElementsByClassName('forget_password')[0], "rotateY(90deg)");
        $('.login').hide(1000);
        $('.confirm_register_button').html('Reset password');
    });
    $('.go_back_up').bind('click',function () {
        if(from_which==1) {
            $('.login').show(1000);
            css3Transform(document.getElementsByClassName('login')[0], "translateZ(-150px) rotateY(-90deg)");
            css3Transform(document.getElementsByClassName('register_page')[0], "rotateY(0deg)");
            css3Transform(document.getElementsByClassName('enter_password')[0], "translateZ(150px) rotateY(90deg)");
            css3Transform(document.getElementsByClassName('forget_password')[0], "rotateY(180deg)");
            $('.forget_password').hide(1000);
        }else  if(from_which==2) {
            $('.login').show(1000);
            css3Transform(document.getElementsByClassName('login')[0], "translateZ(-150px) rotateY(90deg)");
            css3Transform(document.getElementsByClassName('register_page')[0], "rotateY(180deg)");
            css3Transform(document.getElementsByClassName('enter_password')[0], "translateZ(150px) rotateY(-90deg)");
            css3Transform(document.getElementsByClassName('forget_password')[0], "rotateY(0deg)");
            $('.register_page').hide(1000);
        }
    });
    $('.login_icon').animate({width: '10%'}, 0);
    $('.password_icon').animate({width: '10%'}, 0);
    $('.input_username').bind('focus', function () {
        $('.login_icon').animate({width: '0%'}, 500);
    });
    $('.input_username').bind('blur', function () {
        $('.login_icon').animate({width: '10%'}, 500);
    });
    $('.input_password').bind('focus', function () {
        $('.password_icon').animate({width: '0%'}, 500);
    });
    $('.input_password').bind('blur', function () {
        $('.password_icon').animate({width: '10%'}, 500);
    });
    function css3Transform(element, value) {
        var arrPriex = ["o", "ms", "Moz", "webkit", ""];
        var length = arrPriex.length;
        for (var i = 0; i < length; i += 1) {
            element.style[arrPriex[i] + "Transform"]
                = value;
        }
    }
    $('.n_span').animate({width: '10%', height: '70%'}, 0);
    $('.register_phone_svg').animate({width: '10%'}, 0);
    $('.input_nickname').bind('focus', function () {
        $('.n_span').animate({width: '0%', height: '0%'}, 500);
        $('.n_span').html('');
    });
    $('.input_nickname').bind('blur', function () {
        $('.n_span').html('N');
        $('.n_span').animate({width: '10%', height: '70%'}, 500);
    });
    $('.register_input_phone').bind('focus', function () {
        $('.register_phone_svg').animate({width: '0%'}, 500);
    });
    $('.register_input_phone').bind('blur', function () {
        $('.register_phone_svg').animate({width: '10%'}, 500);
    });
    $('.first_enter_password_icon').animate({width: '10%'}, 0);
    $('.confirm_password_icon').animate({width: '10%'}, 0);
    $('.first_enter_password_input').bind('focus', function () {
        $('.first_enter_password_icon').animate({width: '0%'}, 500);
    });
    $('.first_enter_password_input').bind('blur', function () {
        $('.first_enter_password_icon').animate({width: '10%'}, 500);
    });
    $('.confirm_password_input').bind('focus', function () {
        $('.confirm_password_icon').animate({width: '0%'}, 500);
    });
    $('.confirm_password_input').bind('blur', function () {
        $('.confirm_password_icon').animate({width: '10%'}, 500);
    });

    $('.register_phone_svg').animate({width: '10%'}, 0);
    $('.forget_input_phone').bind('focus', function () {
        $('.register_phone_svg').animate({width: '0%'}, 500);
    });
    $('.forget_input_phone').bind('blur', function () {
        $('.register_phone_svg').animate({width: '10%'}, 500);
    });

    $('.login_button_div .login_button').click(function () {
        var user_input = $('.login .login_form .input_username');
        var user_name = user_input.val();
        var user_password = $('.login .login_form .input_password');
        var password = user_password.val();

        if (!testMail(user_name)) {
            layer.alert('请输入正确的邮箱', {
                skin: 'layui-layer-lan'
                ,closeBtn: 0
                ,anim: 4 //动画类型
                ,icon:5
            });
            return false;
        }
        if(password==null||password==""||password.length<6) {
            layer.alert('密码长度不正确', {
                skin: 'layui-layer-lan'
                ,closeBtn: 0
                ,anim: 2 //动画类型
                ,icon:5
            });
            return false;
        }
        var load = layer.load(1);
//                alert(user_name);
        $.ajax({
            url:"index/Login/checkUser",
            type:"post",
            data:{userName:user_name,password:password},
            success:function (data) {
                if (data==200) {
//                          登录之后禁止后退！！！
                    layer.close(load);
                    window.location.replace("home");
                }else {
                    layer.close(load);
                    layer.alert('账号或密码错误', {
                        skin: 'layui-layer-lan'
                        ,closeBtn: 0
                        ,icon:5
                    });
                }
            },
            error:function () {
                layer.close(load);
                layer.alert('未知的错误发生了', {
                    skin: 'layui-layer-lan'
                    ,closeBtn: 0
                    ,icon:5
                });
            }
        });
    });
    var isNickNameUse = false;
    $('.register_page .get_vcode .go_enter_password_button').attr("disabled", true);
    $('.register_page .get_vcode .go_enter_password_button').css({opacity: 0.5});
    var verCode = "";
    $('.get_vcode  .register_vcode_div .get_vcode_button').click(function () {
        var email_input = $('.register_phone_div .register_input_phone').val();
        var nickname = $('.get_vcode .nickname_div .input_nickname').val();
        if (email_input==null||email_input==""||!testMail(email_input)){
            layer.alert('请输入邮箱', {
                skin: 'layui-layer-lan'
                ,closeBtn: 0
                ,anim: 4 //动画类型
                ,icon:5
            });
            return false;
        }
        var load = layer.load(1);
        $.ajax({
            url:"index/SendEmail/send",
            data:{email:email_input},
            type:"post",
            dataType:"json",
            success:function (data) {
                if (data.code==200) {
                    $('.register_page .get_vcode .go_enter_password_button').attr("disabled", false);
                    $('.register_page .get_vcode .go_enter_password_button').css({opacity: 1});
                    verCode = data.ver;
                    layer.close(load);
                }else if (data.code==500){
                    layer.close(load);
                    layer.alert('邮件发送失败', {
                        skin: 'layui-layer-lan'
                        ,closeBtn: 0
                        ,icon:5
                    });
                    return false;
                }else if (data.code==404){
                    layer.close(load);
                    layer.alert('此邮箱已被注册', {
                        skin: 'layui-layer-lan'
                        ,closeBtn: 0
                        ,icon:5
                    });
                    return false;
                }
            },
            error:function () {
                layer.close(load);
                layer.alert('未知的错误发生了', {
                    skin: 'layui-layer-lan'
                    ,closeBtn: 0
                    ,icon:5
                });
                return false;
            }
        });
    });
    $('.register_page .get_vcode .nickname_div .input_nickname').bind("blur", function () {
        var nickname = $(this).val();
        if (nickname==""||nickname==null) {
            return false;
        }else {
            $.ajax({
                url:"index/Login/checkNickName",
                data:{nickname:nickname},
                type:"post",
                dataType:"json",
                success:function (data) {
                    if (data!=200) {
                        isNickNameUse = true;
                        layer.alert('该昵称已被占用', {
                            skin: 'layui-layer-lan'
                            ,closeBtn: 0
                        });
                    }else {
                        isNickNameUse = false;
                    }
                }
            });
        }
    });
    $('.register_page .get_vcode .go_enter_password_button').click(function () {
        var nickname = $('.register_page .get_vcode .nickname_div .input_nickname').val();
        if (nickname==null||nickname==""||isNickNameUse){
            layer.alert('输入的昵称已被占用或为空', {
                skin: 'layui-layer-lan'
                ,closeBtn: 0
            });
            return false;
        }
        var co = $('.register_page .register_vcode_div  .register_input_vcode').val();
        if (co==verCode) {
            from_which = 1;
            $('.forget_password').show(1000);
            css3Transform(document.getElementsByClassName('content')[0], "rotateY(-180deg)");
            $('.login').hide(1000);
            $('.confirm_register_button').html('注册');
        }else {
            layer.alert('验证码错误', {
                skin: 'layui-layer-lan'
                ,closeBtn: 0
            });
            return false;
        }
    });

    $('.confirm_password_content .login_button_div .confirm_register_button').click(function () {
        var first = $('.confirm_password_content .confirm_password_div .first_enter_password_input').val();
        var second = $('.confirm_password_content .confirm_password_div .confirm_password_input').val();
        var nickname = $('.register_page .get_vcode .nickname_div .input_nickname').val();
        var email_input = $('.register_page .register_phone_div .register_input_phone').val();
        if (first==null||first==""||first.length<6){
            layer.alert('密码长度不符', {
                skin: 'layui-layer-lan'
                ,closeBtn: 0
            });
            return false;
        }
        if (first!=second) {
            layer.alert('两次输入的密码不一致', {
                skin: 'layui-layer-lan'
                ,closeBtn: 0
            });
            return false;
        }
        if (from_which==1) {
            $.ajax({
                url:"index/Login/Register",
                data:{email:email_input,nickname:nickname,password:first},
                type:"post",
                dataType:"json",
                success:function (data) {
                    if (data.code==200) {
                        window.location.replace("home");
                    }else {
                        layer.alert('未知的错误发生了', {
                            skin: 'layui-layer-lan'
                            ,closeBtn: 0
                            ,icon:5
                        });
                    }
                },
                error:function () {
                    layer.alert('未知的错误发生了', {
                        skin: 'layui-layer-lan'
                        ,closeBtn: 0
                        ,icon:5
                    });
                }
            });
        }else {

        }
    });
    function testMail(data) {
        if (!data.match( /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)){
            return false;
        }else {
            return true;
        }
    }
});