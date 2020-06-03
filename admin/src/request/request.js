import { request } from './index'

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

// 获取所有文章
export function getArticles() {
  return request({
    url: '/articles',
  })
}

// 通过id获取文章
export function getArticleById(id) {
  return request({
    url: `/article/${id}`,
  })
}

// 通过分类获取文章
export function getArticlesByType(typeId) {
  return request({
    url: `/articles/${typeId}`,
  })
}

// 添加文章
export function addArticle(data) {
  return request({
    url: '/article',
    method: 'post',
    data,
  })
}

// 修改文章
export function updateArticle(id, data) {
  return request({
    url: `/article/${id}`,
    method: 'put',
    data,
  })
}

// 删除文章
export function deleteArticle(id) {
  return request({
    url: `/article/${id}`,
    method: 'delete',
  })
}

// 获取所有分类
export function getArticleTypes() {
  return request({
    url: 'article_type',
  })
}
