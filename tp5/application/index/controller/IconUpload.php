<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/5/1
 * Time: 15:32
 */

namespace app\index\controller;

use think\Controller;
use think\Request;
use app\index\model\Personal\UserIcon as IconModel;

class IconUpload extends Controller
{
    public function showUpload()
    {
        return $this->fetch();
    }

    public function uploadIcon(Request $request)
    {
        $phone = $request->post('phone');
        echo $phone;
        $image = $request->file("image");
        $path =  "upload" . DS . "userIcon";
        $icon = IconModel::get(['phone' => $phone]);
        $isUpdate = false;
        if ($icon == null) {
            $icon = new IconModel();
            $icon->phone = $phone;
        } else {
            $isUpdate = true;
            $delete = $icon->path;
            unlink($delete);
        }
        $message = $image->validate(['size' => 1024 * 500, 'ext' => 'jpg,png,gif,ico,jpeg'])
            ->move(ROOT_PATH . "public" . DS .$path);
        if ($message) {
            $path .= "\\" . $message->getSaveName();
            $icon->path = $path;
            if ($icon->isUpdate($isUpdate)->save()) {
                $array = array(['code' => 200, 'result' => '文件上传成功']);
                echo json_encode($array);
            } else {
                $array = array(['code' => 500, 'result' => '文件上传失败']);
                echo json_encode($array);
            }
        } else {
            $array = array(['code' => 500, 'result' => "文件上传失败"]);
            echo json_encode($array);
        }
}
}