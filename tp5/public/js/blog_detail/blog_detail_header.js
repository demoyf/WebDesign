/**
 * Created by alone on 2017/6/11.
 */
$(function () {

    //            判断如果是小于800，直接return
    var isClickMenu = false;
    var isChangeTitle = false;
    var isHideTitle = false;
    $(window).scroll(function () {
        if (getBodyWidth() <= 783) {
            return false;
        }
        var isTopVisiable = $('.top_nav_content').is(":visible");
        $('.next_title_content').css({position: "fixed"});
        var scrollTop = $(this).scrollTop();
        if (!isClickMenu) {
            if (isTopVisiable) {
                if (scrollTop <= 343) {
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
                    $('.active_desc').css({opacity: 0, color: "#00b19e"});
                    $('.active_desc').html("<span>xyf的个人主页</span>");
                    $('.active_desc').animate({opacity: 1}, 700, function () {
                        isHideTitle = true;
                    });
                    $('.show_blog_name span').animate({opacity: 0}, 700);
                    isChangeTitle = true;
                }
            } else {
                if (isHideTitle) {
                    $('.active_desc').animate({opacity: 0}, 700, function () {
                        isChangeTitle = false;
                    });
                    $('.show_blog_name span').animate({opacity: 1}, 600);
                    isHideTitle = false;
                }
            }
        } else {
            if (scrollTop >= 90) {
                if (!isChangeTitle) {
                    $('.active_desc').css({opacity: 0, color: "#00b19e"});
                    $('.active_desc').html("<span>xyf的个人主页</span>");
                    $('.active_desc').animate({opacity: 1}, 500, function () {
                        isHideTitle = true;
                    });
                    $('.show_blog_name span').animate({opacity: 0}, 500);
                    isChangeTitle = true;
                }
            } else {
                if (isHideTitle) {
                    $('.active_desc').animate({opacity: 0}, 500, function () {
                        isChangeTitle = false;
                    });
                    $('.show_blog_name span').animate({opacity: 1}, 500);
                    isHideTitle = false;
                }
            }
        }
        if (isTopVisiable) {
            if (scrollTop <= 360) {
                $('.tag_nav').css({top: (530 - scrollTop)});
            }
            if (scrollTop<=253) {
                $('.blog_content_and_nav .blog_info').css({top: (253-scrollTop)});
                $('.blog_content_and_nav .blog_list').css({top: (433-scrollTop)});
                $('.blog_content_and_nav .blog_list .block_move').css({top:(483-scrollTop)});
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
            var time = parseInt($('body,html').scrollTop());
            if (time>1500) {
                time = 1500;
            }
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
                $('.blog_content_and_nav .blog_info').animate({top: 0},550);
                $('.blog_content_and_nav .blog_list').animate({top: 180}, 550);
                $('.blog_content_and_nav .blog_list .block_move').animate({top:(230)},550);
            });
            $('body').css({"background-color": "white"});
            $('.next_title_content').css({"background-color": "white", opacity: 1});
        } else {
            if (getBodyWidth() > 783) {
                var time = parseInt($('body,html').scrollTop());
                if (time>1500) {
                    time = 1500;
                }
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
                    if ($('.blog_content_and_nav .blog_info').is(":visible")){
                        $('.blog_content_and_nav .blog_info').animate({top: 253},550);
                        $('.blog_content_and_nav .blog_list').animate({top: 433}, 550);
                        $('.blog_content_and_nav .blog_list .block_move').animate({top:(483)},550);
                    }
                });
            }
            $('body').css({"background-color": "white"});
            $('.next_title_content').css({"background-color": "white", opacity: 1});
        }
        if (getBodyWidth() <= 783) {
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
                $('.blog_comment_time_content .comment_content .a_comment')
                    .css({"background-color": "rgba(0,0,0,0.5)", opacity: 0.4});

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
                $('.blog_comment_time_content .comment_content .a_comment')
                    .css({"background-color": "transparent", opacity: 1});
            }
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
                $('.blog_comment_time_content .comment_content .a_comment')
                    .css({"background-color": "transparent", opacity: 1});
                isShow = false;
            }
        }
    });

    function getBodyWidth() {
        var width = parseInt($('body').css('width').substr(0, $('body').css('width').length - 2));
        return width;
    }
});