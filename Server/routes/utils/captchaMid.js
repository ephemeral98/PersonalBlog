const express = require("express");
const router = express.Router();
const svgCaptcha = require("svg-captcha");

router.get("/captcha", (req, res) => {
  const captcha = svgCaptcha.createMathExpr({
    ignoreChars: "iIl10oO",
    color: true,
  });
  req.session.captcha = captcha.text.toLowerCase(); //把验证码中的 文本 存放到session中

  res.type("svg");
  res.status(200).send(captcha.data); // 把 图片 发给客户端
});

function validateCaptcha(req, res, next) {
  const reqCaptcha = req.body.captcha ? req.body.captcha.toLowerCase() : ""; //用户传递的验证码
  if (reqCaptcha !== req.session.captcha) {
    //验证码错误
    res.send({
      status: 401,
      msg: "验证码不对哦",
    });
  } else {
    next();
  }

  req.session.captcha = ""; // 验证码用过一次之后就作废
}

router.post("/admin/login", validateCaptcha);
module.exports = router;
