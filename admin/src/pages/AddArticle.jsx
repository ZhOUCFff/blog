import React, { useState, useEffect } from 'react'

import moment from 'moment'

// 网络请求
import {
  getArticleTypes,
  getArticleById,
  addArticle,
  updateArticle,
} from '../request/request'
// 样式
import '../static/css/addArticle.css'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import {
  Row,
  Col,
  Input,
  Select,
  Button,
  DatePicker,
  Form,
  message,
} from 'antd'
const { Option } = Select
const { TextArea } = Input

const AddArticle = props => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight(code) {
      return hljs.highlightAuto(code).value
    },
  })

  const [isAddArtice, setIsAddArtice] = useState(false)
  const [articleContentMD, setArticleContentMD] = useState('') //文章markdown内容
  const [articleContentHTML, setArticleContentHTML] = useState('内容预览') //文章html内容
  const [introduceMD, setIntroduceMD] = useState() //简介的markdown内容
  const [introduceHTML, setIntroduceHTML] = useState('简介预览') //简介的html内容
  const [type, setType] = useState([]) // 文章类别

  const [addArticleForm] = Form.useForm()

  useEffect(() => {
    if (props.match.params.id) {
      setIsAddArtice(false)
    } else {
      setIsAddArtice(true)
    }
    // 获取文章分类
    getArticleTypes().then(res => {
      // console.log(res)
      if (res) setType(res)
    })
    // 如果id存在，说明是编辑文章，需要通过id获取文章
    if (props.match.params.id) {
      getArticleById(props.match.params.id).then(res => {
        if (!res) return
        const data = res[0]
        data.type = data.type.split(',')
        data.time = moment(data.time)
        console.log(data)
        addArticleForm.setFieldsValue(data)
        setArticleContentHTML(marked(data.content))
        setIntroduceHTML(marked(data.introduce))
      })
    }
  }, [])

  // 事件
  const articleContentChange = e => {
    setArticleContentMD(e.target.value)
    setArticleContentHTML(marked(e.target.value))
  }

  const introduceChange = e => {
    setIntroduceMD(e.target.value)
    setIntroduceHTML(marked(e.target.value))
  }

  // 发布文章
  const submitArticle = async values => {
    // return console.log(values.type.join())
    if (!isAddArtice) {
      values.type = values.type.join(',')
      values.time = moment(values.time).format('YYYY-MM-DD HH:mm:ss')
      const res = await updateArticle(props.match.params.id, values)
      if (!res) return message.error('文章保存失败')
      message.success('文章保存成功')
      return
    }
    // 处理type字段参数值
    values.type = values.type.join(',')
    values.time = moment(values.time).format('YYYY-MM-DD HH:mm:ss')
    // 发送添加文章请求
    console.log(values)
    const res = await addArticle(values)
    if (!res) return message.error('文章添加失败')
    message.success('文章添加成功')
  }

  return (
    <div>
      <Form layout='vertical' onFinish={submitArticle} form={addArticleForm}>
        <Row>
          <Col style={{ padding: 8 }} span={18}>
            <Row gutter={10}>
              <Col span={24}>
                <Form.Item
                  name='title'
                  label='文章标题'
                  rules={[{ required: true, message: '请输入文章标题' }]}
                >
                  <Input size='large' placeholder='输入文章标题' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name='type'
                  label='文章分类'
                  rules={[{ required: true, message: '请选择文章分类' }]}
                >
                  <Select
                    style={{ minWidth: '50%' }}
                    mode='multiple'
                    size='large'
                    placeholder='请选择文章分类'
                  >
                    {type.map(item => (
                      <Option key={item.id}>{item.typeName}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  name='content'
                  label='文章内容'
                  rules={[{ required: true, message: '请输入文章内容' }]}
                >
                  <TextArea
                    className='article-content-md'
                    rows='25'
                    placeholder='文章内容'
                    value={articleContentMD}
                    onChange={articleContentChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <div style={{ paddingBottom: '8px' }}>内容预览</div>
                <div
                  className='article-content-html'
                  dangerouslySetInnerHTML={{ __html: articleContentHTML }}
                ></div>
              </Col>
            </Row>
          </Col>
          <Col style={{ padding: 8 }} span={6}>
            <Row>
              <Col span={24}>
                <Form.Item
                  name='introduce'
                  label='文章简介'
                  rules={[{ required: true, message: '请输入文章简介' }]}
                >
                  <TextArea
                    rows='4'
                    placeholder='文章简介'
                    value={introduceMD}
                    onChange={introduceChange}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <div style={{ paddingBottom: '8px' }}>简介预览</div>
                <div
                  style={{ marginBottom: '24px' }}
                  className='article-intr-html'
                  dangerouslySetInnerHTML={{ __html: introduceHTML }}
                ></div>
              </Col>
              <Col span={24}>
                <Form.Item name='time' label='发布日期'>
                  <DatePicker
                    showTime
                    className='date'
                    placeholder='发布日期'
                    size='large'
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button
                    style={{ margin: '0 5px' }}
                    size='large'
                    type='primary'
                    htmlType='submit'
                    block
                  >
                    {isAddArtice ? '添加文章' : '保存文章'}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default AddArticle
