/**
 * Created by alone on 2017/6/22.
 */
$(document).ready(function () {
    var which_background = 1;
    var current_tag = "";
    var isClickTag = false;
    $('#editer_content').bind('focus', function (e) {
        if ($('.showChooseSize').is(':visible')) {
            $('.showChooseSize').animate({height: "0px"}, 300)
            $('.showChooseSize').hide(0);
        }
        if ($('.showChooseColor').is(':visible')) {
            $('.showChooseColor').animate({height: "0px"}, 300)
            $('.showChooseColor').hide(0);
        }
    });
    $("#editer_chooser a").click(function (e) {
        var type = this.getAttribute('data-role');
        if (type == undefined) {
            return false;
        }
        switch (type) {
            case 'h2':
            case 'h3':
            case 'p':
                document.execCommand('FormatBlock', false, '<' + type + '>');
                break;
            case 'FontSize':
                showChooseSize(e);
                break;
            case 'FontColor':
                showChooseColor(e);
                break;
            default:
                document.execCommand(type, false, null);
                break;
        }
    });
    $('.showChooseSize a').click(function (e) {
        var type = this.getAttribute('data-role');
        if (type == undefined) {
            return false;
        }
        document.execCommand('FontSize', false, type);
    });

    function showChooseSize(e) {
        if ($('.showChooseSize').is(':visible')) {
            $('.showChooseSize').animate({height: "0px"}, 300)
            $('.showChooseSize').hide(0);
        } else {
            $('.showChooseSize').show(0);
            $('.showChooseSize').animate({height: "155px"}, 300);
        }
    }

    function showChooseColor(e) {
        if ($('.showChooseColor').is(':visible')) {
            $('.showChooseColor').animate({height: "0px"}, 300)
            $('.showChooseColor').hide(0);
        } else {
            $('.showChooseColor').show(0);
            $('.showChooseColor').animate({height: "88px"}, 300);
        }
    }

    $('.showChooseColor a').click(function (e) {
        var type = this.getAttribute('data-role');
        if (type == undefined) {
            return false;
        }
        document.execCommand('ForeColor', false, type);
    });
//            以下是获取图片并且显示。注意路径是浏览器缓存临时路径，不是本地路径
    var temp_1 = 1;
    bindChange();
    function upload(imageClass) {
//                        dataType text！！！ 哦还有，关了一下后台的代码调试
        $.ajaxFileUpload({
            url: 'index/BlogSave/getImageUpload',
            fileElementId: 'showUpload',
            secureuri: false,
            dataType: 'text',
            success: function (data, status) {
                var demo = jQuery.parseJSON(data);
                $(imageClass).attr("src", demo.path);
            },
            error: function (data, status, e) {
                alert(e);
            }
        });
        bindChange();
    }

    function bindChange() {
        $("#showUpload").change(function () {
            var objUrl = getObjectURL(this.files[0]);
            document.execCommand('insertImage', false, objUrl);
            $('#editer_content img').each(function (i) {
                if (this.getAttribute('class') == undefined) {
                    $(this).addClass('demo' + temp_1);
                    $('.demo' + temp_1).css({width: '30%'});
                    var tem = '.demo' + temp_1;
                    upload(tem);
                    temp_1++;
                }
            });
        });
    }

    // 获取图片的url。是临时文件
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }

    $('.submit_button').click(function () {
        var content = $('#editer_content').html();
        var getText = $('#editer_content').text();
        var title = $('.one_enter_content .blog_title_input').val();
        var description = $('.one_enter_content .blog_description_input').val();
        if (title == "") {
            layer.tips('博客标题不能为空',
                $('.one_enter_content .blog_title_input'), {
                    tips: [2, '#494949'],
                    time: 3000
                });
            return false;
        }
//                先去除空格和换行符判断字符串 是否为空，空的话就禁止发表
        getText = getText.replace(/[\r\n]/g, "");
        getText = getText.replace(/[ ]/g, "");
        if (getText == "" || getText == null) {
            layer.tips('博客内容总不能为空吧',
                $('#editer_content'), {
                    tips: [1, '#3595CC'],
                    time: 3000
                });
            return false;
        }
        $.ajax({
            url: 'index/BlogSave/uploadBlogContent',
            async: true,
            type: 'post',
            data: {
                title: title, description: description, content: content,
                background_id: which_background,tags:current_tag
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    window.location.href = "home";
                } else {
                    layer.msg('发表失败');
                }
            },
            error: function () {
                layer.msg('发表失败');
            }
        });
    });
    $('.choose_background_button').on("click", function () {
        var background_layer = layer.open({
            type: 1,
            skin: 'layui-layer-demo', //样式类名//不显示关闭按钮
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            area: ['620px', '580px'],
            title: "选择背景图",
            content: $('.background_img_div'),
            btn: ['确认', '取消'],
            btn1:function () {
                $('.one_enter_content .background_result').html("当前选中第"+
                    which_background+"张背景图片");
                layer.close(background_layer);
            }
        });
    });
    $('.background_img_div img').on("click", function () {
        $(this).css({border: "4px solid slateblue"});
        which_background = $(this).attr('class');
//                alert(which_background);
        $('.background_img_div img').each(function () {
            if ($(this).attr('class') != which_background) {
                $(this).css({border: "none"});
            }
        });
    });
    $('.choose_tag_button').on("click", function () {
        $('.add_tag_and_cancel .add_tag_div .add_tag_button').html("添加标签");
        $('.add_tag_and_cancel .add_tag_div .add_tag_button').css({transform: "rotateX(0deg)"});
        $('.add_tag_and_cancel .add_tag_div .tag_content').hide(0);
        $('.add_tag_and_cancel .add_tag_div .tag_content').css({width: 0});
        isClickTag = false;
        var tag_layer = layer.open({
            type: 1,
            skin: 'layui-layer-demo', //样式类名//不显示关闭按钮
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            title: "选择标签",
            content: $('.blog_tag_div'),
            btn: ['确认', '取消'],
            btn1: function () {
                var result = "";
                $('.blog_tag_div span').each(function () {
                    if ($(this).hasClass("has_click")) {
                        result += $(this).text() + ",";
                    }
                });
                $('.one_enter_content .tag_result').html(result);
                layer.close(tag_layer);
                current_tag = "";
                $('.blog_tag_div span').each(function () {
                    if ($(this).hasClass("has_click")) {
                        current_tag += $(this).attr("data-role") + ",";
                    }
                });
            },
            btn2: function () {
                var arr = current_tag.split(",");
                var temp = 0;
                $('.blog_tag_div span').each(function () {
                    var data = $(this).attr("data-role");
                    if (data == arr[temp]) {
                        $(this).addClass("has_click");
                        temp++;
                    } else {
                        $(this).removeClass("has_click");
                    }
                });
            }, cancel: function () {
                var arr = current_tag.split(",");
                var temp = 0;
                $('.blog_tag_div span').each(function () {
                    var data = $(this).attr("data-role");
                    if (data == arr[temp]) {
                        $(this).addClass("has_clcik");
                        temp++;
                    } else {
                        $(this).removeClass("has_click");
                    }
                });
            }
        });
    });
    $('.blog_tag_div span').click(function () {
        if ($(this).hasClass("has_click")) {
            $(this).removeClass("has_click");
        } else {
            $(this).addClass("has_click");
        }
    });
    $('.blog_tag_div .add_tag_and_cancel .cancel_choose_tag_button').click(function () {
        $('.blog_tag_div span').each(function () {
            if ($(this).hasClass("has_click")) {
                $(this).removeClass("has_click");
            }
        });
    });
    $('.add_tag_and_cancel .add_tag_div .add_tag_button').on("click",function () {
        if (isClickTag) {
            var tag = $('.add_tag_and_cancel .add_tag_div .tag_content').val();
            if (tag==""){
                layer.msg("不能添加空标签",{time:1000});
                return false;
            }
            $.ajax({
                url:"index/BlogSave/addTag",
                data:{tag:tag},
                type:"post",
                success:function (data) {
                    if (data!="error"&&data!="ex") {
                        var result = "<span data-role='" + data + "'>" + tag + "</span>";
                        $('.layui-layer-content .blog_tag_div span:last').after(result);
                        $('.add_tag_and_cancel .add_tag_div .tag_content').val("");
                        $('.layui-layer-content .blog_tag_div span:last').click(function () {
                            if ($(this).hasClass("has_click")) {
                                $(this).removeClass("has_click");
                            } else {
                                $(this).addClass("has_click");
                            }
                        });
                    }else if (data=="ex"){
                        layer.msg("该标签已存在",{time:1000});
                    }
                }
            });
        }else {
            isClickTag = true;
            $('.add_tag_and_cancel .add_tag_div .tag_content').show(0);
            $('.add_tag_and_cancel .add_tag_div .tag_content').animate({width: "180"}, 500);
            $(this).css({transform: "rotateX(360deg)"});
            $(this).html("确定");
        }
    });
});
var app = angular.module("myNoteApp", []);
app.controller("blogDesrc", function ($scope) {
    $scope.message = "";
    $scope.inputMessage = "";
    $scope.left = function () {
        return 60 - $scope.message.length;
    };
    $scope.inputModel = function () {
        return 15 - $scope.inputMessage.length;
    };
});