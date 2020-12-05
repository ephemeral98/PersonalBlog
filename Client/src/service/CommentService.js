import myAxios from "./Request.js";
import * as tools from "./tools.js";

// 获取留言板所有内容
async function getAllGuest() {
  const url = `./test.json`;
  const resp = await fetch(url);
  const res = await resp.json();
  console.log(res);
}

// 分段获取留言板内容
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
async function addNewComment(blogId, parent, name, content, email) {
  const url = `/comment`;
  const resp = await myAxios.post(url, {
    name,
    content,
    email,
    blogId,
    parent,
    tag: "1"
  });
  return resp;
}

export { getGuestArea, getAllGuest, addNewComment };
