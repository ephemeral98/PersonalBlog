const validate = require('validate.js');
// 管理员初先始化
const Article = require('../model/Article.js');
const Category = require('../model/Category.js');

// 根据 分类 去查询所有文章
exports.getArticleByKind = async (categoryId) => {
  const res = await Article.findAndCountAll({
    include: [Category],
    where: {
      categoryId
    }
  });
  if (res) {
    return {
      totals: res.count,
      datas: JSON.parse(JSON.stringify(res.rows))
    }
  } else {
    return "找不到该分类下的文章, "
  }
}

/**
 * 根据分类 分段去查询所有文章
 * @param {*} categoryId 分类id
 * @param {*} start 第几次加载
 * @param {*} limit 每次加载多少条
 */
exports.getArtByKindSection = async (categoryId, { start = 1, limit = 5 }) => {
  const res = await Article.findAndCountAll({
    include: [Category],
    where: {
      categoryId
    },
    limit: start * limit,
    offset: 0,
    order: [
      ['createdAt', 'desc']
    ]
  });
  if (res) {
    return {
      totals: res.count,
      datas: JSON.parse(JSON.stringify(res.rows))
    }
  } else {
    return "找不到该分类下的文章, "
  }
}



// 根据 文章标题 去查询
exports.getArticleByTitle = async (articlesObj) => {
  const res = await Article.findOne({
    include: [Category],
    where: {
      title: articlesObj.title,
      categoryName: articlesObj.categoryName
    }
  });
  if (res) {
    return res.toJSON();
  } else {
    return "找不到该标题的文章，"
  }
}


// 查询
// 根据id去查询
exports.getArticleById = async (articleId) => {
  const res = await Article.findByPk(articleId);
  if (res) {
    return res.toJSON();
  }
  return null;
}


// 发布
exports.addArticle = async (articleObj) => {
  // 定义规则
  const rules = {
    title: {
      presence: {
        allowEmpty: false,
      },
      type: 'string',
      length: {
        minimum: 1,
        maximum: 30 //最多50个文字、或者字母
      }
    },
    introduce: {
      presence: {
        allowEmpty: true
      },
    },
    content: {
      presence: {
        allowEmpty: true,
      },
    },
    categoryId: {
      presence: {
        allowEmpty: false
      }
    },
  }

  const res = validate.validate(articleObj, rules);
  if (res === undefined) {
    const ins = await Article.create(articleObj);
    return ins.toJSON();
  } else {
    return '文章article验证没通过！';
  }
}

// 删除
exports.delArticle = async (ids) => {
  const resp = await ids.reduce(async (acc, id) => {
    const res = await Article.destroy({
      where: {
        id
      }
    })
    if (res !== 0) {
      acc.push(Promise.resolve(res))
    } else {
      acc.push(Promise.reject(res));
    }
    return acc;
  }, []);

  try {
    await Promise.all(resp);
    return 1;
  } catch (error) {
    return "文章已被删除， ";
  }
}

// 修改，根据id修改
exports.updateArticle = async (articleObj) => {
  const res = await Article.update(articleObj, {
    where: {
      id: articleObj.id
    }
  });
  return res;
}



// 查询所有文章
exports.getAllArticle = async (name) => {
  const articles = await Article.findAndCountAll();
  return {
    datas: JSON.parse(JSON.stringify(articles)),
    totals: articles.count
  }
}

/**
 * 分页查询所有文章
 * @param {*} page 查询的页码
 * @param {*} limit 每页多少条
 */
exports.getAllArticleLimit = async (page = 1, limit = 10) => {
  const articles = await Article.findAndCountAll({
    include: [Category],
    limit: +limit,
    offset: (page - 1) * limit,
    order:[
      ['createdAt', 'desc']
    ]
  });
  return {
    datas: JSON.parse(JSON.stringify(articles)),
    totals: articles.count
  }
}

/**
 * 文章点赞
 * @param {*} articleId 文章id
 */
exports.addLike = async (id) => {
  // 先拿到目前的like数
  const { likeNum } = await Article.findByPk(id);
  return await Article.update({ likeNum: likeNum + 1 }, {
    where: {
      id
    }
  });
}

/**
 * 阅读量 + 1
 * @param {*} id 文章id
 */
exports.addReadings = async (id) => {
  // 先拿到目前的阅读量
  const { readNum } = await Article.findByPk(id);
  return await Article.update({ readNum: readNum + 1 }, {
    where: {
      id
    }
  });
}
