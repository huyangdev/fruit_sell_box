import http from "@/api/Index.js"
const QaServices = {
    "test" : async function(data){
        // const scrollview = this.$refs["scrollview"]
        let result = ""
        await http({
            url: "/test",
            params:data
        })
        .then(res => {
            result = res.data
        })
        .catch(err => {
            console.log(err)
        })
        return result
    },
    "hx711" : async function(data){
        // const scrollview = this.$refs["scrollview"]
        let result = ""
        await http({
            url: "/hx711",
            params:data
        })
        .then(res => {
            result = res.data
        })
        .catch(err => {
            console.log(err)
        })
        return result
    },
    "hx712" : async function(data){
        // const scrollview = this.$refs["scrollview"]
        let result = ""
        await http({
            url: "/hx712",
            params:data
        })
        .then(res => {
            result = res.data
        })
        .catch(err => {
            console.log(err)
        })
        return result
    },
    "video" : async function(data){
        // const scrollview = this.$refs["scrollview"]
        let result = ""
        await http({
            url: "/video_streaming",
            params:data
        })
        .then(res => {
            result = res.data
        })
        .catch(err => {
            console.log(err)
        })
        return result
    },
    "pic" : async function(data){
        // const scrollview = this.$refs["scrollview"]
        let result = ""
        await http({
            url: "/picture_recognition",
            params:data
        })
        .then(res => {
            result = res.data
        })
        .catch(err => {
            console.log(err)
        })
        return result
    }
}

export default QaServices