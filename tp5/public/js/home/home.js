/**
 * Created by alone on 2017/6/9.
 */
$(function () {
//            判断如果是小于800，直接return
    var isClickMenu = false;
    var isChangeTitle = false;
    var isHideTitle = false;
    $(window).scroll(function () {
        if (getBodyWidth() <= 800) {
            return false;
        }
        var isTopVisiable = $('.top_nav_content').is(":visible");
        $('.next_title_content').css({position: "fixed"});
        var scrollTop = $(this).scrollTop();
        if (!isClickMenu) {
            if (isTopVisiable) {
                if (scrollTop <= 343) {
                    if (scrollTop > 253) {
                        clearAllTime();
                    }
                    $('.next_title_content').css({top: (343 - scrollTop)});
                }
                if (scrollTop >= 343) {
                    $('.next_title_content').css({top: 0});
                }
            } else {
                if (scrollTop <= 90) {
//                            clearAllTime();
                    $('.next_title_content').css({top: (90 - scrollTop)});
                }
                if (scrollTop >= 90) {
                    $('.next_title_content').css({top: 0});
                }
            }
        }
        if (isTopVisiable) {
            if (scrollTop >= 343) {
                if (!isChangeTitle) {
                    clearAllTime();
                    $('.active_desc').css({opacity: 0, color: "#00b19e"});
                    $('.active_desc').html("<span>xyf的个人主页</span>");
                    $('.active_desc').animate({opacity: 1}, 700, function () {
                        isHideTitle = true;
                    });
                    $('.show_blog_name').animate({opacity: 0}, 700);
                    isChangeTitle = true;
                }
            } else {
                if (isHideTitle) {
                    $('.active_desc').animate({opacity: 0}, 700, function () {
                        isChangeTitle = false;
                    });
                    $('.show_blog_name').animate({opacity: 1}, 600);
                    isHideTitle = false;
                }
            }
        } else {
            if (scrollTop >= 90) {
                if (!isChangeTitle) {
                    clearAllTime();
                    $('.active_desc').css({opacity: 0, color: "#00b19e"});
                    $('.active_desc').html("<span>xyf的个人主页</span>");
                    $('.active_desc').animate({opacity: 1}, 500, function () {
                        isHideTitle = true;
                    });
                    $('.show_blog_name').animate({opacity: 0}, 500);
                    isChangeTitle = true;
                }
            } else {
                if (isHideTitle) {
                    $('.active_desc').animate({opacity: 0}, 500, function () {
                        isChangeTitle = false;
                    });
                    $('.show_blog_name').animate({opacity: 1}, 500);
                    isHideTitle = false;
                }
            }
        }
        if (isTopVisiable) {
            if (scrollTop <= 360) {
                $('.tag_nav').css({top: (530 - scrollTop)});
            }
        } else {
            if (scrollTop <= 160) {
                $('.tag_nav').css({top: (280 - scrollTop)});
            }
        }
    });
    var isShow = false;
//            点击导航栏按钮，如果小于800，显示左侧的导航栏，大于800显示顶部的
    $('.menu').click(function () {
        var isVis = $('.top_nav_content').is(":visible");
        if (isVis) {
//                    $('.next_title_content').css({position: "relative"});
            var time = $('body,html').scrollTop();
            $('body,html').animate({scrollTop: 0}, parseInt(time), function () {
                $('.menu .ham').css({
                    "background-color": "#00b19e",
                    transform: "rotateZ(0deg)", top: "16px", height: "1.5px"
                });
                $('.menu').removeClass("final");
                $('.top_nav_content').animate({height: "0px"}, 500, function () {
                    $('.top_nav_content').hide();
                });
                $('.next_title_content').animate({top: 90}, 550);
                $('.tag_nav').animate({top: 260}, 550);
            });
            $('body').css({"background-color": "white"});
            $('.next_title_content').css({"background-color": "white", opacity: 1});
        } else {
            if (getBodyWidth() > 800) {
                var time = $('body,html').scrollTop();
                $('body,html').animate({scrollTop: 0}, parseInt(time), function () {
                    $('.menu .ham').css({
                        "background-color": "transparent",
                        transform: "rotateZ(-45deg)", top: "8px"
                    });
                    $('.menu').addClass("final");
                    $('.top_nav_content').show(0);
                    $('.tag_nav').animate({top: 510}, 550);
                    $('.next_title_content').animate({top: 343}, 550);
                    $('.top_nav_content').animate({height: "250px"}, 550);
                });
            }
            $('body').css({"background-color": "white"});
            $('.next_title_content').css({"background-color": "white", opacity: 1});
        }
        if (getBodyWidth() <= 800) {
            var left_px = $('.small_left_nav').css('left');
            var left = parseInt(left_px.substr(0, left_px.length - 2));
            if (left < 0) {
//                        先将它放在一个靠近的位置
                var width = $('.small_left_nav').css('width').substr(0,
                    $('.small_left_nav').css('width').length - 2);
                var to_left = parseInt(width) + 60;
                var final = (-to_left);
                $('.small_left_nav').css({left: final});
//                        载入
                $('.small_left_nav').animate({left: "0%"}, 500, function () {
                    isShow = true;
                });
//                        开始变换图标
                $('.menu .ham').css({
                    "background-color": "transparent",
                    transform: "rotateZ(-45deg)", top: "8px"
                });
                $('.menu').addClass("final");
                $('body').css({"background-color": "rgba(0,0,0,0.2)"});
                $('.next_title_content').css({"background-color": "rgba(0,0,0,0.01)", opacity: 0.4});
            } else {
//                        这里用处不大，因为监听了整个html
                $('.menu .ham').css({
                    "background-color": "#00b19e",
                    transform: "rotateZ(0deg)", top: "16px", height: "1.5px"
                });
                $('.menu').removeClass("final");
                var width = $('.small_left_nav').css('width');
                var to_left = parseInt(width.substr(0, width.length - 2)) + 60;
                var final = (-to_left) + "px";
                $('.small_left_nav').animate({left: final}, 500, function () {
                    $('.small_left_nav').css({left: "-72%"});
                });
                $('body').css({"background-color": "white"});
                $('.next_title_content').css({"background-color": "white", opacity: 1});
            }
        }
    });

//            点击之后，显示侧边栏的标签选项
    $('.left_menu_icon').click(function () {
        var bodyWidth = getBodyWidth();
        ;
        var left_menu_icon_left = parseInt($('.tag_nav').css('left')) +
            parseInt($('.tag_nav').css('width'));
        var nav_width = parseInt($('.tag_nav').css('width'));
        if (left_menu_icon_left > bodyWidth) {
            $('.tag_content').show();
            var result = (bodyWidth - nav_width - 30);
            $('.tag_nav').css({"background-color": "white", "box-shadow": "1px 1px 10px rgba(0,0,0,0.2)"});
            $('.tag_nav').animate({left: result}, 500, function () {

            });
            $('.left_menu_icon').addClass("left_menu_click");
        } else {
            $('.left_menu_icon').removeClass("left_menu_click");
            var result = (bodyWidth - 40);
            $('.tag_nav').animate({left: result}, 1000, function () {
                $('.tag_content').hide();
                $('.tag_nav').css({"background-color": "transparent", "box-shadow": ""});
            });
        }
    });
    var isFrom_1 = false;
//            resize，浏览器变化
    $(window).resize(function () {
        if (getBodyWidth() < 1083) {
            var bodyWidth = getBodyWidth();
            var left_menu_icon_left = parseInt($('.tag_nav').css('left')) +
                parseInt($('.tag_nav').css('width'));
            var nav_width = parseInt($('.tag_nav').css('width'));
            if (isFrom_1) {
                $('.left_menu_icon').removeClass("left_menu_click");
                var result = bodyWidth - 40;
                $('.tag_nav').css({left: result});
                $('.tag_content').hide();
            } else {
                if (left_menu_icon_left > bodyWidth) {
                    $('.left_menu_icon').removeClass("left_menu_click");
                    var result = (bodyWidth - 40);
                    $('.tag_nav').css({left: result});
                    $('.tag_content').hide();
                } else {
                    var result = (bodyWidth - nav_width - 30);
                    $('.tag_nav').css({left: result});
                    $('.left_menu_icon').addClass("left_menu_click");
                }
            }
            isFrom_1 = false;
        } else {
            if (isFrom_1) {
                return false;
            }
            $('.tag_content').show();
            $('.tag_nav').css({left: "78%"});
            isFrom_1 = true;
        }
    });
//            点击之后，隐藏左侧导航栏
    $('html').click(function (e) {
        var width = $('.small_left_nav').css('width');
        if (e.clientX > parseInt(width.substr(0, width.length - 2))) {
            var to_left = parseInt(width.substr(0, width.length - 2)) + 60;
            if (isShow) {
                var final = (-to_left) + "px";
                $('.menu .ham').css({
                    "background-color": "#00b19e",
                    transform: "rotateZ(0deg)", top: "16px", height: "1.5px"
                });
                $('.menu').removeClass("final");
                $('.small_left_nav').animate({left: final}, 500, function () {
                    $('.small_left_nav').css({left: "-72%"});
                });
                $('body').css({"background-color": "white"});
                $('.next_title_content').css({"background-color": "white", opacity: 1});
                isShow = false;
            }
        }
    });

    function getBodyWidth() {
        var width = parseInt($('body').css('width').substr(0, $('body').css('width').length - 2));
        return width;
    }

    var arr = ["这里可以看到的是我的博客", "实际上也没什么好看的"];
    var which = 0;
    var shuxian_temp = 1;
    var shuxian_interval = setInterval(function () {
        if (shuxian_temp % 2 == 0) {
            $('.shuxian').css({opacity: 0});
        } else {
            $('.shuxian').css({opacity: 1});
        }
        shuxian_temp++;
    }, 300);
    var type_timeout = setTimeout(startTypeing, 2000);
    var type_interval = null;
    var delete_timeout = null;

    function startTypeing() {
        if (which == 2) {
            clearAllTime();
            $('.shuxian').remove();
            return false;
        }
        var my_typeing = arr[which];
        var i = 0;
        type_interval = setInterval(function () {
            $('.shuxian').before("<span>" + my_typeing.charAt(i) + "</span>");
            i++;
            if (i == my_typeing.length) {
                clearInterval(type_interval);
                delete_timeout = setTimeout(startDeleting, 2000);
            }
        }, 280);
    }

    var deleteInterval = null;

    function startDeleting() {
        var demo = arr[which % 2].length - 1;
        deleteInterval = setInterval(function () {
            $('.shuxian').prev().remove();
            demo--;
            if (demo < 0) {
                which++;
                clearInterval(deleteInterval);
                type_timeout = setTimeout(startTypeing, 2000);
            }
        }, 250);
    }

    function clearAllTime() {
        clearInterval(deleteInterval);
        clearInterval(shuxian_interval);
        clearInterval(type_interval);
        clearTimeout(delete_timeout);
        clearTimeout(type_timeout);
    }

    initPage();
    bindPageClick();
    function initPage() {
        var total = parseInt($('.blog_content').attr("id"));
        var per_page = parseInt($('.blog_content').attr("data-role"));
        var pageSum = 1;
        if (total == 0) {
            pageSum = 1;
        } else {
            if (total % per_page == 0) {
                pageSum = total / per_page;
            } else {
                pageSum = parseInt(total / per_page) + 1;
            }
        }
        if (pageSum < 4) {
            var paginationHtml = "";
            for (i = 1; i <= pageSum; i++) {
                if (i == 1) {
                    paginationHtml += "<li class='current'>" + i +
                        "</li>";
                } else {
                    paginationHtml += "<li>" + i +
                        "</li>";
                }
            }
            $('.pagination_div .number_li_div').html(paginationHtml);
            bindPageClick();
        }
        $('.to_prev').click(function () {
            var current = $('.pagination_div .number_li_div .current');
            var page = current.html();
            page = parseInt(page);
            var nextSum = current.nextAll().length;
            if (page == 1) {
                return false;
            }
            if (nextSum == 2) {
                if (page - 1 > 1) {
                    $('.pagination_div  .number_li_div').children(":last").remove();
                    var html = "<li>"
                        + (page - 2) + "</li>";
                    $('.pagination_div .number_li_div').children(":first").before(html);
                    bindPageClick();
                }
            }
            if (nextSum == 3) {
                $('.pagination_div .number_li_div').children(":last").remove();
                var html = "<li>"
                    + (page - 1) + "</li>";
                $('.pagination_div  .number_li_div').children(":first").before(html);
                bindPageClick();
            }
            current.prev().addClass("current");
            current.removeClass("current");
            changeTimeLine();
        });
        $('.to_next').click(function () {
            var current = $('.pagination_div  .number_li_div .current');
            var page = current.html();
            page = parseInt(page);
            var nextSum = current.nextAll().length;
            if (page == pageSum) {
                return false;
            }
            if (nextSum == 1) {
                if (page + 1 < pageSum) {
                    $('.pagination_div  .number_li_div').children(":first").remove();
                    var html = "<li>"
                        + (page + 2) + "</li>";
                    $('.pagination_div  .number_li_div').append(html);
                    bindPageClick();
                }
            }
            if (nextSum == 0) {
                if (page != pageSum) {
                    $('.pagination_div  .number_li_div').children(":first").remove();
                    var html = "<li>"
                        + (page + 1) + "</li>";
                    $('.pagination_div  .number_li_div').append(html);
                    bindPageClick();
                }
            }
            current.next().addClass("current");
            current.removeClass("current");
            changeTimeLine();
        });
    }

    function bindPageClick() {
        $('.pagination_div .number_li_div li').click(function () {
            $('.pagination_div .number_li_div li.current').removeClass("current");
            $(this).addClass("current");
            changeTimeLine();
        });
    }

    function changeTimeLine() {
        var load = layer.load(3);
        $('body').animate({opacity: 0.5}, 0);
        var page = parseInt($('.pagination_div .number_li_div li.current').html());
        $.ajax({
            url: "index/Home/getNextPage",
            data: {page: page},
            type: "post",
            dataType: "json",
            success: function (data) {
                var code = data.code;
                if (code == 200) {
                    var blogs = data.blogs.data;
                    var myHtml = "";
                    for (i = 0; i < blogs.length; i++) {
                        var blog = blogs[i];
                        myHtml += "<div class='a_blog' data-role=" + blog.id + "><div class='blog_background'>"
                            + "<img src='img/blog_background/" + blog.background_id + ".jpg' width='100%'>"
                            + "<p>" + blog.description + "</p></div><div class='blog_title_div'>"
                            + "<h2 class='blog_title'>" + blog.title + "</h2>"
                            + "<h5 class='blog_time'>" + blog.my_time + "</h5></div> </div>";
                    }
                    $('.blog_content').html(myHtml);
                    var height = parseInt($('body').css('height'));
                    $('body').animate({scrollTop: height, opacity: 1}, 400, function () {
                        layer.close(load);
                    });
                } else {
                    layer.close(load);
                    layer.msg('发生了不可知的错误', {icon: 5});
                }
            },
            error: function () {
                layer.close(load);
                layer.msg('发生了不可知的错误', {icon: 5});
            }
        });
    }

});