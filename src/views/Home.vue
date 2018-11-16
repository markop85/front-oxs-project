<template>
  <div class="home-container flex justify-center">
    <button class="sign-out-btn" @click="signOut">Sign Out</button>
    <tenants-list
    @routeToDetails = 'routeToDetails'
    @editTenant = 'editTenant'
    ref="updateList"/>
  </div>
</template>

<script>
import TenantsList from "../components/TenantsList";
import {SIGN_OUT} from '../store/UserStore'
import { SET_TENANTS } from "../store/TenantsStore";

export default {
  name: "Home",

  components: {
    TenantsList
  },

  
  methods: {
    routeToDetails(tenantID) { // route to tenant details
      this.$router.push(`/TenantDetails/${tenantID}`);
    },

    editTenant(tenantID) { // edit existing tenant 
      this.$router.push(`/TenantEdit/${tenantID}`);
    },

    signOut() { // sign out and route to logIn page
      this.$store.dispatch({type: SIGN_OUT})
      .then((result) => {
        this.$store.commit({type:SET_TENANTS}, []);
        this.$router.push(`/`);
      }).catch((err) => {
        console.warn(err, 'failed to sign out')
      });
    }
  }
};
</script>

<style>
  .sign-out-btn {
    position: absolute;
    right: 5px;
    top:5px;
  }
</style>
