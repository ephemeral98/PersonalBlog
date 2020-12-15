const countDown = 2; // 弹窗消失时间 秒

/**
 * 处理结果弹窗配置
 * @param {*} resp 响应结果
 * @param {*} that Vue组件实例对象
 */
export function handleRes(resp, that) {
  if (resp.status === "success") {
    that.alertConfig.color = "success";
  } else {
    that.alertConfig.color = "danger";
  }
  that.alertConfig.word = resp.msg;
  that.alertConfig.dismissCountDown = countDown;
  let timer = setTimeout(() => {
    clearTimeout(timer);
    that.$router.go(0);
  }, 1000);
}

/**
 * 处理内容为空的消息
 * @param {*} that Vue组件实例对象
 */
export function handleEmpty(that, content = "抱歉，内容不能为空哦") {
  that.alertConfig.color = "warning";
  that.alertConfig.word = content;
  that.alertConfig.dismissCountDown = countDown;
}
