/**
 * 美化checkbox
 * @param {string} wrapper 父节点
 * @param {string} selColor 选中的颜色
 */
function beautyCheckbox(wrapper, selColor, gen = 1) {
  const wrap = document.querySelector(wrapper);
  const lis = wrap.querySelectorAll('input[type="checkbox"]');
  lis.forEach(item => {
    //   item.style.width = 0;
    item.style.display = "none";
    let oldBgColor;
    item.addEventListener("click", function () {
      let newGen = gen; // 保存闭包
      let parent = this.parentElement;
      if (newGen === gen) {
        // 在第一次点击的时候保存原来的背景色，安全保存到闭包外面
        oldBgColor = getComputedStyle(parent).backgroundColor;
      }
      // eslint-disable-next-line no-constant-condition
      while (true) {
        newGen = newGen - 1;
        if (newGen <= 0) {
          break;
        }
        parent = parent.parentElement;
      }
      if (this.checked) {
        parent.style.backgroundColor = selColor;
      } else {
        parent.style.backgroundColor = oldBgColor;
      }
    });
  });
}

export { beautyCheckbox };
