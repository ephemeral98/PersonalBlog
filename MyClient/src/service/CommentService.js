// 评论区管理 请求模块
import myAxios from "./Request.js";
import * as tools from "./tools.js";

/**
 * 分段获取评论内容
 * @param {*} start 从哪条开始
 * @param {*} limit 获取几条
 * @param {*} blogId 文章id
 */
async function getGuestArea(start, limit, blogId) {
  // console.log(start, limit, blogId);
  const url = `/comment`;
  const resp = await myAxios().get(url, {
    params: {
      start,
      limit,
      blogId
    }
  });
  if (resp.data.status === "success") {
    const { floorsCount, datas } = resp.data.data;
    return {
      floorsCount,
      commentsCount: datas.length,
      datas: tools.commentHelper(datas)
    };
  }
}

// 添加新评论
async function addNewComment({
  blogId,
  parent,
  nickName,
  commentContent,
  email,
  toWho,
  tag = "1"
}) {
  const url = `/comment`;
  const resp = await myAxios().post(url, {
    blogId,
    parent,
    name: nickName,
    content: commentContent,
    email,
    toWho,
    tag
  });
  return resp;
}

// 删除评论
async function delComment(id) {
  const url = `/comment`;
  return await myAxios().delete(url, {
    data: {
      id
    }
  });
}

// 批量删除评论
async function delManyComment(users) {
  // 遍历users，如果是层主，拿到他的reply
  const ids = [];
  const countReplys = [];
  users.forEach(user => {
    ids.push(user.id);
    // 如果是层主，则把该层对应的回复也删除
    if (user.reply) {
      countReplys.push(...user.reply);
    }
  });
  countReplys.forEach(reply => {
    if (!ids.includes(reply.id)) {
      ids.push(reply.id);
    }
  });

  const url = `/comment/many`;
  return await myAxios().delete(url, {
    data: {
      ids
    }
  });
}

export { getGuestArea, addNewComment, delComment, delManyComment };
