import request from '@/utils/request'

export const artGetChanelsService = () => request.get('/my/cate/list')

export const artAddChanelService = (data) => request.post('/my/cate/add', data)

export const artEditChanelService = (obj) => request.put('/my/cate/info', obj)

export const artDelChanelServiece = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

export const artGetListService = (params) =>
  request.get('/my/article/list', {
    params
  })

export const artAddArticleService = (data) => {
  return request.post('/my/article/add', data)
}

export const artEditArticleService = (date) => {
  return request.put('/my/article/info', date)
}

export const artGetArticleService = (id) => {
  return request.get('/my/article/info', { params: { id } })
}

export const artDelArticleService = (id) => {
  return request.delete('/my/article/info', { params: { id } })
}
