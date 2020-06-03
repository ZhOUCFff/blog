import React, { useState } from 'react'

import { Card, Input, Button, Space, message } from 'antd'
import { UserOutlined, UnlockOutlined } from '@ant-design/icons'

import '../static/css/login.css'

import { login } from '../request/request'

const Login = props => {
  const [username, setUsername] = useState('test')
  const [password, setPassword] = useState(123456)
  const [isLogin, setIsLogin] = useState(false)

  const loginClick = async () => {
    setIsLogin(true)
    const res = await login({
      username,
      password,
    })
    if (!res) return message.error('用户名或密码错误')
    message.success('登录成功')
    sessionStorage.setItem('token', res.token)

    setIsLogin(false)
    props.history.push('/main')
  }

  const reset = () => {
    setUsername('')
    setPassword('')
  }

  return (
    <div className='login-form'>
      <Card title='博客后台管理系统' bordered style={{ width: 400 }}>
        <Input
          size='large'
          placeholder='Enter your username'
          prefix={<UserOutlined />}
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <br />
        <Input.Password
          size='large'
          placeholder='Enter your password'
          prefix={<UnlockOutlined />}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <br />
        <Space direction='vertical' style={{ width: '100%' }}>
          <Button type='primary' onClick={loginClick} loading={isLogin} block>
            登录
          </Button>
          <Button onClick={reset} block>
            重置
          </Button>
        </Space>
      </Card>
    </div>
  )
}

export default Login
