import React, { useState, useEffect } from 'react'
import Router from 'next/router'

// 引入样式文件
import './header.css'

// 引入antd
import { Row, Col, Menu } from 'antd'
const { SubMenu } = Menu

import { HomeOutlined, ReadOutlined } from '@ant-design/icons'

import { getArticleTypes } from '../../request/request'

const Header = props => {
  const [types, setTypes] = useState([])

  useEffect(() => {
    getArticleTypes().then(res => {
      if (!res) return
      setTypes(res)
    })
  }, [])

  const onSelect = ({ key, item }) => {
    if (key === 'index') {
      Router.push('/index')
    } else {
      Router.push({
        pathname: '/list',
        query: {
          typeId: key,
        },
      })
    }
  }

  return (
    <div className='header'>
      <Row type='flex' justify='center'>
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className='header-logo'>Blog</span>
          <span className='header-text'>分享前端知识</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu
            mode='horizontal'
            forceSubMenuRender
            defaultSelectedKeys={['index']}
            selectedKeys={props.selectedKeys}
            onSelect={onSelect}
          >
            <Menu.Item key='index' icon={<HomeOutlined />}>
              首页
            </Menu.Item>
            <SubMenu icon={<ReadOutlined />} title={props.selectTitle}>
              {types.map(type => (
                <Menu.Item key={type.id} title={type.typeName}>
                  {type.typeName}
                </Menu.Item>
              ))}
            </SubMenu>
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

Header.defaultProps = {
  selectedKeys: [],
  selectTitle: '',
}

export default Header
