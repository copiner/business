proxylist = {
   // 请求到 '/' 下 的请求都会被代理到 target： http://debug.xxx.com 中
   '/ticket2openid': {
       target: 'http://192.168.23.213:8081',
       changeOrigin: true,
       secure: false
   },
   '/getUserInfo': {
       target: 'http://192.168.23.213:8081',
       changeOrigin: true,
       secure: false
   },
   '/userPermission/getUserResources': {
       target: 'http://192.168.23.213:8081',
       changeOrigin: true,
       secure: false
   },
   '/business/getUnpayBusiness': {
       target: 'http://192.168.23.213:8081',
       changeOrigin: true,
       secure: false
   },
   '/order/addOrderInfo': {
       target: 'http://192.168.23.213:8081',
       changeOrigin: true,
       secure: false
   },
   '/order/payOrder': {
       target: 'http://192.168.23.213:8081',
       changeOrigin: true,
       secure: false
   },
   '/addUserIdInfo': {
       target: 'http://192.168.23.213:8081',
       changeOrigin: true,
       secure: false
   },
   '/prepaidBalanceQueryByCard': {
       target: 'http://192.168.23.213:8081',
       changeOrigin: true,
       secure: false
   }
}


module.exports = proxylist;
