/**
 * Created by alone on 2017/6/5.
 */
$(function () {
    //            预加载，加载完毕显示主页面
    //            判断所有的img都加载完成，必须是Deferred对象
    initPage();
    var defereds = [];
    $("img").each(function() {
        var dfd = $.Deferred();
        $(this).load(dfd.resolve);
        defereds.push(dfd);
    });
    $.when.apply(null, defereds).done(function() {
        $('#loading-center-absolute').animate({left:"-20%", "opacity":0},3000,function () {
            $('.timeline_content').show(0);
            $('#loading').animate({opacity: 0}, 300,function (){
                $('#loading').hide(0);
            });
        });
    });

//            滚动显示回到顶部按钮
    var isMove = false;
    $(window).scroll(function () {
        if (isMove) {
            return false;
        }
        var height = $(window).height();
        var scrollY = $(this).scrollTop();
        if (scrollY<300||scrollY==0){
            isMove = true;
            var read = (height + 120) + "px";
            if (read==$('.to_top').css('top')) {
                isMove = false;
                return false;
            }
            $('.to_top').animate({top:read},600,function () {
                isMove = false;
            });
        }
        else if (scrollY>700) {
            isMove = true;
            var read = (height - 90) + "px";
            if (read==$('.to_top').css('top')) {
                isMove = false;
                return false;
            }
            $('.to_top').animate({top:read},600,function () {
                isMove = false;
            });
        }
    });

    $('.to_top').click(function () {
        $('body,html').animate({scrollTop: 0}, 1000);
    });

//            分页按钮jQ代码
    bindTimeClick();
    bindPageClick();
    function initPage() {
        var total = parseInt($('.timeline_content').attr("id"));
        var per_page = parseInt($('.timeline_content').attr("data-role"));
        var pageSum = 1;
        if (total==0) {
            pageSum = 1;
        }else{
            if (total%per_page==0) {
                pageSum = total / per_page;
            }else {
                pageSum = parseInt(total / per_page) + 1;
            }
        }
        if (pageSum < 4) {
            var paginationHtml = "";
            for (i = 1; i <= pageSum; i++) {
                if (i == 1) {
                    paginationHtml += "<div class='current'><span>"
                        + i+ "</span></div>";
                }else {
                    paginationHtml += "<div ><span>"
                        +i+ "</span></div>";
                }
            }
            $('.pagination_page').html(paginationHtml);
            var width = $('body').css('width');
            var realWith = parseInt(width.substr(0, width.length - 2));
            if (realWith>767) {
                var tempP = 40 + (4 - pageSum) * 2.1;
                $('.my_pagination').css({"margin-left":tempP+"%"});
            }
            bindPageClick();
        }
        $('.left_turn').click(function () {
            var current = $('.current');
            var page = current.children("span").html();
            page = parseInt(page);
            var nextSum = current.nextAll().length;
            if (page == 1) {
                return false;
            }
            if (nextSum == 2) {
                if (page - 1 > 1) {
                    $('.pagination_page').children(":last")
                        .animate({width: "0px", opacity: 0}, 300, function () {
                            $(this).remove();
                        });
                    var html = "<div style='width: 0px;opacity: 0'><span>"
                        + (page - 2) + "</span></div>";
                    $('.pagination_page').children(":first").before(html);
                    $('.pagination_page').children(":first")
                        .animate({width: "60px", opacity: 1}, 300);
                    bindPageClick();
                }
            }
            if (nextSum == 3) {
                $('.pagination_page').children(":last")
                    .animate({width: "0px", opacity: 0}, 300, function () {
                        $(this).remove();
                    });
                var html = "<div style='width: 0px;opacity: 0'><span>"
                    + (page - 1) + "</span></div>";
                $('.pagination_page').children(":first").before(html);
                $('.pagination_page').children(":first")
                    .animate({width: "60px", opacity: 1}, 300);
                bindPageClick();
            }
            current.prev().addClass("current");
            current.removeClass("current");
            changeTimeLine();
        });
        $('.right_turn').click(function () {
            var current = $('.current');
            var page = current.children("span").html();
            page = parseInt(page);
            var nextSum = current.nextAll().length;
            if (page == pageSum) {
                return false;
            }
            if (nextSum == 1) {
                if (page + 1 < pageSum) {
                    $('.pagination_page').children(":first")
                        .animate({width: "0px", opacity: 0}, 400, function () {
                            $(this).remove();
                        });
                    var html = "<div style='width: 0px;opacity: 0'><span>"
                        + (page + 2) + "</span></div>";
                    $('.pagination_page').append(html);
                    $('.pagination_page').children(":last")
                        .animate({width: "60px", opacity: 1}, 400);
                    bindPageClick();
                }
            }
            if (nextSum == 0) {
                if (page != pageSum) {
                    $('.pagination_page').children(":first")
                        .animate({width: "0px", opacity: 0}, 400, function () {
                            $(this).remove();
                        });
                    var html = "<div style='width: 0px;opacity: 0'><span>"
                        + (page + 1) + "</span></div>";
                    $('.pagination_page').append(html);
                    $('.pagination_page').children(":last")
                        .animate({width: "60px", opacity: 1}, 400);
                    bindPageClick();
                }
            }
            current.next().addClass("current");
            current.removeClass("current");
            changeTimeLine();
        });
    }
    function bindPageClick() {
        $('.pagination_page div span').click(function () {
            $('.current').removeClass("current");
            $(this).parent().addClass("current");
            changeTimeLine();
        });
    }

//            ajax刷新时间轴数据
    function changeTimeLine() {
        var load =  layer.load(3);
        var page = parseInt($('.current').children("span").html());
        $('.timeline_content').animate({opacity: 0.5}, 0);
        $.ajax({
            url:'index/TimeLine/getPageById',
            type:'post',
            data:{page:page},
            dataType:'json',
            async:true,
            success:function (data) {
                var code = data.code;
                if(code==200) {
                    var blogs = data.blogs.data;
                    var myHtml = "";
                    for (i=0;i<blogs.length;i++) {
                        var blog = blogs[i];
                        var whichTurn = "";
                        var whichArrow = "";
                        var whichEffect = (i % 4) + 1;
                        var whichTips = "left";
                        if (i%2==0) {
                            whichTurn = "left_blog";
                            whichArrow = "arrow-left";
                            whichTips = "left";
                        }else {
                            whichTurn = "right_blog";
                            whichArrow = "arrow-right";
                            whichTips = "right";
                        }
                        myHtml +=
                            "<div class="+whichTurn+" data-role="+blog.id+">" +
                            "<div class='content'><figure class='effect_" +
                            whichEffect+"'><img src='img/blog_background/"+blog.background_id+".jpg'/> <figcaption><h2>" +
                            blog.title+"</h2><p>"+blog.description+"</p></figcaption></figure></div><div class=" +
                            whichArrow+"></div><div class='time_content' data-role="+whichTips
                            +"><div class='time' data-role="+blog.detail_time+"><span>" +
                            blog.day+"<sup>"+blog.sup+"</sup></span><span>" +
                            blog.month+"</span><span>" +
                            blog.year+"</span></div> <div class='line'></div></div></div>"
                    }
                    $('.timeline_content').html(myHtml);
                    $('.timeline_content').animate({opacity: 1}, 400,function () {
                        layer.close(load);
                    });
                    var height =  $('body').css('height');
                    var realHeight = parseInt(height.substr(0, height.length - 2));
                    $('body,html').animate({scrollTop: realHeight}, 400);
                    bindTimeClick();
                }else {
                    layer.close(load);
                    layer.msg('发生了不可知的错误', {icon: 5});
                }
            },
            error:function () {
                layer.close(load);
                layer.msg('发生了不可知的错误', {icon: 5});
            }
        });
    }
//            绑定时间的点击事件，弹出提示框显示具体时间
    function bindTimeClick() {
        $('.timeline_content .time').click(function () {
            var width = $('body').css('width');
            var realWith = parseInt(width.substr(0, width.length - 2));
            var detail = $(this).attr('data-role');
            var which = $(this).parent().attr('data-role');
            if (realWith>767) {
                if (which=='left'){
                    $(this).click(function () {
                        layer.tips(detail, $(this), {tips: [4, '#00b19e']});
                    });
                }else {
                    $(this).click(function () {
                        layer.tips(detail, $(this), {tips: [2]});
                    });
                }
            }else {
                $(this).click(function () {
                    layer.tips(detail, $(this), {tips: [2]});
                });
            }
        });
    }
});