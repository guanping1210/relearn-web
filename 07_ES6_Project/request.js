const ENDPOINT = 'http://localhost:8001'

export function baseRequest(options) {
  const url = options.url || '/'
  console.log(fetch)
  return fetch(`${url.startsWith('/') ? url : `/${url}`}`, {
    method: options.method || 'get',
    headers: Object.assign({
      'Content-Type': 'application/json',
    }, options.headers || {}),
    body: options.method === 'get' ? null : JSON.stringify(options.data)
  })
} 