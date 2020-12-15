// 分类管理 请求模块
import myAxios from "./Request.js";

/**
 * 查询所有分类
 */
async function getAllCategory() {
  const url = `/categories`;
  const res = await myAxios().get(url);
  return res.data.data.datas;
}

/**
 * 新增分类
 */
async function addKind({ name }) {
  const url = `/categories`;
  const resp = await myAxios().post(url, {
    name
  });
  return await resp.data;
}

/**
 * 修改分类名字
 * @param {*} oldName 之前的名字
 * @param {*} newName 新名字
 */
async function updateKindName(oldName, newName) {
  const url = `/categories`;
  const resp = await myAxios().put(url, {
    oldName,
    newName
  });
  return await resp.data;
}

/**
 * 根据分类名字 删除分类
 */
async function delKindByName({ name }) {
  console.log(name);
  const url = `/categories`;
  const resp = await myAxios().delete(url, {
    data: {
      name
    }
  });
  return await resp.data;
}

/**
 * 根据分类id 删除分类
 */
async function delKindById(id) {
  const url = `/categories/id`;
  const resp = await myAxios().delete(url, {
    data: {
      id
    }
  });
  return await resp.data;
}

export { getAllCategory, addKind, updateKindName, delKindByName, delKindById };
