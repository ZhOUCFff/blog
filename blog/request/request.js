import { request } from './index'

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

// 获取所有分类
export function getArticleTypes() {
  return request({
    url: '/article_type',
  })
}

// 通过id获取分类
export function getTypeById(id) {
  return request({
    url: `/type/${id}`,
  })
}
