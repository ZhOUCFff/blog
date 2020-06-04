import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://localhost:3005/blog/web',
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'http://47.105.164.155:8899/blog/web'
        : 'http://localhost:3005/blog/web',
    timeout: 5000,
  })
  instance.interceptors.request.use(
    config => {
      return config
    },
    err => {}
  )
  instance.interceptors.response.use(
    res => {
      return res.data
    },
    err => {}
  )

  return instance(config)
}
