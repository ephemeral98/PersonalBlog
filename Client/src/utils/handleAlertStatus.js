const countDown = 2300; // 弹窗消失时间 秒

/**
 * 处理结果弹窗配置
 * @param {Object} type 响应结果
 * @param {Object} that Vue组件实例对象
 * @param {String} succMsg 成功的消息
 * @param {String} failMsg 失败的消息
 * @param {Boolean} isReflash 是否刷新页面
 */
export function handleRes(
  that,
  type,
  succMsg = "成功",
  failMsg = "失败",
  isReflash = true
) {
  if (type === "success") {
    that.alertConfig.type = "success";
    that.alertConfig.alertColor = "green";
    that.alertConfig.alertContent = succMsg;
  } else {
    that.alertConfig.type = "error";
    that.alertConfig.alertColor = "red";
    that.alertConfig.alertContent = failMsg;
  }
  that.alertConfig.isShowAlert = true;
  const timer = setTimeout(() => {
    clearTimeout(timer);
    that.alertConfig.isShowAlert = false;
    isReflash && that.$router.go(0);
  }, countDown);
}

/**
 * 处理内容为空的消息
 * @param {Object} that Vue组件实例对象
 * @param {String} content 警告的内容
 */
export function handleEmpty(that, content = "抱歉，内容不能为空哦") {
  console.log(that.alertConfig);
  that.alertConfig.type = "error";
  that.alertConfig.alertColor = "red";
  that.alertConfig.alertContent = content;
  that.alertConfig.isShowAlert = true;

  const timer = setTimeout(() => {
    clearTimeout(timer);
    that.alertConfig.isShowAlert = false;
  }, countDown);
}
