<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { artGetListService, artDelArticleService } from '@/api/article'
import ArticleList from './components/ArticleList.vue'
import ArticleEdit from './components/ArticleEdit.vue'
import { formatTime } from '@/utils/format'
// 假数据
const articleList = ref([])
const total = ref(0)
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const loading = ref(false)
const getList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  loading.value = false
  // articleList.value.pup_data = format(articleList.value.pup_data)

  total.value = res.data.total
  // articleList.value.pup_data
}
getList()
const handleSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getList()
}
const handleCurrentChange = (size) => {
  params.value.pagenum = size
  getList()
}
const onSearch = () => {
  params.value.pagenum = 1
  getList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getList()
}
const refEdit = ref()
const onAdd = () => {
  refEdit.value.open({})
}
const onEditArticle = (row) => {
  refEdit.value.open(row)
}
const onDeleteArticle = async (row) => {
  await artDelArticleService(row.id)
  ElMessage.success('删除成功')
  getList()
}
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，最好渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    // 更新成最大页码数，再渲染
    params.value.pagenum = lastPage
  }
  console.log('回想')
  getList()
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAdd()"> 添加文章 </el-button>
    </template>
    <ArticleEdit ref="refEdit" @success="onSuccess"></ArticleEdit>
    <el-form inline>
      <el-form-item label="文章分类：">
        <ArticleList v-model="params.cate_id"></ArticleList>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column label="文章标题" width="300">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date" width="200">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :small="small"
      :disabled="disabled"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </page-container>
</template>
