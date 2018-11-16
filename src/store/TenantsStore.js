import TenantsService from '@/services/TenantsService.js'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const LOAD_TENANTS = 'tenants/actions/loadTenants'
export const FILTER_TENANTS = 'tenants/actions/filterTenants'
export const ADD_TENANT = 'tenants/actions/addTenant'
export const TENANTS_FOR_DISPLAY = 'tenants/getters/tenantsForDisplay'
export const SET_TENANTS = 'tenants/mutation/setTenants'
export const FILTER_LIST = 'tenants/mutation/filterList'
export const SET_TENANT = 'tenant/mutation/setTenant'
export const GET_TENANT = 'tenant/getters/getTenant'
export const DELETE_TENANT = 'tenant/action/deleteTenant'
export const REMOVE_TENANT = 'tenant/mutation/removeTenant'
export const SAVE_TENANT = 'tenant/mutation/saveTenant'
export const UPDATE_TENANT = 'tenant/mutation/updateTenant'
export const ADD_NEW_TENANT = 'tenant/mutation/addTenant'
export const GET_TENANT_BY_ID = 'tenant/action/getTenantById'



export default {
    strict: true,
    state: {
        tenants: [],
        tenantForDisplay: {},
        filter: {
            text: '',
            debtStatus: 'All',
        },
    },

    getters: {
        [TENANTS_FOR_DISPLAY](state) { //return filtered tenants and filter status
            if(state.tenants === undefined) return { tenants: [], filter: {} };
            let tenants = state.tenants.filter(tenant => {
                let tenantName = tenant.name.toLowerCase();
                if (tenantName.includes(state.filter.text)) {
                    if (state.filter.debtStatus === 'All') return tenant;
                    if (state.filter.debtStatus === 'Debt' && tenant.debt > 0) return tenant;
                    if (state.filter.debtStatus === 'No Debt' && !tenant.debt) return tenant;
                }
            })
            return { tenants: tenants, filter: state.filter };
        },

        [GET_TENANT](state) { // return tenant byId
            return state.tenantForDisplay;
        },
    },

    mutations: {
        [SET_TENANTS](state, { tenants }) { //set all tenants from db
            console.log(tenants);
            
            state.tenants = tenants;
        },

        [SET_TENANT](state, { tenant }) { //set single tenant byId
            state.tenantForDisplay = tenant;
        },

        [DELETE_TENANT](state, { tenantId }) { //delete tenant byId
            state.tenants = state.tenants.filter(tenant => tenant._id !== tenantId);
        },

        [UPDATE_TENANT](state, { tenant }) { //update tenant
            let tenantIdx = state.tenants.findIndex(currTenant => currTenant._id === tenant._id)
            state.tenants.splice(tenantIdx, 1, tenant)
        },

        [ADD_NEW_TENANT](state, { tenant }) { // add new tenant
            state.tenants.push(tenant);
        },

        [FILTER_LIST](state, { filter }) { // set filter status
            state.filter.text = filter.text;
            state.filter.debtStatus = filter.debtStatus;
        }

    },
    actions: {
        [LOAD_TENANTS](context) {     // get tenants from db
            const token = localStorage.getItem('user token');
            return TenantsService.query(token)
                .then(tenants => {
                    context.commit({ type: SET_TENANTS, tenants });
                    return tenants;
                })
            
        },

        [ADD_TENANT](context, { tenant }) {   //add ney tenant to db
            return TenantsService.addTenant(tenant)
                .then(tenant => {
                    context.commit({ type: ADD_NEW_TENANT, tenant });
                    return tenant;
                }).catch(err => console.warn(err, "failed to add new tenant from service"))

        },
        [REMOVE_TENANT](context, { tenantId }) {  //remove tenant from db
            return TenantsService.removeTenant(tenantId)
                .then(res => {
                    context.commit({ type: DELETE_TENANT, tenantId });
                    return res;
                }).catch(err => console.warn(err, 'failed to remove tenant from tenant service'))
        },

        [SAVE_TENANT](context, { tenant }) {  //save modified tenant on db 
            return TenantsService.saveTenant(tenant)
                .then(tenant => {
                    context.commit({ type: UPDATE_TENANT, tenant });
                }).catch(err => console.warn(err, 'failed to save tenant from tenant service'))
        },

        [GET_TENANT_BY_ID](context, { tenantId }) {  // get tenant by id
            return TenantsService.getTenantById(tenantId)
                .then(tenant => {
                    context.commit({ type: SET_TENANT, tenant });
                    return;
                }).catch(err => console.warn(err, 'failed to get tenant from tenants service')
                );
        },

        [FILTER_TENANTS](context, { filter }) { // set filter in the state
            context.commit({ type: FILTER_LIST, filter })
        }
    }
}
