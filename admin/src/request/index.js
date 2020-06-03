import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://localhost:3006/blog/admin',
    baseURL:
      process.env.NODE_ENV === 'production'
        ? '/blog/admin'
        : 'http://localhost:3006/blog/admin',
    timeout: 5000,
  })
  instance.interceptors.request.use(
    config => {
      const token = sessionStorage.getItem('token')
      if (token) config.headers.Authorization = 'Bearer ' + token
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
