<script setup>
import { artGetChanelsService } from '@/api/article'
import { ref } from 'vue'

const articleList = ref([])
defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})
// const emit = defineEmits(['update:modelValue'])
const emit = defineEmits(['update:modelValue'])
const getList = async () => {
  const res = await artGetChanelsService()
  articleList.value = res.data.data
}
getList()
</script>
<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="item in articleList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
