<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/6/14
 * Time: 0:07
 */

namespace app\index\controller;

use think\Controller;
use think\Request;
use app\index\model\Blog\MyBlog;
use app\index\model\Comment\YouKe as YoukeModel;
use app\index\model\Comment\CommentModel;
use app\index\model\Comment\Reply as ReplyModel;
use app\index\model\Blog\Tag as TagModel;
use think\View;

class BlogDetail extends Controller
{
    public function showBlogDetail(Request $request)
    {
        $view = new View('blog_detail/ShowBlogDetail');
        $blog_id = $request->param('blog_id');
        if ($blog_id == null||$blog_id<0) {
            $blog_id = 1;
        }
        $myBlog = MyBlog::get($blog_id);
        if ($myBlog != null) {
            $path = $myBlog['path'];
            $my_time = $myBlog['my_time'];
            $arr = explode(" ", $my_time);
            $the_date = $arr[0];
            $the_time = $arr[1];
            $myBlog->date = $the_date;
            $myBlog->time = $the_time;
            $file_content = "";
            if (file_exists($path)) {
                $file_content = file_get_contents($path);
            }
            $myBlog->content = $file_content;
            $comments = CommentModel::where(['blog_id' => $blog_id])->select();
            if ($comments != null) {
                foreach ($comments as $comment) {
                    $comment_id = $comment['id'];
                    $youke_id = $comment['user_id'];
                    $youke = YoukeModel::get(['id' => $youke_id]);
                    if ($youke!=null)
                    $comment->youke = $youke;
                    $replys = ReplyModel::where(['comment_id' => $comment_id])->select();
                    foreach ($replys as $reply) {
                        $reply_to = $reply['reply_to'];
                        $user_id = $reply['user_id'];
                        $reply_to_user = YoukeModel::get($reply_to);
                        $who = YoukeModel::get($user_id);
                        $reply->reply_to = $reply_to_user;
                        $reply->who = $who;
                    }
                    $comment->replys = $replys;
                }
            }
            $myBlog->comments = $comments;
            $lastests = CommentModel::where('id', ">", 0)->order("id", "desc")->limit(5)->select();
            foreach ($lastests as $lastest) {
                $user_id = $lastest['user_id'];
                $youke = YoukeModel::get($user_id);
                $lastest->youke = $youke;
                $blog_id = $lastest['blog_id'];
                $blog = MyBlog::get($blog_id);
                $lastest->blog_title = $blog['title'];
            }
            $myBlog->lastests = $lastests;
        }
        $myBlog->comment_length = sizeof($comments);
        $tag_arr = explode(",", $myBlog['tag']);
        $result_tag = array();
        foreach ($tag_arr as $tag) {
            $result_tag[] = TagModel::get(['id' => $tag])['tag'];
        }
        $myBlog->tags = $result_tag;
        $view->assign("blog", $myBlog);
        return $view->fetch();
    }

    public function publicComment(Request $request)
    {
        $blog_id = $request->post('blog_id');
        $youke_email = $request->post('email');
        $youke_link = $request->post("link");
        $youke_nickname = $request->post('nickname');
        $comment_content = $request->post('reply_content');
        $youke = YoukeModel::get(['email' => $youke_email]);
        $youke_id = null;
        $isSuccess = true;
        if ($youke == null) {
            $newYouke = new YoukeModel();
            $newYouke->link = $youke_link;
            $newYouke->email = $youke_email;
            $newYouke->nickname = $youke_nickname;
            if ($newYouke->save()) {
                $isSuccess = true;
                $youke_id = $newYouke->getLastInsID();
            } else {
                $isSuccess = false;
            }
        } else {
            $isSuccess = true;
            $youke_id = $youke['id'];
        }
        if ($isSuccess) {
            $comment_model = new CommentModel();
            $comment_model->blog_id = $blog_id;
            $comment_model->comment_content = $comment_content;
            $comment_model->user_id = $youke_id;
            $comment_model->comment_time = date("Y-m-d H:i:s", time());
            if ($comment_model->save()) {
                echo "<script>window.location.href='../../showBlogDetail?blog_id=".$blog_id."'</script>";
            } else {
                echo "<script>window.location.href='../../showBlogDetail?blog_id=".$blog_id."'</script>";
            }
        } else {
            echo "<script>window.location.href='../../showBlogDetail?blog_id=".$blog_id."'</script>";
        }
    }

    public function replyComment(Request $request)
    {
//        回复对象
        $reply_user = $request->post("reply_to");
//        回复者
        $user_id = null;
        $nickname = $request->post('nickname');
        $email = $request->post('email');
        $link = $request->post('link');
        $blog_id = $request->post('blog_id');
//      回复内容
        $reply_content = $request->post('reply_content');
        $comment_id = $request->post('comment_id');
        $youke = YoukeModel::get(['email' => $email]);
        $isSuccess = true;
        if ($youke == null) {
            $youke = new YoukeModel();
            $youke->nickname = "".$nickname."";
            $youke->email = $email;
            $youke->link = $link;
            if ($youke->save()) {
                $user_id = $youke->getLastInsID();
                $isSuccess = true;
            } else {
                $isSuccess = false;
            }
        } else {
            $isSuccess = true;
            $user_id = $youke['id'];
        }
        $replyModel = new ReplyModel();
        $replyModel->comment_id = $comment_id;
        $replyModel->reply_content = $reply_content;
        $replyModel->user_id = $user_id;
        $replyModel->reply_to = $reply_user;
        $replyModel->reply_time = date("Y-m-d H:i:s", time());
        if ($isSuccess) {
            if ($replyModel->save()) {
               echo "<script>window.location.href='../../showBlogDetail?blog_id=".$blog_id."'</script>";
            } else {
                echo "<script>window.location.href='../../showBlogDetail?blog_id=".$blog_id."'</script>";
            }
        } else {
            echo "<script>window.location.href='../../showBlogDetail?blog_id=".$blog_id."'</script>";
        }
    }
}