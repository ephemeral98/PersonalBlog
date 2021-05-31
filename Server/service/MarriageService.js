const validate = require('validate.js');
const Marriage = require('../model/Marriage.js');

/**
 * 匹配有情人终成眷属
 * @param {String} me
 * @param {String} ta
 * @returns
 */
async function matchUser({ me, ta }) {
  const resp = await Marriage.findAndCountAll({
    where: {
      ta: me,
      me: ta
    }
  });
  return resp.count > 0 ? 1 : 0;
}

/**
 * 查找我有没有来过
 * @param {String} me
 * @param {String} ta
 * @returns
 */
async function cameHere({ me, ta }) {
  let isExit;
  try {
    isExit = await Marriage.findAndCountAll({
      where: {
        me
      }
    });
  } catch (error) {
    return '查找失败' + error;
  }

  if (isExit.count === 0) { // 我第一次来, 创建一个用户
    addOne({
      me,
      ta
    });
  } else { // 我之前来过，mark一下
    markUser(me, ta);
  }
}

/**
 * mark一下我来的次数
 * @param {String} me
 * @returns
 */
async function markUser(me, ta) {
  // 判断是不是一直都爱着那个人
  // 找到之前爱的人
  const resp = await Marriage.findOne({
    where: {
      me
    }
  });
  const user = resp.toJSON();
  if (ta === user.ta) {
    // 一直都是那个人
  } else {
    // 变心了
    // 修改次数
    await Marriage.update({
      count: user.count + 1,
      ta
    }, {
      where: {
        me
      }
    });

    if (user.count + 1 > 3) {
      await setTag('me', me, '海王');
    }
  }
}

/**
 * 添加一项
 * @param {String} me
 * @param {String} ta
 * @returns {String} 信息
 */
async function addOne(contactObj) {
  const rules = {
    me: {
      presence: {
        allowEmpty: false,
      }
    },
    ta: {
      presence: {
        allowEmpty: false,
      }
    }
  }

  const res = await validate.validate(contactObj, rules);
  if (res === undefined) {
    await Marriage.create(contactObj);
    return "邮件已发，祝你好运~";
  } else {
    return "邮件发送失败";
  }
}

/**
 * 设置标签
 * @param {String} who 设置谁
 * @param {String} name 设置人的名字
 * @param {String} tag 标签
 * @returns
 * who 只能取 me 或者 ta
 */
async function setTag(who, name, tag) {
  const content = {
    tag
  }
  await Marriage.update(content, {
    where: {
      [who]: name
    }
  })
}

module.exports = {
  matchUser,
  cameHere,
}
