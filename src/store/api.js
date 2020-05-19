//resources/assets/js/vuex/utils/api.js

import axios from 'axios'

// const base = 'http://localhost:8000/'

// const site = 'CaActivist'
// const base = 'https://api.caactivist.org/'
// const stateName = "California"

// const site = 'CoActivist'
// const base = 'https://api.coactivist.org/'
// const stateName = "Colorado"

// const site = 'GaActivist'
// const base = 'https://api.gaactivist.org/'
// const stateName = "Georgia"

// const site = 'IlActivist'
// const base = 'https://api.ilactivist.org/'
// const stateName = "Illinois"

const site = 'MnActivist.Org'
const base = 'https://api.mnactivist.org/'
const stateName = "Minnesota"

// const site = 'NYActivist'
// const base = 'https://api.nyactivist.org/'
// const stateName = "New York"

// const site = 'TxActivist'
// const base = 'https://api.txactivist.org/'
// const stateName = "Texas"

export default {
    base, site, stateName,
    get(url, request) {
        return axios.get(url, request)
            .then((response) => Promise.resolve(response.body.data))
            .catch((error) => Promise.reject(error));
    },
    post(url, request) {
        return axios.post(url, request)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },
    patch(url, request) {
        return axios.patch(url, request)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },
    delete(url, request) {
        return axios.delete(url, request)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    }
}