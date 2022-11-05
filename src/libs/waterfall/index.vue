<template>
  <div
    class="relative" ref="containerTarget"
    :style="{ height: containerHeight + 'px' }"
  >
    <!-- 数据渲染，有数据并且计算好列宽后才展示 -->
    <template v-if="data.length && columnWidth">
      <!-- m-waterfall-item 类名不包含样式，用于 dom API 获取每一个 item -->
      <div
        v-for="(item, index) in data" :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{ width: columnWidth + 'px', top: item._style?.top + 'px', left: item._style?.left + 'px' }"
      >
        <slot :item="item" :index="index" :width="columnWidth" />
      </div>
    </template>
    <!-- 加载中提示 -->
    <!-- <div v-else class="text-center">加载中...</div> -->
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue'
  import { getImgElements, getAllImg, onCompleteImgs, getMinHeight, getMaxHeight, getMinHeightColumn } from './utils'

  const props = defineProps({
    data: {  // 数据源
      type: Array,
      required: true
    },
    nodeKey: String,  // 唯一标识 key
    column: {  // 列数
      type: Number,
      default: 2
    },
    columnSpacing: {  // 列间距
      type: Number,
      default: 20
    },
    rowSpacing: {  // 行间距
      type: Number,
      default: 20
    },
    picturePreReading: {  // 是否需要进行图片预加载
      type: Boolean,
      default: true
    }
  })

  // 容器总高度 = 最高列的高度
  const containerHeight = ref(0)
  // 每列高度对象，key 所在列下标，value 列高
  const columnHeightObj = ref({})
  // 初始化每列高度
  const useColumnHeightObj = () => {
    columnHeightObj.value = {}
    for (let i = 0; i < props.column; i++) {
      columnHeightObj.value[i] = 0
    }
  }

  // 容器实例
  const containerTarget = ref(null)
  // 容器内容宽度，不含 padding、border、margin
  const containerWidth = ref(0)
  // 容器左边距，用于计算 item 的 left
  const containerLeft = ref(0)
  // 计算容器宽度
  const useContainerWidth = () => {
    const { paddingLeft, paddingRight } = getComputedStyle(containerTarget.value, null)
    containerLeft.value = parseFloat(paddingLeft)
    containerWidth.value = containerTarget.value.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
  }

  // 列宽 = (容器宽度 - 所有列间距宽度) / 列数
  const columnWidth = ref(0)
  // 列间距总宽度
  const columnSpacingTotal = computed(() => {
    return (props.column - 1) * props.columnSpacing
  })
  // 计算列宽
  const useColumnWidth = () => {
    useContainerWidth()  // 计算容器宽度
    columnWidth.value = parseFloat((containerWidth.value - columnSpacingTotal.value) / props.column)
  }

  // item 高度集合
  let itemHeights = []
  // 需要图片预加载时图片高度未知，监听图片加载完成来获取高度
  const waitImgComplete = () => {
    // 用预留的类名拿到所有 item 元素
    const itemElements = document.querySelectorAll('.m-waterfall-item')
    // 获取所有元素对应的 img 标签
    const imgElements = getImgElements(itemElements)
    // 获取所有 img 标签的图片链接
    const allImgs = getAllImg(imgElements)
    // 等待图片加载完成
    onCompleteImgs(allImgs).then(() => {
      // 图片加载完成
      itemHeights = []
      itemElements.forEach(el => {
        itemHeights.push(el.offsetHeight)
      })
      // 渲染位置
      useItemLocation()
    })
  }

  // 不需要图片预加载
  const useImgHeight = () => {
    itemHeights = []
    // 用预留的类名拿到所有 item 元素
    const itemElements = document.querySelectorAll('.m-waterfall-item')
    // 不需要图片预加载时图片高度已知，直接拿即可
    itemElements.forEach(el => {
      itemHeights.push(el.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
  }

  // 渲染 item 位置
  const useItemLocation = () => {
    props.data.forEach((item, index) => {
      if (item._style) return  // 避免重复计算
      item._style = {
        top: getItemTop(),
        left: getItemLeft()
      }
      // 让 item 插入的列高度增加
      increasingHeight(index)
    })
    // 所有 item 位置计算好后，指定容器高度，也就是最大列高度
    containerHeight.value = getMaxHeight(columnHeightObj.value)
  }

  // 返回当前要排列 item 的 top
  const getItemTop = () => {
    // top = 最小高度列高度
    return getMinHeight(columnHeightObj.value)
  }

  // 返回当前要排列 item 的 left
  const getItemLeft = () => {
    // 拿到最小高度的列下标，item 将插入到该列下
    const column = getMinHeightColumn(columnHeightObj.value)
    // left = 列下标值（表示前面有多少列）*（列宽度 + 列间距） + 容器左边距
    return column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  }
  
  // 让 item 插入的最小高度列高度增加
  const increasingHeight = index => {
    // 最小高度列下标
    const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
    // 增加值为 item 高度 + 行间距
    columnHeightObj.value[minHeightColumn] += (itemHeights[index] + props.rowSpacing)
  }

  // 触发计算
  watch(() => props.data, val => {
    // 第一次获取数据时，构建高度记录容器
    const resetColumnHeight = val.every(item => !item._style)
    if (resetColumnHeight) useColumnHeightObj()

    nextTick(() => {
      if (props.picturePreReading) waitImgComplete()
      else useImgHeight()
    })
  }, {
    deep: true,  // props.data 是数组，进行深度监听
    immediate: true
  })

  // 重新构建瀑布流
  const reset = () => {
    setTimeout(() => {
      useColumnWidth()  // 重新计算列宽
      props.data.forEach(item => {  // 重置定位数据，重置后监听 props.data 的 watch 会重新触发，计算定位数据
        item._style = null
      })
    }, 200)  // 200ms 给 item 重新渲染，然后重新计算 item 宽度
  }

  // 监听列数变化，重新计算 item 位置以实现响应式效果
  watch(() => props.column, () => {
    if (props.picturePreReading) {
      columnWidth.value = 0  // 将列宽置为空使模板消失显示加载中
    }
    reset()
  })

  onMounted(() => {
    useColumnWidth()  // 计算列宽
  })
  onUnmounted(() => {
    props.data.forEach(item => {
      delete item._style  // 组件销毁时，消除所有 _style
    })
  })
</script>
