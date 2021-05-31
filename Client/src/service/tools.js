import myAxios from "./Request.js";

/**
 * 获取阿拉伯数字的时间格式
 * @param {*} time 时间戳或者格林威治时间格式都行
 */
function getNumDate(time) {
  const year = new Date(time).getFullYear();
  const month = new Date(time).getMonth() + 1;
  const date = new Date(time).getDate();
  const hour = new Date(time).getHours();
  const min = new Date(time).getMinutes();
  const sec = new Date(time).getSeconds();
  return {
    year,
    month,
    date,
    hour,
    min,
    sec
  };
}

/**
 * 获取英语日期简写
 * @param {*} time 时间戳或者格林威治时间格式都行
 */
function getEnDate(time) {
  let { year, month, date, hour, min, sec } = getNumDate(time);
  if (month == "1") {
    month = "Jan";
  } else if (month == "2") {
    month = "Feb";
  } else if (month == "3") {
    month = "Mar";
  } else if (month == "4") {
    month = "Apr";
  } else if (month == "5") {
    month = "May";
  } else if (month == "6") {
    month = "Jun";
  } else if (month == "7") {
    month = "Jul";
  } else if (month == "8") {
    month = "Aug";
  } else if (month == "9") {
    month = "Sep";
  } else if (month == "10") {
    month = "Oct";
  } else if (month == "11") {
    month = "Nov";
  } else if (month == "12") {
    month = "Dec";
  }

  if (date == "1" || date == "21" || date == "31") {
    date += "st";
  } else if (date == "2" || date == "22") {
    date += "nd";
  } else if (date == "3" || date == "23") {
    date += "rd";
  } else {
    date += "th";
  }

  return {
    year,
    month,
    date,
    hour,
    min,
    sec
  };
}

/**
 * 获取有需要的文章数据
 * @param {*} url 请求地址
 * @param {*} params 请求参数
 */
async function getNeeded(url, params) {
  const resp = await myAxios.get(url, params);
  if (resp.data.status === "success") {
    const count = resp.data.data.totals;
    const infos = resp.data.data.datas.rows || resp.data.data.datas;
    const artList = infos.map(art => {
      const { id, title, introduce, category, face, createdAt } = art;
      return {
        id,
        title,
        introduce,
        category,
        face,
        ...getEnDate(createdAt)
      };
    });
    return {
      artList,
      count
    };
  } else {
    console.log("获取文章列表失败");
  }
}

/**
 * 获取评论区需要的数据格式
 * @param {*} data 后端返回的数组
 */
function commentHelper(originData) {
  // 取出 parent 不是 -1 的数组（那些回复）
  const replyData = originData.filter(item =>
    item.parent != -1 ? item : null
  );
  // 先将那些 parent 不是 -1 的数组去重（筛选出回复代表）
  const uniqueData = [];
  for (let i = 0, len = replyData.length; i < len; i++) {
    for (let j = i + 1, jLen = replyData.length + 1; j < jLen; j++) {
      if (replyData[j]) {
        if (replyData[i].parent === replyData[j].parent) {
          break;
        }
      }
      if (j === replyData.length) {
        uniqueData.push(replyData[i]);
      }
    }
  }

  // 找同类算法（那些相同的回复组队）
  const replySameParent = [];
  for (let i = 0, len = uniqueData.length; i < len; i++) {
    const count = [];

    for (let j = 0, len = originData.length; j < len; j++) {
      if (uniqueData[i].parent === originData[j].parent) {
        // 在归队之前，先把时间的格式弄一弄
        const { year, month, date, hour, min, sec } = getEnDate(
          originData[j].createdAt
        );
        originData[j].year = year;
        originData[j].month = month;
        originData[j].date = date;
        originData[j].hour = hour;
        originData[j].min = min;
        originData[j].sec = sec;

        count.push(originData[j]);
      }
    }
    // 把那些回复进行 时间倒序
    count.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    replySameParent.push(count);
  }
  // 取出 parent 是 -1 的数组（层主），再按照 时间倒序
  const floor = originData
    .filter(item => (item.parent == -1 ? item : null))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .map(f => {
      // 层主的时间格式也弄一弄
      const { year, month, date, hour, min, sec } = getEnDate(f.createdAt);
      f.year = year;
      f.month = month;
      f.date = date;
      f.hour = hour;
      f.min = min;
      f.sec = sec;
      return f;
    });

  // 如果有真有回复 帮助那班 parent 不是 -1 的数组找大佬（帮回复找层主）
  if (replySameParent.length > 0) {
    let res = [];
    replySameParent.forEach(reply => {
      res = floor.map(f => {
        if (reply[0].parent == f.id) {
          f.reply = reply;
        }
        return f;
      });
    });
    return res;
  }
  return floor;
}

export { getNeeded, commentHelper, getNumDate, getEnDate };
