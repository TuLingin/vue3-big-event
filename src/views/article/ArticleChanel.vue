<script setup>
import { artGetChanelsService, artDelChanelServiece } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
// import ChanelList from '@/views/article/components/ChanelList'
const list = ref([])
const loading = ref(false)
const getList = async () => {
  loading.value = true
  const res = await artGetChanelsService()
  list.value = res.data.data
  loading.value = false
}
getList()

// const dialogVisible = ref(false)
const dialog = ref()
const onAddChanel = () => {
  // dialogVisible.value = true
  dialog.value.open({})
}
const onEditChannel = (row) => {
  // console.log(row)
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认要删除此分类吗', '删除', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await artDelChanelServiece(row.id)
  ElMessage.success('删除成功')
  getList()
}
const Onsuccess = () => {
  getList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChanel"> 添加分类 </el-button>
    </template>
    <el-table v-loading="loading" :data="list" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <chanel-list ref="dialog" @sucess="Onsuccess"></chanel-list>
    <!-- <el-dialog v-model="dialogVisible" title="添加弹层" width="30%">
      <div>我是内容部分</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary"> 确认 </el-button>
        </span>
      </template>
    </el-dialog> -->
  </page-container>
</template>
