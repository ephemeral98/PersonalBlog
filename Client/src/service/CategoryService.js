import myAxios from "./Request.js";

// 获取所有分类
async function getAllKind() {
  const url = `/categories/Ba125`;
  const resp = await myAxios.get(url);

  if (resp.data.status === "success") {
    const { totals, datas } = resp.data.data;
    return { totals, datas };
  }
}

export { getAllKind };
