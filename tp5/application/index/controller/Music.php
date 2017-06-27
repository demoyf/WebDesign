<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/6/20
 * Time: 0:28
 */

namespace app\index\controller;


use app\index\model\Music\AldumModel;
use app\index\model\Music\MusicModel;
use think\Controller;
use think\Exception;
use think\Request;
use think\View;

class Music extends Controller
{
    public function showMusicPage()
    {
        $view = new View("music/showMusicPage");
        $aldums = AldumModel::all();
        $view->aldums = $aldums;
        return $view->fetch();
    }

    public function uploadMusic(Request $request)
    {
        vendor('getid3.getid3');
        $image = $request->file("music");
        $aldum_id = $request->post('aldum_id');
        $path = ROOT_PATH . "public" . DS . "music";
        $message = $image->move($path);
        if ($message) {
            $realPath = realpath($path . DS . $message->getSaveName());
            $getId3 = new \getID3();
            $analyze = $getId3->analyze($realPath);
            $info = $analyze['tags']['id3v2'];
            $my_time = $analyze['playtime_seconds'];
            if ($info != null) {
                $title = $info['title'][0];
                $artist = $info['artist'][0];
                $aldum = $info['album'][0];
                $duration = "0" . (int)($my_time / 60) . ":" . (int)($my_time % 60);
                $music = new MusicModel();
                $music->aldum_id = $aldum_id;
                $music->title = $title;
                $music->artist = $artist;
                $music->aldum = $aldum;
                $music->duration = $duration;
                $music->path = "music".DS.$message->getSaveName();
                if ($music->save()) {
                    $array = array('code' => 200, 'result' => "success");
                    echo json_encode($array);
                } else {
                    $array = array('code' => 500, 'result' => "文件解析失败");
                    echo json_encode($array);
                }
            }else{
                $array = array('code' => 500, 'result' => "文件解析失败");
                echo json_encode($array);
            }
        } else {
            $array = array('code' => 500, 'result' => "文件上传失败");
            echo json_encode($array);
        }
    }

    public function uploadAldum(Request $request)
    {
        $image = $request->file("background");
        $title = $request->post('title');
        $description = $request->post('description');
        $path = ROOT_PATH . "public" . DS . "aldum";
        $message = $image->validate(['ext' => 'jpg,png,gif,ico,jpeg'])
            ->move($path);
        if ($message) {
            $finalPath = "aldum" . DS . $message->getSaveName();
            $aldum = new AldumModel();
            $aldum->title = $title;
            $aldum->description = $description;
            $aldum->cover_path = $finalPath;
            $aldum->publish_time = date("Y-m-d H:i:s",time());
            if ($aldum->save()) {
                $array = array('code' => 200, 'result' => "发表成功");
                echo json_encode($array);
            } else {
                $array = array('code' => 500, 'result' => "发表失败");
                echo json_encode($array);
            }
        } else {
            $array = array('code' => 500, 'result' => "发表失败");
            echo json_encode($array);
        }
    }
    public function showPublishAldum()
    {
        $view = new View("music/showPublishAldum");
        return $view->fetch();
    }
    public function musicHome()
    {
        $view = new View("music/musicHome");
        return $view->fetch();
    }

    public function aldumPage()
    {
        $view = new View("music/aldumPage");
        $aldums = AldumModel::where('id', '>', 0)->select();
        $view->aldums = $aldums;
        return $view->fetch();
    }

    public function aldumDetailPage(Request $request)
    {
        $view = new View("music/aldumDetailPage");
        $aldum_id = $request->param("aldum_id");
        $aldum = AldumModel::get($aldum_id);
        $musics = MusicModel::where(['aldum_id' => $aldum_id])->select();
        $aldum->musics = $musics;
        $aldum->length = sizeof($musics);
        $view->aldum = $aldum;
        return $view->fetch();
    }

    public function loadMusic(Request $request)
    {
        try {
            $id = $request->post('id');
            $musics = MusicModel::where(['aldum_id' => $id])->select();
            $array = array("code" => 200, "musics" => $musics);
            $aldum = AldumModel::get($id);
            $play_count = $aldum['play_count'];
            $play_count++;
            $aldum->play_count = $play_count;
            $aldum->isUpdate(true)->save();
            echo json_encode($array);
        } catch (Exception $exception) {
            $array = array("code" => 500);
            echo json_encode($array);
        }
    }
}