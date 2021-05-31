const validate = require('validate.js');
const Category = require('../model/Category.js');
const Article = require('../model/Article.js');
const Admin = require('../model/Admin.js');
const { async, result } = require('validate.js');

// 查询所有分类
exports.getAllKind = async () => {
  const res = await Category.findAndCountAll();
  return {
    totols: res.count,
    datas: JSON.parse(JSON.stringify(res.rows))
  }
}

// 查找某一个分类是否存在
exports.getIsExist = async (categoryName) => {
  const res = await Category.findAndCountAll({
    where: {
      name: categoryName
    }
  });
  return res.count;
}

// 获取所有分类对应的文章数量
exports.getAllCount = async () => {
  const categoriesObj = await Category.findAll();
  const ids = categoriesObj.map(item => item.id); // 拿到所有分类的id
  const count = [];
  for (let i = 0, len = ids.length; i < len; i++) {
    console.log(ids[i]);
    const resp = await Article.findAndCountAll({  // 找到所有文章，拿文章的categoryId 去碰 分类的id
      where: {
        categoryId: ids[i]
      }
    });
    // const id = rows.map(item => item.categoryId);
    const res = {
      id: resp.count && resp.rows[0].categoryId, // 如果count!==0,说明该分类下有文章
      count: resp.count
    }
    resp.length !== 0 ? count.push(Promise.resolve(res)) : count.push(Promise.reject(res));
  }

  try {
    const result = await Promise.all(count);
    return result;
  } catch (error) {
    return "查找所有分类下的文章数有误，"
  }
}

// 获取一个分类的 文章数量
exports.getCount = async (id) => {
  const res = await Article.findAndCountAll({
    where: {
      categoryId: id,
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
        maximum: 20,
      }
    },
    oldName: {
      presence: {
        allowEmpty: false,
      }
    },
  }

  const res = validate.validate(categoryObj, rules);
  if (res === undefined) {
    const result = await Category.update({ name: categoryObj.newName }, {
      where: {
        name: categoryObj.oldName,
      }
    });
    // 如果第一项是 0 说明分类不存在，如果是 1 说明修改成功
    if (result[0] !== 0) {
      return {}
    } else {
      return "该分类不存在，";
    }
  }
  else {
    return "修改分类的规则不通过，"
  }

}

// 根据分类名字 删除一个分类
exports.delKindByName = async (categoryName) => {
  const kind = await Category.findOne({
    where: {
      name: categoryName
    }
  });
  if (!kind) {
    return "分类已移除，";
  }
  const res = await Category.destroy({
    where: {
      name: categoryName
    }
  });
  if (res === 1) {
    setArtUnselected(kind.id);
    return {}
  } else {
    return "删除分类有误，"
  }
}

// 根据分类id 删除一个分类
exports.delKindById = async (id) => {
  const res = await Category.destroy({
    where: {
      id,
    }
  });
  if (res === 1) {
    setArtUnselected(id);
    return {}
  } else {
    return "删除分类有误，";
  }
}

/**
 * 将删除的分类下的文章 设置为未分类的
 * @param {*} categoryId 分类id
 */
async function setArtUnselected(categoryId) {
  await Article.update({ categoryId: 1 }, {
    where: {
      categoryId
    }
  });
}
