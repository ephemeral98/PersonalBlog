const validate = require('validate.js');
const DayWords = require('../model/DayWords.js');

// 添加一句
exports.addWords = async (daywordsObj) => {
  const rules = {
    content: {
      presence: {
        allowEmpty: false,
      }
    }
  }

  const res = await validate.validate(daywordsObj, rules);
  if (res === undefined) {
    const ins = await DayWords.create(daywordsObj);
    return ins.toJSON();
  } else {
    return "创建格式有误，";
  }
}

// 批量删除
exports.delManyWords = async (ids) => {
  const count = [];
  for (let i = 0, len = ids.length; i < len; i++) {
    const res = await DayWords.destroy({
      where: {
        id: ids[i]
      }
    });
    if (res !== 0) {
      count.push(Promise.resolve(res));
    } else {
      count.push(Promise.reject(res));
    }
  }

  try {
    await Promise.all(count);
    return {};
  } catch (error) {
    return "批量删除有误，";
  }
}


// 查看全部句子
exports.getAllWords = async () => {
  const resp = await DayWords.findAndCountAll();
  return {
    totols: resp.count,
    datas: JSON.parse(JSON.stringify(resp.rows))
  }
}
