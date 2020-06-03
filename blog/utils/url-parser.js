export default (url = '') => {
  const params = {}
  url.split('?')[1] &&
    url
      .split('?')[1]
      .split('&')
      .forEach(param => {
        const [key, value] = param.split('=')
        params[key] = value
      })
  return params
}
