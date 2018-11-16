<template>
    <section v-if="tenant" class="tenant-details-container">
        <button @click="goToHome">BACK</button>
        <div class="tenant-details">
            <h2>{{tenant.name}} Details</h2>
            <div>Tenant Name: {{tenant.name}}</div>
            <div>Tenant Address: {{tenant.address}}</div>
            <div>Tenant Phone: {{tenant.phone}}</div>
            <div>Tenant Debt: {{tenant.debt}}</div>
        </div>
    </section>
</template>

<script>
import { GET_TENANT_BY_ID, GET_TENANT } from "../store/TenantsStore";

export default {
  name: "TenantDetails",
  data() {
    return {
      tenant: {}
    };
  },
  created() { // get tenant id, load tenant from the db, render view
    let tenantId = this.$route.params.tenantId;
    this.$store
      .dispatch({ type: GET_TENANT_BY_ID, tenantId })
      .then(() => {
        this.tenant = this.$store.getters[GET_TENANT][0];
      })
      .catch(err => console.warn(err, "failed to get tenant from store"));
  },

  methods: {
    goToHome() {
      this.$router.push(`/home`);
    }
  }
};
</script>

<style scoped>
.tenant-details{
    width: fit-content;
    margin: 0 auto;
}

.tenant-details div {
    margin-bottom: 10px;
}
</style>


