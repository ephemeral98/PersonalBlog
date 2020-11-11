const validate = require('validate.js');
// 管理员初先始化
const Issues = require('../model/Issues.js');

// 查询某文章下的所有评论
exports.getAllIssues = async () => {
  const issues = await Issues.findAndCountAll();
  if (issues) {
    return {
      datas: JSON.parse(JSON.stringify(issues)),
      count: issues.count,
    }
  }
  return null;
}

// 添加一个评论
exports.addIssue = async (IssueObj) => {
  // 定义规则
  const rules = {
    name: {
      presence: {
        allowEmpty: false,
      },
      type: 'string',
      length: {
        minimum: 1,
        maximun: 20,
      }
    },
    email: {
      presence: {
        allowEmpty: true
      },
      type: 'string',
    },
    content: {
      presence: {
        allowEmpty: true,
      },
      type: 'string',
    },
    phone: {
      presence: {
        allowEmpty: true,
      },
      type: 'string',
    },
    place: {
      presence: {
        allowEmpty: true,
      },
      type: 'string',
    },
  }

  const res = validate.validate(IssueObj, rules);
  if (res === undefined) {
    console.log('验证通过');
    const ins = await Issues.create()
    ins.toJSON();
  } else {
    console.log('验证没通过。。。');
  }
}

// 删除一个评论
exports.delIssue = async (IssueId) => {
  // 先判断评论还在不在先
  const result = await Issues.findByPk(IssueId);
  if (!result) {
    return '评论已经被删除！ ';
  }
  return await Issues.destroy({
    where: {
      id: IssueId
    }
  })
}
