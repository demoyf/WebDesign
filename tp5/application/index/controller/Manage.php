<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/6/22
 * Time: 0:54
 */

namespace app\index\controller;


use app\index\model\Blog\Tag;
use app\index\model\Comment\CommentModel;
use app\index\model\Comment\Reply;
use think\Controller;
use think\Db;
use think\Exception;
use think\Request;
use think\View;
use app\index\model\Blog\MyBlog;
class Manage extends Controller
{
    public function showMainPage()
    {
        return $this->fetch();
    }

    public function showManage()
    {
        $view = new View("manage/showManage");
        return $view->fetch();
    }

    public function showManageBlog()
    {
        $view = new View("manage/showManageBlog");
        $blogs = MyBlog::where('id', '>', 0)->order("istop",'desc')->paginate(9);
        $temp = json_encode($blogs);
        $view->total = json_decode($temp)->total;
        $view->per_page = json_decode($temp)->per_page;
        foreach ($blogs as $blog) {
            $tags = $blog['tag'];
            $arr = explode(",", $tags);
            $result = "";
            for ($i = 0; $i < sizeof($arr); $i++) {
                if ($arr[$i]==""){
                    continue;
                }
                $tag = Tag::get(['id'=>$arr[$i]]);
                $result .= $tag['tag'] . ",";
            }
            $blog->my_tag = $result;
        }
        $view->blogs = $blogs;
        return $view->fetch();
    }

    public function getManageNext(Request $request)
    {
        $page = $request->post('page');
        if (!($page > 0)) {
            $page = 1;
        }
        try {
            $blogs = MyBlog::where('id', '>', 0)->order("istop",'desc')->paginate(9);
            foreach ($blogs as $blog) {
                $tags = $blog['tag'];
                $arr = explode(",", $tags);
                $result = "";
                for ($i = 0; $i < sizeof($arr); $i++) {
                    if ($arr[$i]==""){
                        continue;
                    }
                    $tag = Tag::get(['id'=>$arr[$i]]);
                    $result .= $tag['tag'] . ",";
                }
                $blog->my_tag = $result;
            }
            echo json_encode($blogs);
        } catch (Exception $exception) {
            $arr = array('code' => 500);
            echo json_encode($arr);
        }
    }

    public function upOrDown(Request $request)
    {
        $id = $request->post("id");
        $which = $request->post("which");
        $blog = MyBlog::get(['id' => $id]);
        $blog->istop = $which;
        if ($blog->isUpdate(true)->save()) {
            echo 200;
        } else {
            echo 500;
        }
    }

    public function deleteBlog(Request $request)
    {
        $id = $request->post('id');
        $blog = MyBlog::get(['id' => $id]);
        $path = $blog['path'];
        try {
            $comments = CommentModel::where(['blog_id'=>$id])->select();
            foreach ($comments as $comment) {
                $comment_id = $comment['id'];
                $replys = Reply::where(['comment_id'=>$comment_id])->select();
                foreach ($replys as $reply) {
                    db('reply')->where('id', $reply['id'])->delete();
                }
                db('comment')->where('id', $comment_id)->delete();
            }
            if ($blog->delete()){
                if (file_exists($path)){
                    unlink($path);
                }
                echo 200;
            } else {
                echo 500;
            }
        } catch (Exception $exception) {
            echo 500;
        }
    }
}