import myAxios from "./Request";

// 获取我的信息
export default async function getAbout() {
  const url = "/admin/whoami";
  const resp = await myAxios.get(url);
  return resp;
}
