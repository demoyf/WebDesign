<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/5/1
 * Time: 21:39
 */

namespace app\index\controller;
use app\index\model\Blog\Tag;
use think\Controller;
use think\Request;
use app\index\model\Blog\MyBlog as MyBlogModel;
use think\View;

class BlogSave extends Controller
{
    public function showType()
    {
        $view = new View("blog_save/showType");
        $tag = Tag::all();
        $view->tags = $tag;
        return $view->fetch();
    }

    public function addTag(Request $request)
    {
        $tag_info = $request->post("tag");
        $tag = new Tag();
        $tag->tag = $tag_info;
        $hasTag = Tag::get(['tag' => $tag_info]);
        if ($hasTag != null) {
            echo "ex";
        }else{
            if ($tag->save()) {
                echo $tag->getLastInsID();
            } else {
                echo "error";
            }
        }
    }
    public function getImageUpload(Request $request)
    {
        $image = $request->file("image");
        $path =  "upload" . DS . "blogImg";
        $message = $image->validate(['size' => 1024 * 500, 'ext' => 'jpg,png,gif,ico,jpeg'])
            ->move(ROOT_PATH . "public" . DS .$path);
        if ($message) {
            $path .= "\\" . $message->getSaveName();
            $array = array('code' => 200, 'result' => '文件上传成功',"path"=>$path);
            echo json_encode($array);
        } else {
            $array = array('code' => 500, 'result' => "文件上传失败");
            echo json_encode($array);
        }
    }

//    保存博客的内容，兮兮
    public function uploadBlogContent(Request $request)
    {
        $time = time()."";
        $time .= 'xyf'.rand(1, 500);
        $path =  ROOT_PATH . "public" . DS ."blogContent".DS.($time.'.txt');
        $file = fopen($path, 'w');
        $content = $request->post('content');
        $content = trim($content);
        $title = $request->post('title');
        $description = $request->post('description');
        $background_id = $request->post('background_id');
        $tags = $request->post("tags");
        fwrite($file,$content);
        $myBlog = new MyBlogModel();
        $myBlog->title = $title;
        $myBlog->path = $path;
        $myBlog->my_time = date("Y-m-d H:i:s",time());
        $myBlog->description = $description;
        $myBlog->background_id = $background_id;
        $myBlog->tag = $tags;
        if ($myBlog->save()) {
            fclose($file);
            $array = array('code' => 200, 'result' => '文件上传成功');
            echo json_encode($array);
        }else{
            fclose($file);
            $array = array('code' => 500, 'result' => '发生了未知的错误');
            echo json_encode($array);
        }
    }
}