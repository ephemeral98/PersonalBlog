import myAxios from "./Request.js";
const url = "/getSKills";

// 获取技能
async function getAllSkills() {
  const resp = await myAxios.get(url);
  if (resp.data.status === "success") {
    return resp.data.data;
  }
}

export { getAllSkills };
