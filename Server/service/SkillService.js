const Skill = require('../model/Skill.js');

// 修改某技能level
const updateLevel = async (skillObj) => {
  try {
    await Skill.update(skillObj, {
      where: {
        id: skillObj.id
      }
    });
  } catch (err) {
    return '修改技能失败' + err;
  }
  return '修改技能成功';
}

// 查看全部主要技能
async function getMainSkills() {
  let resp;
  try {
    resp = await Skill.findAndCountAll({
      where:{
        ex: 0
      }
    });
  } catch (err) {
    return '获取技能失败' + err;
  }

  // 如果一个技能都没有，则初始化技能树（有bug，想了想好像也没必要用到，所以暂不解决）
  if (resp.count === 0) {
    await createSKillTree();
  }

  return {
    totals: resp.count,
    datas: JSON.parse(JSON.stringify(resp.rows))
  }
}

// 查看ex技能
async function getExSkills() {
  let resp;
  try {
    resp = await Skill.findAndCountAll({
      where: {
        ex: 1
      }
    });
  } catch (err) {
    return '获取ex技能失败' + err;
  }
  return {
    totals: resp.count,
    datas: JSON.parse(JSON.stringify(resp.rows))
  }
}

// 初始化技能树
async function createSKillTree() {
  // 新建
  const skillList = [
  {
    name: "html",
    level: 1,
    ex: 0
  },
  {
    name: "javascript",
    level: 1,
    ex: 0
  },
  {
    name: "css",
    level: 1,
    ex: 0
  },
  {
    name: "jquery",
    level: 1,
    ex: 0
  },
  {
    name: "bootstrap",
    level: 1,
    ex: 0
  },
  {
    name: "mpvue",
    level: 1,
    ex: 0
  },
  {
    name: "net",
    level: 1,
    ex: 0
  },
  {
    name: "mock",
    level: 1,
    ex: 0
  },
  {
    name: "uniapp",
    level: 1,
    ex: 0
  },
  {
    name: "webpack",
    level: 1,
    ex: 0
  },
  {
    name: "sass",
    level: 1,
    ex: 0
  },
  {
    name: "less",
    level: 1,
    ex: 0
  },
  {
    name: "postcss",
    level: 0,
    ex: 0
  },
  {
    name: "stylus",
    level: 0,
    ex: 0
  },
  {
    name: "vue",
    level: 1,
    ex: 0
  },
  {
    name: "element",
    level: 1,
    ex: 0
  },
  {
    name: "vuetify",
    level: 1,
    ex: 0
  },
  {
    name: "vuessr",
    level: 0,
    ex: 0
  },
  {
    name: "nuxt",
    level: 0,
    ex: 0
  },
  {
    name: "sql",
    level: 1,
    ex: 0
  },
  {
    name: "node",
    level: 1,
    ex: 0
  },
  {
    name: "express",
    level: 1,
    ex: 0
  },
  {
    name: "koa",
    level: 0,
    ex: 0
  },
  {
    name: "egg",
    level: 0,
    ex: 0
  },
  {
    name: "nest",
    level: 0,
    ex: 0
  },
  {
    name: "mysql",
    level: 1,
    ex: 0
  },
  {
    name: "mongodb",
    level: 0,
    ex: 0
  },
  {
    name: "sequelize",
    level: 1,
    ex: 0
  },
  {
    name: "mongoose",
    level: 0,
    ex: 0
  },
  {
    name: "taro",
    level: 1,
    ex: 0
  },
  {
    name: "react",
    level: 1,
    ex: 0
  },
  {
    name: "reactssr",
    level: 0,
    ex: 0
  },
  {
    name: "next",
    level: 0,
    ex: 0
  },
  {
    name: "antdesign",
    level: 1,
    ex: 0
  },
  {
    name: "ts",
    level: 1,
    ex: 0
  },
  {
    name: "miniapp",
    level: 1,
    ex: 0
  },
  {
    name: "rn",
    level: 0,
    ex: 0
  },
  {
    name: "flutter",
    level: 0,
    ex: 0
  },
  {
    name: "electron",
    level: 0,
    ex: 0
  },
  {
    name: "webGl",
    level: 0,
    ex: 0
  },
  {
    name: "vite",
    level: 1,
    ex: 0
  },
  {
    name: "grunt",
    level: 0,
    ex: 0
  },
  {
    name: "gulp",
    level: 1,
    ex: 0
  },
  {
    name: "echarts",
    level: 1,
    ex: 0
  },
  {
    name: "angular",
    level: 0,
    ex: 0
  }];
  const exSkill = [
  {
    name: "docker",
    level: "Lv0",
    ex: 1
  },
  {
    name: "linux",
    level: "Lv0",
    ex: 1
  },
  {
    name: "photoshop",
    level: "Lv1",
    ex: 1
  },
  {
    name: "Git",
    level: "Lv1",
    ex: 1
  },
  {
    name: "SVN",
    level: "Lv1",
    ex: 1
  }]

  const acc = [];
  const mainSkills = skillList.map(async s => {
    try {
      const res = await Skill.create(s);
      acc.push(Promise.resolve(res))
    } catch (err) {
      acc.push(Promise.reject(res))
    }
    return acc;
  });
  const exSkills = exSkill.map(async s => {
    try {
      const res = await Skill.create(s);
      acc.push(Promise.resolve(res))
    } catch (err) {
      acc.push(Promise.reject(res))
    }
    return acc;
  })
  const createAll = [...mainSkills, ...exSkills];
  await Promise.all(createAll);
  // 不知道为什么，这里用 reduce 累加，报错：promise is not iterable。。。，可是我返回的一直是acc啊，它是一个数组啊，怎么变成了Promise了。。？
}


module.exports = {
  updateLevel,
  getMainSkills,
  getExSkills
}
