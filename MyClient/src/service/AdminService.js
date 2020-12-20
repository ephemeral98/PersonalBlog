// 管理用户接口 的模块
import myAxios from "./Request.js";

/**
 * 登录
 * @param {string} loginId
 * @param {string} password
 */
async function loginService(loginId, password, captcha) {
  const loginServ = await myAxios().post("/admin/login", {
    loginId,
    password,
    captcha
  });
  return loginServ.data;
}

// 登出
async function quitService() {
  return localStorage.removeItem("token");
}

// 我是谁（获取用户信息）
async function whoAmIService() {
  const whoAmIServ = await myAxios().get("/admin/whoami");
  // console.log(whoAmIServ);
  return whoAmIServ;
}

/**
 * 修改密码
 * @param {*} loginId
 * @param {*} pwdObj 旧密码、两次新密码
 */
async function changePwd(loginId, pwdObj) {
  const { oldPwd, newPwd, reNewPwd } = pwdObj;
  const resChangePwd = await myAxios().put(`/admin/safe`, {
    loginId,
    oldPwd,
    newPwd,
    reNewPwd
  });
  return resChangePwd;
}

/**
 * 修改个人介绍
 * @param {*} loginId
 * @param {string} introContent 个人介绍内容
 */
async function changeIntroduce(loginId, introContent) {
  const resChangeIntro = await myAxios().put(`/admin/info/introduce`, {
    loginId,
    introContent
  });
  return resChangeIntro;
}

/**
 * 修改 昵称、个性签名
 * @param {*} loginId
 * @param {*} adminInfos 昵称和个性签名
 */
async function changeNickAndSign(loginId, { nickName, signature }) {
  const resNickAndSign = await myAxios().put(`/admin/info`, {
    loginId,
    nickName,
    signature
  });
  return resNickAndSign;
}

// 如有一个用户都没有，则添加一个
async function addOne() {
  const url = "/admin/defaultSignUp";
  return await myAxios().post(url);
}

// 获取验证码
/* async function getCaptcha() {
  const url = "/captcha";
  const resp = await myAxios().get(url);
  if (resp.status === 200) {
    return resp.data;
  }
} */

export {
  loginService,
  quitService,
  whoAmIService,
  changePwd,
  changeIntroduce,
  changeNickAndSign,
  addOne
  // getCaptcha
};
