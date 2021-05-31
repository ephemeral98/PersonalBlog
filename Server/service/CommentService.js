const validate = require('validate.js');
// 管理员初先始化
const Comment = require('../model/Comment.js');
const { Op } = require("sequelize");


/**
 * 获取 留言板 指定量的留言 以及对应它的所有回复
 * @param {*} guestObj.start 第几次加载
 * @param {*} guestObj.limit 每次加载多少条
 * @param {*} guestObj.blogId 哪里的评论，默认为-1：留言板的
 */
exports.getCommentArea = async (guestObj) => {
  const { start, limit, blogId } = guestObj;
  // 获取评论
  const floor = await Comment.findAndCountAll({
    where: {
      blogId: blogId || -1, // 默认是留言板的
      parent: -1 // 层主
    },
    limit: start * limit,
    offset: 0,
    order:[
      ['createdAt', 'desc']
    ]
  });

  // 获取回复
  const reply = await Comment.findAndCountAll({
    where: {
      blogId: blogId || -1, // 留言板的
      parent: {
        [Op.and]: {
          [Op.gte]: 1,
          // [Op.lte]: start * limit  //要限制最大值的话，只能吧最后一个层主的id作为max
        }
      }
    }
  });

  // console.log(floor, reply);
  const datas = [
    ...floor.rows,
    ...reply.rows
  ]

  const res = {
    floorsCount: floor.count,
    datas: JSON.parse(JSON.stringify(datas))
  }

  return res || "获取留言失败, ";

}


// 提交评论（增加一条评论）
exports.submitComment = async (commentObj) => {
  const rules = {
    content: {
      presence: {
        allowEmpty: false,
        length:{
          maximun:300
        }
      }
    },
    blogId: {
      presence: {
        allowEmpty: false,
      }
    },
    parent: {
      presence: {
        allowEmpty: false
      }
    },
    tag: {
      presence: {
        allowEmpty: false
      }

    }
  }
  const res = validate.validate(commentObj, rules);
  if (res === undefined) {
    const ins = await Comment.create(commentObj);
    return ins.toJSON();
  } else {
    return "评论规则没通过，";
  }
}


// 查询某文章下的所有评论
exports.getAllComments = async (blogId) => {
  const comments = await Comment.findAndCountAll({
    where: {
      blogId
    }
  });
  if (comments) {
    return {
      datas: JSON.parse(JSON.stringify(comments)),
      count: comments.count,
    }
  }
  return null;
}


// 删除一个评论
exports.delComment = async (id) => {
  // 先判断评论还在不在先
  const result = await Comment.findByPk(id);
  if (!result) {
    return '评论已经被删除！ ';
  }
  return await Comment.destroy({
    where: {
      id
    }
  })
}

// 批量删除评论
exports.delManyComments = async (ids) => {
  const count = [];

  for (let i = 0, len = ids.length; i < len; i++) {
    const res = await Comment.destroy({
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
    return 1;
  } catch (error) {
    return "评论已被删除， ";
  }
}
