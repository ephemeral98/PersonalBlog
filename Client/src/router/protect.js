import router from "./router.js";
import MyModal from "@/components/common/MyModal";

router.beforeEach((to, from, next) => {
  if (to.name === "timeTravel") {
    const data = {
      isShow: true
    };
    MyModal.install(data);
    next(false);
  } else {
    next();
  }
});
