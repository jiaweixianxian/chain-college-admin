import request from '@/utils/http-request'

export default {


    getColleges(filter) {
        return request({
            url:`college/list`,
            method: 'post',
            data:filter
        })
    },


    getCollegeDetail(id){
        return request({
            url:`college/detail/${id}`,
            method: 'get'
        })
    },

    updateCollege(model) {
        return request({
            url: `college/${model.id}`,
            method: 'put',
            data: model
        })
    },

    deleteCollege(id) {
        return request({
            url: `college/${id}`,
            method: 'delete',
        })
    },

    getProvinceList(){
        return request({
            url: `province`,
            method: 'get',
        })
    }



}