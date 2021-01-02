// 服务层，被调去做增删改查层
const validate = require('validate.js');
const Admin = require('../model/Admin.js');
const { pick } = require('./utils/propertyHelper.js');
const { formatStr } = require('./utils/formatStr.js');
const md5 = require('md5');

// 查询 
exports.getAdmin = async (loginId) => {
  const res = await Admin.findOne({
    where: {
      loginId,
    }
  });
  return res ? res.toJSON() : null; //返回一个平面对象
}

// 登录
exports.login = async (loginId, password) => {
  password = md5(password)
  const res = await Admin.findOne({
    where: {
      loginId,
      password
    }
  });
  // if (res && res.loginId === loginId && res.password === password) {
  return await res ? res.toJSON() : null;
  // }
  // return null;
}

// 注册（暂不开放）
exports.register = async (adminObj) => {
  const reg = /[^a-zA-Z\d_]/g; // 匹配除了字母数字下划线以外的字符
  const { loginId, password, rePassword, nicqkName } = adminObj;

  const login = formatStr('loginId', loginId);
  const pwd = formatStr('password', password, rePassword);
  if (login) { // 用户名格式不对
    return login;
  }
  if (pwd) { // 密码格式不对
    return pwd;
  }

  /* 如果用户名和密码格式都无误的话 */
  const res = await Admin.findOne({
    where: {
      loginId,
    }
  });
  // 如果用户名已经存在
  if (res) {
    return '用户名已经存在';
  }

  // 设置的账号密码都没有问题的话

  // 判断必须是否有昵称，如果没有随机生成
  adminObj.nickName ? adminObj.nickName : adminObj.nickName = (Math.random().toFixed(5) * 10 ** 5).toString();

  const rules = {
    loginId: {
      presence: {
        allowEmpty: false,
      },
      type: 'string',
      length: {
        minimun: 2,
        maximun: 12,
      }
    },

    password: {
      presence: {
        allowEmpty: false,
      },
      type: 'string',
      length: {
        minimun: 4,
        maximun: 16
      }
    },
    nickName: {
      presence: {
        allowEmpty: false,
        length: {
          minimun: 2,
          maximun: 12
        }
      },
      type: 'string',
    }
  }
  /* const adminObj = {
    loginId,
    password,
    nickName,
  } */

  adminObj = pick(adminObj, 'loginId', 'password', 'nickName');

  const result = validate.validate(adminObj, rules);
  if (result === undefined) { // 表示通过规则
    const ins = await Admin.create(adminObj);
    return ins.toJSON(); // 创建成功
  } else {
    return '没通过规则';
  }
}

// 修改密码
exports.updatedPwd = async (loginId, adminObj) => {
  const { newPwd, oldPwd, reNewPwd } = adminObj;
  // 先判断以前的密码对不对
  const isOwn = await Admin.findOne({
    where: {
      loginId,
      password: oldPwd
    }
  });
  if (!isOwn) {
    return "你是盗号的？ ";
  }
  // 判断密码格式对不对
  const pwd = formatStr('password', newPwd, reNewPwd);
  if (pwd) { // 密码格式不对
    return pwd;
  }
  // md5加密
  const newPassword = md5(newPwd);
  // 修改密码
  return await Admin.update({ password: newPassword }, {
    where: {
      loginId,
    }
  });
}
// 修改昵称、个性签名、
exports.updateInfo = async (loginId, adminObj) => {
  const { nickName, signature } = adminObj;
  const nick = formatStr('nickName', nickName);
  if (nick) { // 如果有返回值，说明不在2-12位之间，不符合规则
    return nick;
  }

  const rules = {
    nickName: {
      presence: {
        allowEmpty: false,
        length: {
          minimun: 2,
          maximun: 12
        }
      },
      type: 'string'
    },
    signature: {
      presence: {
        allowEmpty: true,
        length: {
          maximun: 30,
        }
      },
      type: 'string'
    },
  }

  const result = validate.validate(adminObj, rules);
  if (result === undefined) {
    // 表示通过规则
    return await Admin.update({
      nickName,
      signature
    }, {
      where: {
        loginId,
      }
    });
  } else {
    return '信息格式有误'
  }
}

// 修改个人介绍
exports.updateIntroduce = async (loginId, { introContent }) => {
  return await Admin.update({ introduce: introContent }, {
    where: {
      loginId,
    }
  });
}

// 如果没有用户，则新增一个，账号为 Barry, 密码是 1234
exports.addOne = async () => {
  // 查找，判断是否有用户，
  const resp = await Admin.findAndCountAll();
  if (resp.count === 0) {
    Admin.create({
      loginId: "Barry",
      password: md5("1234"),
      nickName: "Barry"
    });
    return "创建默认用户成功";
  }
  return "已经存在用户";
}
