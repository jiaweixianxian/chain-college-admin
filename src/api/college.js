import request from '@/utils/http-request'

export default {

    getColleges(id=null) {
        return request({
            url:id?`college/${id}`:`college`,
            method: 'get'
        })
    },


}