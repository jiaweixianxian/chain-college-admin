import axios from 'axios'

import { Notify } from 'quasar';


const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 50000
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            switch (response.status) {
                default:
                    break;
            }

            Notify.create(`${response.statusText}`)

        } else if (response.status === 200) {
            if (response.data.status === 'error') {
                Notify.create(`${response.data.body.error_message ? response.data.body.error_message : response.data.body}`);
                return;
            }
            if (response.data.body) {
                return response.data.body;
            } else {
                return response.data;
            }
        }
    },
    error => {
        const errMsg = error.response.msg || error.response.data.error_message;
        Notify.create(`${errMsg}`);
        return Promise.reject(error);
    }
)

export default service
