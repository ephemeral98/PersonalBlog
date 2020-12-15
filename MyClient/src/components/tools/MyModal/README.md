# MyModal 使用说明：

## 具名插槽
### v-slot:title
- 插入标题

### v-slot:content
- 插入内容

### v-slot:controlBtn
- 插入按钮（确认和取消 等）

栗子：
```html
<template v-slot:title>
  <div class="title">来自管理员的提醒</div>
</template>
<template v-slot:content>
  <div id="editor"></div>
</template>
<template v-slot:controlBtn>
  <button class="confirm_btn" @click="confirmBtn">确定修改</button>
  <button class="cancel_btn" @click="introModal = false">取消</button>
</template>
```


## 参数
### basicConfig
- 类型：object

- msg: 是否为消息框
  - 类型：boolean

- modalStyle: 样式
  - 类型：object
  - 只建议设置: boxShadow 默认```boxShadow: '0 0 20px skyblue'```

## 事件
- @close-modal
 - 可触发点击遮罩层关闭弹窗

## 如果设置了过度动画：
```
.v-enter-to,
.v-leave-to {
  @include modal__center;
}
```
## 完整案例：
```html
<IntroduceModal
  :basicConfig="successMsgModal"
  v-if="succMsg"
  @close-modal="succMsg = false"
  key="success"
>
  <template #title>
    来自管理员的提醒
  </template>
  <template v-slot:content>
    <div>
      修改成功！
    </div>
  </template>
  <template v-slot:controlBtn>
    <button class="cancel_btn" @click="succMsg = false">Ok</button>
  </template>
</IntroduceModal>
```

PS：如果不是消息框(msg:false或者没设置)，content 的尺寸要另外自行设置
