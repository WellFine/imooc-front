<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[typeEnum[type], sizeEnum[realSize].button, {
      'active:scale-105': isActiveAnimation
    }]"
    @click.stop="onBtnClick"
  >
    <!-- loading -->
    <m-svg-icon v-if="loading" name="loading" class="w-2 h-2 animate-spin mr-1" />
    <!-- icon 按钮 -->
    <m-svg-icon
      v-if="icon" :name="icon"
      class="m-auto" :class="sizeEnum[realSize].icon"
      :color="iconColor" :fillClass="iconClass"
    />
    <!-- 文字按钮 -->
    <slot v-else />
  </button>
</template>

<script>  // setup 中主要处理逻辑，所以类型定义放在这个 script 中
  // type 可选项：表示按钮风格
  const typeEnum = {
    primary: 'text-white bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
    main: 'text-white bg-main dark:bg-zinc-900 hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700',
    info: 'text-zinc-800 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700'
  }
  // size 可选项：表示按钮大小，要区分按钮大小和 icon 大小
  const sizeEnum = {
    default: {  // 文字按钮默认
      button: 'w-8 h-4 text-base',
      icon: ''
    },
    'icon-default': {  // icon 按钮默认
      button: 'w-4 h-4',
      icon: 'w-1.5 h-1.5'
    },
    small: {
      button: 'w-7 h-3 text-base',
      icon: ''
    },
    'icon-small': {
      button: 'w-3 h-3',
      icon: 'w-1.5 h-1.5'
    }
  }
</script>
<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    icon: String,  // icon 图标
    iconColor: String,  // icon 颜色
    iconClass: String,  // tailwind 指定 icon 类名
    type: {  // 按钮风格
      type: String,
      default: 'main',
      validator (val) {
        const keys = Object.keys(typeEnum)
        const result = keys.includes(val)
        if (!result) throw new Error(`type 必须是 ${keys.join('、')} 其中一个`)
        return result
      }
    },
    size: {  // 大小风格
      type: String,
      default: 'default',
      validator (val) {
        // 拿到 sizeEnum 中不含 'icon' 的枚举项，因为即使是 icon 按钮，size 也不需要传 'icon-' 前缀
        const keys = Object.keys(sizeEnum).filter(key => !key.includes('icon'))
        const result = keys.includes(val)
        if (!result) throw new Error(`size 必须是 ${keys.join('、')} 其中一个`)
        return result
      }
    },
    isActiveAnimation: {  // 按钮点击时，是否需要动画
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  })

  const emits = defineEmits(['click'])

  // props.icon 有值就是 icon 按钮，拼接上 icon- 作为真实 size
  const realSize = computed(() => props.icon ? `icon-${props.size}` : props.size)

  // 点击事件处理
  const onBtnClick = () => {
    if (props.loading) return  // loading 状态不响应点击事件
    emits('click')
  }
</script>
