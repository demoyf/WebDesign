<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/5/1
 * Time: 21:39
 */

namespace app\index\controller;
use think\Controller;
use think\Request;
use app\index\model\Blog\MyBlog as MyBlogModel;
class BlogSave extends Controller
{
    public function showType()
    {
        return $this->fetch();
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
        fwrite($file,$content);
        $myBlog = new MyBlogModel();
        $myBlog->title = "12465";
        $myBlog->path = $path;
        $myBlog->create_time = date("Y-m-d H:i:s",time());
        if ($myBlog->save()) {
            $array = array('code' => 200, 'result' => '文件上传成功');
            echo json_encode($array);
        }else{
            $array = array('code' => 500, 'result' => '发生了未知的错误');
            echo json_encode($array);
        }
    }
}