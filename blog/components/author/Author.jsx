import { Avatar, Divider, Space, Tooltip } from 'antd'
import './author.css'
// 引入antd图标
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'

export default () => {
  return (
    <div className='author'>
      <div style={{ padding: '20px 0 0' }}>
        <Avatar size={100} />
        <p className='author-introduction'>前端萌新</p>
      </div>
      <Divider>社交账号</Divider>
      <div style={{ padding: '20px 0' }}>
        <Space size='middle'>
          <Tooltip title='https://github.com/ZhOUCFff'>
            <a href='https://github.com/ZhOUCFff' target='_blank'>
              <Avatar size={28} icon={<GithubOutlined />} />
            </a>
          </Tooltip>
          <Tooltip title='1757775936'>
            <Avatar size={28} icon={<QqOutlined />} />
          </Tooltip>

          <Tooltip title='1757775936'>
            <Avatar size={28} icon={<WechatOutlined />} />
          </Tooltip>
        </Space>
      </div>
    </div>
  )
}
