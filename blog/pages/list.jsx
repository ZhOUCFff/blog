import { useState, useEffect } from 'react'
import Link from 'next/link'

import Head from 'next/head'

import color from '../utils/color'
// 引入工具函数
import urlPaser from '../utils/url-parser'
// 引入自定义组件
import Header from '../components/header/Header'
import Author from '../components/author/Author'
// 引入antd组件
import { Row, Col, List, Tag, Spin, BackTop } from 'antd'
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
import { getArticlesByType, getTypeById } from '../request/request'

const MyList = props => {
  const [isLoding, setIsLoding] = useState(true)
  const [articleList, setArticleList] = useState([])
  const [currentType, setCurrentType] = useState({})

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
    getCurrentType(urlPaser(props.url.asPath).typeId)
    getArticleList(urlPaser(props.url.asPath).typeId)
  }, [props.url.asPath])

  // 获取文章列表数据
  const getArticleList = async typeId => {
    if (!typeId) return
    const res = await getArticlesByType(typeId)
    if (!res) return
    setIsLoding(false)
    setArticleList(res)
  }

  // 获取当前分类
  const getCurrentType = async typeId => {
    if (!typeId) return
    const res = await getTypeById(typeId)
    if (!res) return
    setCurrentType(res[0])
  }

  return (
    <div>
      {/* seo优化设置 */}
      <Head>
        <title>{currentType.typeName ? currentType.typeName : ''}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* 返回顶部按钮 */}
      <BackTop visibilityHeight={400}>
        <div className='back-to-top'>
          <CaretUpOutlined />
        </div>
      </BackTop>
      {/* 公共头部 */}
      <Header
        selectedKeys={[currentType.id + '']}
        selectTitle={currentType.typeName ? currentType.typeName : '文章分类'}
      />
      {/* 内容 */}
      <Row className='main' type='flex' justify='center'>
        <Col xs={24} sm={24} md={16} lg={15} xl={14} className='main-left'>
          <Spin spinning={isLoding} tip='loading...'>
            {' '}
            <List
              className='list'
              header={<div>{currentType.typeName}</div>}
              itemLayout='vertical'
              dataSource={articleList}
              renderItem={item => (
                <List.Item>
                  <div className='list-item-title'>
                    <Link
                      href={{ pathname: '/detail', query: { id: item.id } }}
                    >
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
                        {type.typeName}
                      </Tag>
                    ))}
                  </div>
                  <div
                    className='list-item-content'
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  ></div>
                  <div style={{ textAlign: 'right' }}>
                    <Link
                      href={{ pathname: '/detail', query: { id: item.id } }}
                    >
                      <a>
                        查看全文
                        <RightOutlined />
                      </a>
                    </Link>
                  </div>
                </List.Item>
              )}
            />
          </Spin>
        </Col>
        <Col xs={0} sm={0} md={7} lg={8} xl={4} className='main-right'>
          <Author />
        </Col>
      </Row>
    </div>
  )
}

export default MyList
