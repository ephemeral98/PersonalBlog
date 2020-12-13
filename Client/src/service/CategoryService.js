import myAxios from "./Request.js";

// 获取所有分类
async function getAllKind() {
  const url = "/categories";
  const resp = await myAxios.get(url);

  if (resp.data.status === "success") {
    const { datas } = resp.data.data;
    return datas;
  }
}

// 获取所有分类 有多少篇文章
async function getAllCount() {
  const url = "/categories/count";
  const resp = await myAxios.get(url);
  if (resp.data.status === "success") {
    return resp.data.data;
  }
}

// 获取一个分类 有多少篇文章
async function getCount(id) {
  const url = `/categories/count/${id}`;
  return await myAxios.get(url);
}

// 获取所有分类以及对应的文章数
async function getAllKindAndCount() {
  const resKind = await getAllKind();
  const resCount = await getAllCount();

  const result = resKind.map(kind => {
    const res = resCount
      .map(item => {
        if (kind.id === item.id) {
          kind.count = item.count;
          return {
            id: kind.id,
            name: kind.name,
            count: kind.count
          };
        }
      })
      .filter(item => item);
    return res;
  });
  return result.flat();
}

export { getAllKind, getCount, getAllCount, getAllKindAndCount };
