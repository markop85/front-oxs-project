const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/tenants'
    : '//localhost:3000/tenants';

import axios from 'axios';

var tokenKey = '';
// axios.defaults.headers.common = { 'Authorization': `bearer ${AUTH_TOKEN}` }




function query(token) { 
    tokenKey = token;
    return axios.get(`${BASE_URL}`, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(tenants => tenants.data)
        .catch(err => console.log('cant get tenants from route'))
}

function addTenant(tenant) {
    return axios.post(`${BASE_URL}`, tenant, { headers: {"Authorization" : `Bearer ${tokenKey}`}})
        .then(res => res.data)
        .catch(err => console.log('cant get routes'))
}
function getTenantById(tenantId) {
    return axios.get(`${BASE_URL}/${tenantId}`, { headers: {"Authorization" : `Bearer ${tokenKey}`}})
        .then(res => res.data)
        .catch(err => console.log('cant get tenant from routes'))
}

function saveTenant(tenant) {
    return axios.put(`${BASE_URL}/${tenant._id}`, tenant, { headers: {"Authorization" : `Bearer ${tokenKey}`}})
        .then(res => {
            return tenant;
        })
        .catch(err => console.warn(err, 'failed to save tenant from routes')
        );
}

function removeTenant(tenantId) {
    return axios.delete(`${BASE_URL}/${tenantId}`, { headers: {"Authorization" : `Bearer ${tokenKey}`}})
        .then(res => res.data)
        .catch(err => console.log(err, 'failed to remove tenant from routes'))
}

export default {
    query,
    addTenant,
    getTenantById,
    saveTenant,
    removeTenant,
}