<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/6/20
 * Time: 0:28
 */

namespace app\index\controller;


use think\Controller;
use think\Request;
use think\View;
class Music extends Controller
{
    public function showMusicPage()
    {
        $view = new View("music/showMusicPage");
        return $view->fetch();
    }

    public function uploadMusic(Request $request)
    {
        vendor('getid3.getid3');
        $image = $request->file("music");
        $path = ROOT_PATH . "public" . DS . "music";
        $message = $image->move($path);
        if ($message) {
            $realPath = realpath($path . DS . $message->getSaveName());
            $getId3 = new \getID3();
            $info = $getId3->analyze($realPath);
            echo json_encode("music".DS.$message->getSaveName());
        } else {
            $array = array('code' => 500, 'result' => "文件上传失败");
            echo json_encode($array);
        }
    }
}