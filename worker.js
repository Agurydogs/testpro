addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // CORSヘッダーを設定
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // OPTIONSリクエストの処理
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    })
  }

  try {
    // URLパラメータからターゲットURLを取得
    const url = new URL(request.url)
    const targetUrl = url.searchParams.get('url')
    
    if (!targetUrl) {
      return new Response('Missing target URL', { status: 400 })
    }

    // 元のリクエストのヘッダーをコピー
    const headers = new Headers(request.headers)
    headers.delete('host')

    // プロキシリクエストを実行
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : null
    })

    // レスポンスヘッダーの設定
    const responseHeaders = new Headers(response.headers)
    Object.keys(corsHeaders).forEach(key => {
      responseHeaders.set(key, corsHeaders[key])
    })

    // 新しいレスポンスを作成
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    })

  } catch (err) {
    return new Response(err.message, { status: 500 })
  }
} 