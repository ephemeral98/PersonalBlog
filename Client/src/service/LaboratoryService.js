import myAxios from "./Request.js";

/**
 * 告白信
 * @param {String} me 我的QQ或邮箱
 * @returns
 */
async function marriage(me, ta, taName, talkAbout) {
  const url = "/marriage";
  const resp = await myAxios.post(url, {
    me,
    ta,
    taName,
    talkAbout
  });
  return await resp.data;
}

export { marriage };
