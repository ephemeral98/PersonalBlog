const validate = require('validate.js');
const Category = require('../model/Category.js');
const Admin = require('../model/Admin.js');
const { async } = require('validate.js');

// 查询所有分类
exports.getAllKind = async (loginId) => {
  const res = await Category.findAndCountAll({
    include: [Admin],
    where: {
      loginId
    }
  });
  return {
    totols: res.count,
    datas: JSON.parse(JSON.stringify(res.rows))
  }
}

// 查找某一个分类是否存在
exports.getIsExist = async (categoryObj) => {
  const res = await Category.findAndCountAll({
    include: [Admin],
    where: {
      loginId: categoryObj.loginId,
      name: categoryObj.name
    }
  });
  return res.count;
}

// 增加一个分类
exports.addKind = async (categoryObj) => {
  const rules = {
    name: {
      presence: {
        allowEmpty: false
      },
      type: 'string',
      length: {
        minimum: 1,
        maximum: 20 //最多20个文字、或者字母
      }
    },
    loginId: {
      presence: {
        allowEmpty: false,
      }
    }
  }
  const res = validate.validate(categoryObj, rules);
  if (res === undefined) {
    const ins = await Category.create(categoryObj);
    return ins.toJSON();
  } else {
    return '分类category验证没通过！';
  }
}

// 修改分类名字
exports.updateKind = async (categoryObj) => {
  const rules = {
    newName: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
      length: {
        minimum: 1,
        maximum: 10,
      }
    },
    oldName: {
      presence: {
        allowEmpty: false,
      }
    },
    loginId: {
      presence: {
        allowEmpty: false,
      }
    }
  }

  const res = validate.validate(categoryObj, rules);
  if (res === undefined) {
    const result = await Category.update({ name: categoryObj.newName }, {
      where: {
        name: categoryObj.oldName,
        loginId: categoryObj.loginId
      }
    });
    // 如果第一项是 0 说明分类不存在，如果是 1 说明修改成功
    if (result[0] === 1) {
      return {}
    } else {
      return "该分类不存在，";
    }
  }
  else {
    return "修改分类的规则不通过，"
  }

}

// 删除一个分类
exports.delKind = async (categoryObj) => {
  const result = await Category.findOne({
    where: {
      loginId: categoryObj.loginId,
      name: categoryObj.name
    }
  });
  if (!result) {
    return "分类已移除，";
  }
  const res = await Category.destroy({
    where: {
      loginId: categoryObj.loginId,
      name: categoryObj.name
    }
  });
  if (res === 1) {
    return {}
  } else {
    return "删除分类有误，"
  }
}
