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
    <div v-else class="text-center">加载中...</div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'

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
  const columnWidth = ref(1)
  // 列间距总宽度
  const columnSpacingTotal = computed(() => {
    return (props.column - 1) * props.columnSpacing
  })
  // 计算列宽
  const useColumnWidth = () => {
    useContainerWidth()  // 计算容器宽度
    columnWidth.value = parseFloat((containerWidth.value - columnSpacingTotal.value) / props.column)
  }

  onMounted(() => {
    useColumnWidth()  // 计算列宽
  })
</script>
