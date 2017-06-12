<?php
/**
 * Created by PhpStorm.
 * User: alone
 * Date: 2017/4/30
 * Time: 18:58
 */

namespace app\index\controller;
use think\Controller;
use think\Request;
use think\Config as Config;
use app\index\model\Personal\Info as InfoModel;
class SendEmail extends Controller
{
    public function Load()
    {
        return $this->fetch();
    }

    public function send(Request $request)
    {
        $email = $request->post('email');
        $mail = new \PHPMailer();
        // 设置PHPMailer使用SMTP服务器发送Email
        $mail->IsSMTP();
        // 设置邮件的字符编码，若不指定，则为'UTF-8'
        $mail->CharSet='UTF-8';
        // 添加收件人地址，可以多次使用来添加多个收件人
        $mail->AddAddress($email);
        $vercode = "";
        $vercode .= rand(0, 9);
        $vercode .= rand(0, 9);
        $vercode .= rand(0, 9);
        $vercode .= rand(0, 9);
        $mail->Body="这是来自Xyf博客的验证信息，
        以下是您的验证码，请输入此验证码完成验证。".$vercode;
        // 设置邮件头的From字段。
        $mail->From=Config::get('MAIL_FROM');
        // 设置发件人名字
        $mail->FromName=Config::get('MAIL_FROMNAME');
        // 设置邮件标题
        $mail->Subject="Xyf博客验证码";
        // 设置SMTP服务器。
        $mail->Host=Config::get("MAIL_HOST");
        // 设置为"需要验证"
        $mail->SMTPAuth=Config::get('MAIL_SMTPAUTH');
        // 设置用户名和密码。
        $mail->Username=Config::get('MAIL_USERNAME');
        $mail->Password=Config::get('MAIL_PASSWORD');
        // 发送邮件。
        $info = InfoModel::get(['phone'=>$email]);
        if ($info == null) {
            if ($mail->send()) {
                $arr = array('code'=>200,"ver"=>$vercode);
                echo json_encode($arr);
            } else {
                $arr = array('code'=>500);
                echo json_encode($arr);
            }
        } else {
            $arr = array('code'=>404);
            echo json_encode($arr);
        }
    }

}