const validate = require('validate.js');
// 管理员初先始化
const Article = require('../model/Article.js');

// 根据 分类 去查询所有文章
exports.getArticleByKind = async (articlesObj) => {
  const res = await Article.findAndCountAll({
    where: {
      categoryName: articlesObj.kindName,
    }
  });
  if (res) {
    return {
      totols: res.count,
      datas: JSON.parse(JSON.stringify(res.rows))
    }
  } else {
    return "找不到该分类下的文章, "
  }
}



// 根据 loginId 和 文章标题 去查询
exports.getArticleByTitle = async (articlesObj) => {
  const res = await Article.findOne({
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
        maximum: 20 //最多20个文字、或者字母
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
    IssuesId: {
      /*   presence: {
          allowEmpty: true,
        } */
    },
    categoryName: {
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

// 分页查询所有文章
exports.getAllArticleLimit = async (title = '无标题', content = '还没开始写呢', commentId, kind, wordNum, readNum, surface, toTop = 0) => {
  const condiction = {
    kind,
    wordNum,
    readNum,
    surface,
  };
  if (title) {
    condiction.title = title;
  }
  if (content) {
    condiction.content = content;
  }
  if (commentId) {
    condiction.commentId = commentId;
  }
  if (toTop) {
    condiction.toTop = toTop;
  }
  const res = await Article.findAll({
    where: condiction,
    limit: +limit,
    offset: (page - 1) * offset
  });
  return {
    datas: JSON.parse(JSON.stringify(res.rows))
  }
}
