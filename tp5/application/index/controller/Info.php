<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/5/1
 * Time: 11:52
 */

namespace app\index\controller;
use think\Controller;
use think\Request;
use app\index\model\Personal\Info as InfoModel;
class Info extends Controller
{
//    显示读取Info的界面
    public function showReadInfo()
    {
        return $this->fetch();
    }

//    获取个人信息，返回结果是json  200表示成功，404找不到
    public function readInfo(Request $request)
    {
//        200查找成功，404查找失败
        $phone = $request->post('phone');
        $info = InfoModel::get(['phone' => $phone]);
        if ($info) {
            $array = $info->toArray();
            $array['code'] = 200;
            $array['result'] = 'success';
            echo json_encode($array);
        } else {
            $array = array(['code' => 404, 'result' => 'fail']);
            echo json_encode($array);
        }
    }

//    显示更新的界面
    public function showUpdate()
    {
        return $this->fetch();
    }

//    更新操作  200更新成功，500更新失败
    public function updateInfo(Request $request)
    {
        $phone = $request->post('phone');
        $phone = "1111";
        $nickname = $request->post('nickname');
        $address = $request->post('address');
        $email = $request->post('email');
        $birdthday = $request->post('birthday');
        $sign = $request->post('sign');
        $info = InfoModel::get(['phone' => $phone]);
        if (!empty($nickname)) {
            $info->nickname = $nickname;
        }
        if (!empty($address)) {
            $info->address = $address;
        }
        if (!empty($email)) {
            $info->email = $email;
        }
        if (!empty($birdthday)) {
            $info->birthday = $birdthday;
        }
        if (!empty($sign)) {
            $info->sign = $sign;
        }
        if ($info->isUpdate(true)->save()) {
            $array = array(['code' => 200, 'result' => 'success']);
            echo json_encode($array);
        } else {
            $array = array(['code' => 500, 'result' => 'fail']);
            echo json_encode($array);
        }
    }
}