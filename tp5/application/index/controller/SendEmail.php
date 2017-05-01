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
class SendEmail extends Controller
{
    public function Load()
    {
        return $this->fetch();
    }

    public function send(Request $request)
    {
        $mail = $request->post('mail');
        $mail .= "@139.com";
        echo $mail;
        $title = $request->post('title');
        $title .= "注册邮箱的验证码测试";
        $content = $request->post('content');
        $result = "欢迎注册本博客，请在滴的一声之后留下你的个人信息，http://localhost/Exp_3/WebDesign/tp5/public/index/SendEmail/send" . $content;
        $email = new \PHPMailer();
        $email->IsSMTP();
        $email->Host=Config::get("MAIL_HOST");//smtp服务器的名称（这里以QQ邮箱为例）
        $email->SMTPAuth = Config::get('MAIL_SMTPAUTH'); //启用smtp认证
        $email->Username = Config::get('MAIL_USERNAME'); //发件人邮箱名
        $email->Password = Config::get('MAIL_PASSWORD') ; //163邮箱发件人授权密码
        $email->From = Config::get('MAIL_FROM'); //发件人地址（也就是你的邮箱地址）
        $email->FromName = Config::get('MAIL_FROMNAME'); //发件人姓名
        $email->AddAddress($mail);
        $email->WordWrap = 50; //设置每行字符长度
        $email->IsHTML(Config::get('MAIL_ISHTML')); // 是否HTML格式邮件
        $email->CharSet=Config::get('MAIL_CHARSET'); //设置邮件编码
        $email->Subject =$title; //邮件主题
        $email->Body = $result; //邮件内容
        $email->AltBody = "这是一个纯文本的身体在非营利的HTML电子邮件客户端"; //邮件正文不支持HTML的备用显示
        if ($email->send()) {
            echo "success";
        } else {
            echo "error";
        }
    }
}