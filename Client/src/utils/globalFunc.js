// 全局函数

/**
 * 获取某区域内的随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 判断屏幕大小
 * @returns {String} pc mobile
 */
function getClientSize() {
  const _clientWidth = document.body.clientWidth;
  return _clientWidth >= 600 ? "pc" : "mobile";
}

/**
 * 打字效果
 * @param {Element} ele 给哪个DOM加打字效果
 * @param {String} word 打字内容
 * @param {Boolean} isBreak 是否有停顿
 * @param {Number} breakPoint 停下来的点
 * @param {Number} inTime 输入每个字所的花费的时间 毫秒
 * @param {Number} outTime 删除每个字所花费的时间 毫秒
 * @param {Boolean} isMinus 是否有删除动效
 * @param {Function} callback 如果没有删除动效，则可以执行回调函数
 */
function typing(
  ele,
  word = "",
  isBreak,
  breakPoint,
  inTime = 200,
  outTime = 80,
  isMinus = true,
  callback
) {
  // let count = 0;
  plus();

  function plus() {
    clearInterval(window.plusTimer);
    // count++;
    let i = 1;
    let j = 0;
    let k = 0;
    window.plusTimer = setInterval(() => {
      if (isBreak) {
        const b = breakPoint || 3;
        j++;
        if (j == b + 1) {
          ele.innerText = word.slice(0, b) + "_";
          return;
        }
        if (j == b + 2) {
          ele.innerText = word.slice(0, b) + " ";
          return;
        }
        if (j == b + 3) {
          ele.innerText = word.slice(0, b) + "_";
          return;
        }
        if (j == b + 4) {
          ele.innerText = word.slice(0, b) + " ";
          return;
        }
        if (j === b + 5) {
          ele.innerText = word.slice(0, b) + "_";
          return;
        }
      }
      let res = word.slice(0, i) + "_";
      i++;
      if (i >= word.length + 1) {
        res = word;
        k++;
        if (k >= 1 && k <= 5) {
          ele.innerText = res;
          return;
        }
        clearInterval(window.plusTimer);
        // 控制次数
        // if (count <= 2) {
        isMinus ? minus() : callback && callback();
        // }
      }
      ele.innerText = res;
    }, inTime);
  }

  function minus() {
    clearInterval(window.minusTimer);

    let i = word.length - 1;
    window.minusTimer = setInterval(() => {
      let res = word.slice(0, i) + "|";
      i--;
      if (i < 0) {
        clearInterval(window.minusTimer);
        plus();
      }
      ele.innerText = res;
    }, outTime);
  }
}

export { getRandom, getClientSize, typing };
