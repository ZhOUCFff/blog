import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

// 引入样式文件
import '../static/css/main.css'
// 引入自定义组件
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'

import { Layout, Menu, Breadcrumb } from 'antd'
import {
  PieChartOutlined,
  CommentOutlined,
  AppstoreOutlined,
  CopyOutlined,
  EditOutlined,
  FileAddOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'

const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const Main = props => {
  const [collapsed, setCollapsed] = useState(false)
  const [currentPath, setCurrentPath] = useState('')
  const [selectedKey, setSelectedKey] = useState('')

  useEffect(() => {
    setSelectedKey(props.location.pathname.split('/')[2])
    if (!sessionStorage.getItem('token')) props.history.push('/login')
    setCurrentPath(props.location.pathname)
  }, [props.location.pathname])

  // 是否收起菜单
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }
  // 菜单点击事件
  const menuClick = value => {
    switch (value.key) {
      case 'article_add':
        props.history.push('/main/article_add')
        break
      case 'article_list':
        props.history.push('/main/article_list')
        break
      default:
        break
    }
  }

  const _getBreadText = () => {
    if (currentPath.indexOf('/type') !== -1) return '分类管理'
    if (currentPath.indexOf('/article') !== -1) return '文章管理'
    return ''
  }

  const getBreadText = () => {
    if (currentPath.indexOf('/type_add') !== -1) return '添加类型'
    if (currentPath.indexOf('/type_add') !== -1) return '编辑类型'
    if (currentPath.indexOf('/type_list') !== -1) return '编辑类型'
    if (currentPath.indexOf('/article_add') !== -1) return '添加文章'
    if (currentPath.indexOf('/article_edit') !== -1) return '编辑文章'
    if (currentPath.indexOf('/article_list') !== -1) return '文章列表'
    return ''
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu
          onClick={menuClick}
          theme='dark'
          selectedKeys={[selectedKey]}
          defaultSelectedKeys={['article']}
          defaultOpenKeys={['article']}
          mode='inline'
        >
          <Menu.Item key='1' icon={<PieChartOutlined />}>
            工作台
          </Menu.Item>
          <SubMenu key='type' icon={<AppstoreOutlined />} title='分类管理'>
            <Menu.Item key='type_add' icon={<FileAddOutlined />}>
              添加分类
            </Menu.Item>
            <Menu.Item key='type_list' icon={<UnorderedListOutlined />}>
              分类列表
            </Menu.Item>
          </SubMenu>
          <SubMenu key='article' icon={<CopyOutlined />} title='文章管理'>
            <Menu.Item
              key='article_add'
              icon={<FileAddOutlined />}
              style={{
                display:
                  currentPath.indexOf('/article_edit') === -1
                    ? 'block'
                    : 'none',
              }}
            >
              添加文章
            </Menu.Item>
            <Menu.Item
              key='article_edit'
              icon={<EditOutlined />}
              style={{
                display:
                  currentPath.indexOf('/article_edit') === -1
                    ? 'none'
                    : 'block',
              }}
            >
              编辑文章
            </Menu.Item>
            <Menu.Item key='article_list' icon={<UnorderedListOutlined />}>
              文章列表
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='9' icon={<CommentOutlined />}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              {currentPath.indexOf('/article') !== -1 ? '文章管理' : ''}
            </Breadcrumb.Item>
            <Breadcrumb.Item>{getBreadText()}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className='site-layout-background'
            style={{ padding: 10, minHeight: 360 }}
          >
            <Switch>
              <Route path='/main/article_add' exact component={AddArticle} />
              <Route
                path='/main/article_edit/:id'
                exact
                component={AddArticle}
              />
              <Route path='/main/article_list' exact component={ArticleList} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Main
