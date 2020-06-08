import { useState, useEffect } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import moment from 'moment'

import color from '../utils/color'

// 引入工具函数
import urlPaser from '../utils/url-parser'

// 引入自定义组件
import Header from '../components/header/Header'
import Author from '../components/author/Author'
// 引入antd组件
import { Row, Col, Affix, Tag, Spin, Empty, BackTop } from 'antd'
import {
  CalendarOutlined,
  FireOutlined,
  CaretUpOutlined,
} from '@ant-design/icons'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

// 文章导航组件
import Tocify from '../components/tocify/Tocify.tsx'

// 网络请求
import { getArticleById } from '../request/request'

const Detail = props => {
  const [isLoding, setIsLoding] = useState(true)
  const [articleDetail, setArticleDetail] = useState({})
  const [articleContentHTML, setArticleContentHTML] = useState()
  const [articleNav, setArticleNav] = useState()

  useEffect(() => {
    getArticleDetail()
  }, [])

  useEffect(() => {
    const tocify = new Tocify()
    const renderer = new marked.Renderer()
    renderer.heading = function (text, level, raw) {
      const anchor = tocify.add(text, level)
      return `<a id=${anchor} class='anchor-fix'>
        <h${level}>${text}</h${level}>
      </a>`
    }

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

    setArticleContentHTML(
      marked(articleDetail.content ? articleDetail.content : '')
    )
    const nav = tocify.render()
    tocify && setArticleNav(tocify.render())
  }, [articleDetail])

  const getArticleDetail = async () => {
    const { id } = urlPaser(props.router.asPath)
    const res = await getArticleById(id)
    if (!res) return
    setIsLoding(false)
    setArticleDetail(res[0])
  }

  return (
    <div>
      {/* seo优化设置 */}
      <Head>
        <title>{articleDetail.title ? articleDetail.title : ''}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* 返回顶部按钮 */}
      <BackTop visibilityHeight={400}>
        <div className='back-to-top'>
          <CaretUpOutlined />
        </div>
      </BackTop>
      {/* 公共头部 */}
      <Header selectTitle={'分类'} />
      {/* 内容 */}
      <Row className='main' type='flex' justify='center'>
        <Col xs={24} sm={24} md={16} lg={15} xl={14} className='main-left'>
          <Spin spinning={isLoding} tip='loading...'>
            {isLoding ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description='暂无数据'
              />
            ) : null}
            {/* 标题 */}
            <div className='detail-title'>{articleDetail.title}</div>
            {/* 信息 */}
            <div className='detail-info'>
              <span>
                <CalendarOutlined />
                {moment(articleDetail.time).format('YYYY-MM-DD')}
              </span>
              <span>
                <FireOutlined />
                {articleDetail.visits}
              </span>
              <span>
                {articleDetail.type &&
                  articleDetail.type.map((item, i) => (
                    <Tag color={color[i]} key={i}>
                      {item.typeName}
                    </Tag>
                  ))}
              </span>
            </div>
            {/* 内容 */}
            <div
              className='detail-content'
              dangerouslySetInnerHTML={{ __html: articleContentHTML }}
            ></div>
          </Spin>
        </Col>
        <Col xs={0} sm={0} md={7} lg={8} xl={4} className='main-right'>
          <Author />
          <Affix offsetTop={5}>
            <div className='detail-nav'>{articleNav}</div>
          </Affix>
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(Detail)
