/**
 * Created by alone on 2017/6/23.
 */
$(function () {
    initPage();
    bindPageClick();
    bindDeleteAndTopClick();
    function initPage() {
        var total = parseInt($('.table_blog_info').attr("data-role"));
        var per_page = parseInt($('.table_blog_info table').attr("data-role"));
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
            changeTable();
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
            changeTable();
        });
    }

    function bindPageClick() {
        $('.pagination_div .number_li_div li').click(function () {
            $('.pagination_div .number_li_div li.current').removeClass("current");
            $(this).addClass("current");
            changeTable();
        });
    }

    function changeTable() {
        var load = layer.load(3);
        var page = $('.pagination_div .number_li_div li.current').html();
        var per_page = parseInt($('.table_blog_info table').attr("data-role"));
        $.ajax({
            url: "index/Manage/getManageNext",
            type: "post",
            data: {page: page},
            dataType: "json",
            success: function (data) {
                if (data.code == 500) {
                    layer.close(load);
                    layer.msg('加载失败', {icon: 5});
                    return false;
                }
                var blogs = data.data;
                var result = "<tr class='table_head'><th>#</th> <th>博客名</th> <th>发表时间</th> <th>标签</th> <th>删除</th> <th>置顶</th> </tr>";
                for (i = 0; i < blogs.length; i++) {
                    var blog = blogs[i];
                    result += "<tr class='table_item' data-role='" + blog.id + "'>" +
                        "<td class='blog_id'>" + (per_page * (page - 1) + (i + 1)) + "</td><td class='blog_title'>" +
                        "<a target='_blank' href='showBlogDetail?blog_id=" + blog.id + "'>" +
                        blog.title + "</a></td><td class='publish_time'>" + blog.my_time +
                        "</td><td class='blog_tag'>" + blog.my_tag + "</td><td class='delete_button'>" +
                        "<button>删除</button></td>";
                    if (blog.istop == 1) {
                        result += "<td class='to_top_button'><button data-role='1'>取消置顶</button></td></tr>";
                    } else {
                        result += "<td class='to_top_button'><button data-role='0'>置顶</button></td></tr>";
                    }
                }
                $('.table_blog_info table').html(result);
                layer.close(load);
                bindDeleteAndTopClick();
            },
            error: function () {
                layer.close(load);
                layer.msg('发生了不可知的错误', {icon: 5});
            }
        });
    }

    function bindDeleteAndTopClick() {
        $('.table_item .delete_button button').on("click", function () {
            var dataRole = $(this).parent().parent().attr("data-role");
            var title = $(this).parent().siblings(".blog_title").text();
            var which = $(this).parent().parent();
            layer.confirm('确定删除:《' + title + '》?', {
                title:"删除博客",
                btn: ['嗯,删了', '留着吧'] //按钮
            }, function () {
                $.ajax({
                    url: "index/Manage/deleteBlog",
                    data: {id: dataRole},
                    type: "post",
                    success: function (data) {
                        if (data == 200) {
                            which.remove();
                        } else {
                            layer.msg("删除失败", {icon: 5});
                        }
                    },
                    error: function () {
                        layer.msg("删除失败", {icon: 5});
                    }
                });
                layer.closeAll();
            });
        });
        $('.table_item .to_top_button button').on("click", function () {
            var dataRole = $(this).parent().parent().attr("data-role");
            var upOrDown = $(this).attr("data-role");
            var button = $(this);
            var msg = "";
            var which = 0;
            if (upOrDown == 1) {
                msg = '确定取消置顶?';
                which = 0;
            } else {
                msg = '确定将它置顶?';
                which = 1;
            }
            layer.confirm(msg, {
                title:"置顶博客",
                btn: ['嗯', '算了'] //按钮
            }, function () {
                $.ajax({
                    url: "index/Manage/upOrDown",
                    type: "post",
                    data: {id: dataRole, which: which},
                    success: function (data) {
                        if (data == 200) {
                            if (which == 0) {
                                button.html("置顶");
                            } else {
                                button.html("取消置顶");
                            }
                            button.attr("data-role", which);
                        } else {
                            layer.msg("修改失败", {icon: 5});
                        }
                    },
                    error: function () {
                        layer.msg("修改失败", {icon: 5});
                    }
                });
                layer.closeAll();
            });
        });
    }
});