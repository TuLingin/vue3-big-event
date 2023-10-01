<script setup>
import { ref } from 'vue'
import ArticleList from './ArticleList.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { baseURL } from '@/utils/request'
import {
  artAddArticleService,
  artEditArticleService,
  artGetArticleService
} from '@/api/article'
import axios from 'axios'
const defaultModel = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
const formModel = ref({
  ...defaultModel
})
const visibleDrawer = ref(false)
const refQuill = ref()
// const emit = defineEmits(['success'])
const emit = defineEmits(['success'])
const open = async (row) => {
  console.log(row)
  visibleDrawer.value = true
  if (row.id) {
    const res = await artGetArticleService(row.id)
    console.log(res, row.id)
    formModel.value = res.data.data
    imgUrl.value = baseURL + res.data.data.cover_img
    const file = await imageUrlToFileObject(imgUrl.value)
    formModel.value.cover_img = file
  } else {
    formModel.value = { ...defaultModel }
    imgUrl.value = ''
    refQuill.value.setHTML('')
  }
}
//网址转文件函数
async function imageUrlToFileObject(imageUrl, filename) {
  try {
    // 使用 Axios 下载图片数据
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })

    // 将下载的数据转换成 Blob 对象
    const blob = new Blob([response.data], {
      type: response.headers['content-type']
    })

    // 创建 File 对象
    const file = new File([blob], filename, {
      type: response.headers['content-type']
    })

    return file
  } catch (error) {
    console.error('Error converting image URL to File object:', error)
    return null
  }
}

// async function urlToBlob(url) {
//   try {
//     // 使用 Axios 下载网络图片的二进制数据
//     const response = await axios.get(url, { responseType: 'arraybuffer' })

//     // 获取响应的二进制数据
//     const imageData = response.data

//     // 根据文件类型设置扩展名
//     const contentType = response.headers['content-type']
//     const fileExtension = contentType.split('/')[1]
//     const fileName = `image.${fileExtension}`

//     // 创建一个 Blob 对象
//     const blob = new Blob([imageData], { type: contentType })

//     // 将 Blob 对象转换为文件对象
//     const file = new File([blob], fileName)

//     return file
//   } catch (error) {
//     console.error('下载并转换图片时出错:', error)
//     throw error
//   }
// }
const addArticle = async (state) => {
  formModel.value.state = state
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  if (formModel.value.id) {
    await artEditArticleService(fd)
    visibleDrawer.value = false
    ElMessage.success('修改成功')
    emit('success', 'edit')
  } else {
    await artAddArticleService(fd)
    visibleDrawer.value = false
    ElMessage.success('添加成功')
    emit('success', 'add')
  }
  console.log('回显？')
}
defineExpose({
  open
})
const imgUrl = ref('')
const onUploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
  //   const fd= new FormData()
  //   for(let key in )
}
</script>
<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <!-- <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select> -->
        <!-- <chanel-list v-model="formModel.cate_id" width="100%"></chanel-list> -->
        <ArticleList v-model="formModel.cate_id" width="100%"></ArticleList>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
            v-model:content="formModel.content"
            content-type="html"
            ref="refQuill"
          ></QuillEditor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addArticle('已发布')">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
