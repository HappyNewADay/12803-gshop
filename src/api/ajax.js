// ajax请求函数
// 返回值是一个promise对象(一部返回的数据是response.data)
import axios from 'axios'
export default function ajax(url, data = {}, type = 'GET') {
    return new Promise(function (resolve, reject) {
        //执行异步ajax请求
        let Promise
        if (type === 'GET') {
            let datastr = '' //数据拼接字符串
            Object.keys(data).forEach(key => {
                datastr += key + '=' + data[key] + '&'
            })
            if (datastr !== '') {
                datastr = datastr.substring(0, datastr.lastIndexOf('&'))
                url = url + '?' + datastr
            }
            Promise = axios.get(url)
        } else {
            //发送post请求
            Promise = axios.post(url, data)
        }
        Promise.then(function (response) {
            resolve(response.data)
        }).catch(function (error) {
            reject(error)
        })
    })
}