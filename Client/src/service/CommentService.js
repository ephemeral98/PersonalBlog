import myAxios from "./Request.js";
import * as tools from "./tools.js";

/**
 * 分段获取评论内容
 * @param {*} start 从哪条开始
 * @param {*} limit 获取几条
 * @param {*} blogId 文章id
 */
async function getGuestArea(start, limit, blogId) {
  const url = `/comment`;
  const resp = await myAxios.get(url, {
    params: {
      start,
      limit,
      blogId
    }
  });
  // console.log(resp);
  if (resp.data.status === "success") {
    const { floorsCount, datas } = resp.data.data;
    return {
      floorsCount,
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
  tag = "1",
  loadTimes,
  limit
}) {
  const url = `/comment`;
  console.log(nickName);
  // console.log(blogId, parent, nickName, commentContent, email, toWho, tag);
  const resp = await myAxios.post(url, {
    blogId,
    parent,
    name: nickName,
    content: commentContent,
    email,
    toWho,
    tag,
    start: loadTimes,
    limit
  });
  return resp;
}

export { getGuestArea, addNewComment };
