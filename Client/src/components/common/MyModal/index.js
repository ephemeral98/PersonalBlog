import Vue from "vue";
import MyAlert from "./MyAlert.vue";
const MyModal = Vue.extend(MyAlert);
MyModal.install = data => {
  const ins = new MyModal({
    data
  }); // 创建一个实例，并手动挂载
  ins.$mount();
  document.body.appendChild(ins.$el);
};
export default MyModal;
