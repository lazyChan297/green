import webStorageCache from 'web-storage-cache'
import urls from 'url'

// 获取地址栏参数
export function getUrlParms(name) {
    return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
}
// 获取token
export function checkToken(url) {
  let wsCache = new webStorageCache()
  global.token = wsCache.get('token')
  let urlObj = urls.parse(url)
  let pageUrl = urlObj.protocol + '//' + urlObj.host + '/' + urlObj.hash
  // 如果token失效则重新获取
  setTimeout(() => {
    window.location.reload()
  }, 60 * 60 * 1000 * 2) 
  if (!global.token && !getUrlParms('token')) {
    window.onload = function () {
    //   window.location.href = global.serverHost + '/wechat/getUserInfo?url_befor_login=' + encodeURIComponent(url)
      window.location.href = global.serverHost + '/wechat/getUserInfo?url_befor_login=' + encodeURIComponent(url)
      console.log(global.serverHost)
      console.log(global.serverHost + '/wechat/getUserInfo?url_befor_login'+ encodeURIComponent(url))
    } 
  } else if (url != pageUrl && url != global.serverHost + '/newCart/pay/#/goods/payment/') {
    window.location.href = pageUrl
  }
  if (getUrlParms('token')) {
    wsCache.set('token', getUrlParms('token'), {exp : 60*60*2})
  }
}

