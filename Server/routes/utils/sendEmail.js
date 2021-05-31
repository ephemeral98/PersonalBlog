// 发邮件
const nodemailer = require("nodemailer");
const sendMsg = require('./getSendRes');

// 定义邮件服务器服，个人建议使用QQ邮箱，用Yeah(网易)邮箱配置出现各种问题
const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  service: 'qq',
  secure: true,
  // 我们需要登录到网页邮箱中，然后配置SMTP和POP3服务器的密码
  auth: {
    user: 'shall-we-talk@qq.com',
    pass: 'liyfqtvzcolwdbei'
  }
});

const mailOptions = {
  // 发送邮件的地址
  from: 'shall-we-talk@qq.com', // login user must equal to this user
  // 接收邮件的地址
  to: '',
  // 邮件主题
  subject: '',
  // 以HTML的格式显示，这样可以显示图片、链接、字体颜色等信息
  html: ''
};

/**
 * 看看能不能转化，是否要进一步转化成Email
 * @param {string} str
 * @return {String | Boolean} false
 */
function toEmail(str) {
  const emailReg = /^([a-zA-Z]|[0-9])(\w|\W)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  const qqReg = /^\d{6,10}$/;
  // 填写的就是QQ账号，QQ号不可能低于6位，也不可能高于10位，只能是纯数字
  if (emailReg.test(str)) {
    return str;
  }
  if (qqReg.test(str)) {
    return str + "@qq.com";
  }
  return false;
}

/**
 * 发送
 * @param {Object} res
 */
function handleSend(res) {
  // 发送邮件，并有回调函数
  transporter.sendMail(mailOptions, err => {
    if (err) {
      res.send(sendMsg.handleFail('服务器正在抢修中...' + err.message))
    }
  });
}

/**
 * 发表白信
 * @param {req} 请求
 */
function confession(req, res, isReply) {
  const { me, ta, taName, talkAbout } = req.body;
  const replySubject = `恭喜，你喜欢的那个人也正好喜欢你[告白信]`;
  const blessing = `<h1>恭喜发财，早生贵子，寿比南山</h1><h2>愿有情人终成眷属!!</h2>`;

  // 祝福 第二次发邮件的人（回复者）
  const replyMe = {
    subject: replySubject,
    html: blessing,
  }

  // 回复给 首次发邮件的那个人
  const replyTa = {
    subject: replySubject,
    html: talkAbout || blessing,
  }

  const footer = `<h3 style="margin-top:100px">如果你也想见见ta，也可以来我这里给ta写下匿名信:</h3>
  <div>地址：http://www.guozhenqiang.xyz/fate</div>`;

  const toTa = {
    subject: '我想对你说...[告白信]',
    html: `<h3>亲爱的${taName || '朋友'},</h3><div>有位尊贵的客人在我这里 给你写下了告白信：</div>
    <p>${talkAbout || '其实我喜欢你很久了...'}</p>
    ${footer}`
  }

  if (isReply) { // 发2封邮件（双方）
    Object.assign(mailOptions, replyMe) // 回复我的
    mailOptions.to = me;
    handleSend(res);
    Object.assign(mailOptions, replyTa) // 回复ta的
    mailOptions.to = ta;
    handleSend(res);
    res.send(sendMsg.getResult('', '恭喜！，愿有情人终成眷属！'));
  } else { // 只发给ta
    Object.assign(mailOptions, toTa)
    mailOptions.to = ta;
    handleSend(res);
    res.send(sendMsg.getResult('', '邮件已发，祝你好运~'));
  }
}

module.exports = {
  toEmail,
  confession
}
