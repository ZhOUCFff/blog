import { useState, useEffect } from 'react'
import Link from 'next/link'

import Head from 'next/head'

// 引入样式文件
import '../public/css/index.css'

import color from '../utils/color'

// 引入自定义组件
import Header from '../components/header/Header'
import Author from '../components/author/Author'
// 引入antd组件
import { Row, Col, List, Tag, BackTop } from 'antd'
// 引入antd图标
import {
  CalendarOutlined,
  FireOutlined,
  RightOutlined,
  CaretUpOutlined,
} from '@ant-design/icons'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import moment from 'moment'

// 网络请求
import { getArticles, getArticleTypes } from '../request/request'

const Home = props => {
  const [articleList, setArticleList] = useState([])
  const [typeList, setTypeList] = useState([])

  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight(code) {
      return hljs.highlightAuto(code).value
    },
  })

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
    setArticleList(handleArticleList(res))
  }

  const handleArticleList = (data = []) => {
    return data.map(item => {
      item.key = item.id
      item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
      item.type = typeList
        .filter(type => item.type.split(',').map(Number).includes(type.id))
        .map(type => type.typeName)
      return item
    })
  }

  return (
    <div>
      {/* seo优化设置 */}
      <Head>
        <title>首页</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* 返回顶部按钮 */}
      <BackTop visibilityHeight={400}>
        <div className='back-to-top'>
          <CaretUpOutlined />
        </div>
      </BackTop>
      {/* 公共头部 */}
      <Header selectedKeys={['index']} selectTitle={'文章类型'} />
      {/* 内容 */}
      <Row className='main' type='flex' justify='center'>
        <Col xs={24} sm={24} md={16} lg={15} xl={14} className='main-left'>
          <List
            className='list'
            header={<div>全部博文</div>}
            itemLayout='vertical'
            dataSource={articleList}
            renderItem={item => (
              <List.Item>
                <div className='list-item-title'>
                  <Link href={{ pathname: '/detail', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className='list-item-info'>
                  <span>
                    <CalendarOutlined />
                    {moment(item.time).format('YYYY-MM-DD')}
                  </span>
                  <span>
                    <FireOutlined style={{ color: '#ff8a80' }} />
                    {item.visits}
                  </span>
                  {item.type.map((type, i) => (
                    <Tag key={i} color={color[i]}>
                      {type}
                    </Tag>
                  ))}
                </div>
                <div
                  className='list-item-content'
                  dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                ></div>
                <div style={{ textAlign: 'right' }}>
                  <Link href={{ pathname: '/detail', query: { id: item.id } }}>
                    <a>
                      查看全文
                      <RightOutlined />
                    </a>
                  </Link>
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col xs={0} sm={0} md={7} lg={8} xl={4} className='main-right'>
          <Author />
        </Col>
      </Row>
    </div>
  )
}

export default Home
