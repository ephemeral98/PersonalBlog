exports.formatStr = (params, value1, value2) => {
  const reg = /[^a-zA-Z\d_]/g; // 匹配除了字母数字下划线以外的字符
  if (params === "loginId") {
    const loginId = value1;
    if (reg.test(loginId) || loginId.length > 12 || loginId.length < 2) {
      return '用户名必须为2-12位的字母数字下划线组成';
    }
  }

  if (params === 'password') {
    const password = value1,
      rePassword = value2;
    if (reg.test(password) || password.length > 16 || password.length < 4) {
      return '密码必须为4-16位的字母数字下划线组成';
    }
    // 判断两次密码是否一致
    if (password !== rePassword) {
      return '两次密码不一致';
    }
  }

  if (params === "nickName") {
    const nickName = value1;
    if (nickName.length > 12 || nickName.length < 2) {
      return '昵称必须在2-12位';
    }
  }

}
