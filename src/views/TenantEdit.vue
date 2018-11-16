<template>
    <section v-if="tenant" class="tenant-details-container">
        <button @click="goToHome">BACK</button>
        <div class="details-inputs flex column">
            <h1 v-if="isNewTenant" class="edit-header">NEW TENANT</h1>
            <h1 v-if="!isNewTenant" class="edit-header">{{tenant.name}}</h1>
            <input v-model="tenant.name" placeholder="Name"/>
            <input v-model="tenant.address" placeholder="Address"/>
            <input v-model="tenant.phone" placeholder="Phone"/>
            <input type="number" v-model="tenant.debt" placeholder="Debt"/>
        </div>
        <div class="edit-btns flex column">
            <button v-if="!isNewTenant" @click="saveChanges">SAVE CHANGES</button>
            <button v-if="isNewTenant"  @click="addNewTenant">ADD NEW TENANT</button>
        </div>
    </section>
</template>

<script>
import {
  GET_TENANT_BY_ID,
  GET_TENANT,
  SAVE_TENANT,
  ADD_TENANT
} from "../store/TenantsStore";

export default {
  name: "TenantDetails",
  data() {
    return {
      tenant: {
          name:'',
          address:'',
          debt:null,
          phone:'',
      },
      isNewTenant: false,
      missingDetails: false
    };
  },
  created() {
    //get tenant id, load tenant from the db, render view
    let tenantId = this.$route.params.tenantId;
    this.isNewTenant = tenantId ? false : true; //check route mode: edit or add tenant
    if (tenantId) {
      this.$store
        .dispatch({ type: GET_TENANT_BY_ID, tenantId })
        .then(() => {
          this.tenant = JSON.parse(
            JSON.stringify(this.$store.getters[GET_TENANT][0])
          );
        })
        .catch(err => console.warn(err, "failed to get tenant from store"));
    }
  },

  methods: {
    goToHome() {
      this.$router.push(`/home`);
    },

    saveChanges() {
      // save tenant changes in db
      this.$store
        .dispatch({ type: SAVE_TENANT, tenant: this.tenant })
        .then(() => {
          console.log("saved successfully");
        })
        .catch(err => console.warn(err, "failed to save tenant details"));
    },

    addNewTenant() {
      //validate input, save new tenant on db, route to homePage
      if (this.tenant.name && this.tenant.phone && this.tenant.address) {
        this.$store
          .dispatch({ type: ADD_TENANT, tenant: this.tenant })
          .then(tenant => {
            console.log("tenant added successfully");
            this.$router.push(`/home`);
          })
          .catch(err => console.warn(err, "failed to add tenant from store"));
      } else {
        console.log("missing data");

        this.missingDetails = true;
      }
    }
  }
};
</script>

<style scoped>
.details-inputs {
  width: 50%;
  margin: 0 auto;
}

.edit-btns {
  width: 50%;
  margin: 0 auto;
}

.details-inputs input {
  margin-bottom: 10px;
}

.edit-header {
  text-align: center;
}
</style>