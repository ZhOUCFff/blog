import React, { useState, useEffect, useCallback } from 'react'

import moment from 'moment'

import { Table, Button, Popconfirm, message } from 'antd'

import { getArticles, getArticleTypes, deleteArticle } from '../request/request'

const ArticleList = props => {
  const [typeList, setTypeList] = useState([])
  const [articleList, setArticleList] = useState([])

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类别',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '发布时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '访问量',
      dataIndex: 'visits',
      key: 'visits',
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      render: (text, record) => (
        <>
          <Button
            type='primary'
            style={{ margin: '0 10px' }}
            onClick={() => {
              props.history.push(`/main/article_edit/${record.id}`)
            }}
          >
            修改
          </Button>
          <Popconfirm
            title='确认删除该文章?'
            cancelText='取消'
            okText='确认'
            onConfirm={() => handleDeleteArticle(record.id)}
          >
            <Button type='danger'>删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ]

  useEffect(() => {
    getTypeList()
  }, [])

  useEffect(() => {
    getArticleList()
  }, [typeList])

  // 获取分类列表
  const getTypeList = async () => {
    const res = await getArticleTypes()
    if (!res) return
    setTypeList(res)
  }

  // 获取文章列表数据
  const getArticleList = async () => {
    const res = await getArticles()
    if (!res) return
    const data = res.map(item => {
      item.key = item.id
      item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
      item.type = typeList
        .filter(type => item.type.split(',').map(Number).includes(type.id))
        .map(type => type.typeName)
        .join('/')
      return item
    })
    setArticleList(data)
  }

  // 删除文章
  const handleDeleteArticle = async id => {
    const res = await deleteArticle(id)
    if (!res) return message.error('文章删除失败')
    message.success('文章删除成功')
    getArticleList()
  }

  return <Table bordered columns={columns} dataSource={articleList}></Table>
}

export default ArticleList
