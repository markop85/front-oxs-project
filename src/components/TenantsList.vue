<template>
    <div v-if="tenants" class="tenants-list-container">
        <h1 class="list-header">TENANTS LIST</h1>
      <div class="filter-container flex space-between">
        <select v-model="filter.debtStatus" @change="filterList">
            <option>All</option>
            <option>Debt</option>
            <option>No Debt</option>
        </select>
        <input placeholder="search" v-model="filter.text" @input="filterList"/>
        <div class="side-btns">
            <button @click="loadTenants">REFRESH</button>
            <button @click="addTenant">ADD Tenant</button>
        </div>
      </div>
      <ul class="tenants-list flex column justify-center">
        <li v-for = "tenant in tenants" :key="tenant._id" class="single-tenant-container flex space-between">
          <TenantPreview  @click.native="$emit('routeToDetails', tenant._id)" :single-tenant="tenant"/>
          <div class="tenant-btn">
            <button @click="deleteTenant(tenant._id)">DELETE</button>
            <button @click="$emit('editTenant', tenant._id)">EDIT</button>
          </div>
        </li>
      </ul>

    </div>
</template>

<script>
import TenantPreview from "./TenantPreview";
import {
  LOAD_TENANTS,
  ADD_TENANT,
  TENANTS_FOR_DISPLAY,
  FILTER_TENANTS,
  REMOVE_TENANT
} from "@/store/TenantsStore.js";

export default {
  data() {
    return {
      tenants: [],
      filter: {
        text: "",
        debtStatus: "All"
      }
    };
  },

  created() {
    //get filtered tenants from store, if no tenants then get them from db
    let data = this.$store.getters[TENANTS_FOR_DISPLAY];
    if (!data.tenants.length) {
      this.loadTenants();
    } else {
      this.orgnaizeData(data);
    }
  },

  methods: {
    loadTenants() {
      // get tenants from db
      this.$store
        .dispatch({ type: LOAD_TENANTS })
        .then(() => {
          let data = this.$store.getters[TENANTS_FOR_DISPLAY];
          this.orgnaizeData(data);
          console.log(this.tenants, "tenants loaded successfully");
        })
        .catch(err => console.log("fail to load tenants from store"));
    },

    orgnaizeData(data) {
      // helper function
      this.tenants = data.tenants;
      this.filter.text = data.filter.text;
      this.filter.debtStatus = data.filter.debtStatus;
    },

    filterList() {
      // filter tenants by debt or by name and retrieve them from store
      this.$store
        .dispatch({ type: FILTER_TENANTS, filter: this.filter })
        .then(() => {
          this.tenants = this.$store.getters[TENANTS_FOR_DISPLAY].tenants;
        })
        .catch(err => console.warn("failed to load tenants from store"));
    },

    deleteTenant(tenantId) {
      // delete tenant from db and render view
      this.$store
        .dispatch({ type: REMOVE_TENANT, tenantId })
        .then(() => {
          this.tenants = this.$store.getters[TENANTS_FOR_DISPLAY].tenants;
          console.log("tenant removed successfully");
        })
        .catch(err => console.warn(err, "failed to remove tenant from store"));
    },

    addTenant() {
      this.$router.push(`/TenantEdit/`);
    }
  },

  components: {
    TenantPreview
  }
};
</script>

<style scoped>
.tenants-list-container {
  width: 100%;
}

.filter-container {
  width: 53%;
  margin: 0 auto;
}

.single-tenant-container {
  margin-bottom: 10px;
  cursor: pointer;
}
.tenants-list {
  width: 80%;
  margin-top: 60px;
  padding-left: 100px;
}
.tenant-btn button:first-child {
  margin-right: 20px;
}

.side-btns button:first-child {
  margin-right: 10px;
}

.list-header {
  text-align: center;
}
</style>
