import axios from "axios";

const baseURL_dev = "/api"
const baseURL = ""

const service =  axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '' : baseURL_dev,
    timeout: 30000,
    validateStatus: function () {
		// 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
		return true
	},
    // 在向服务器发送请求前，序列化请求数据
    transformRequest: [function (data) {
        data = JSON.stringify(data)
        return data
    }],
    // 在传递给 then/catch 前，修改响应数据
    transformResponse: [function (data) {
        if (typeof data === 'string' && data.startsWith('{')) {
            data = JSON.parse(data)
        }
        return data
    }]    
})

// 请求拦截器
service.interceptors.request.use((config) => {
	return config
}, (error) => {
	// 错误抛到业务代码
    error.data = {}
    error.data.msg = '服务器异常，请联系管理员！'
    return Promise.resolve(error)
})

export default service