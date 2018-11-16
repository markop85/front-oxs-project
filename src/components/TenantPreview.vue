<template>
    <div class="tenantPreview-container">
        <div>{{singleTenant.name}}</div>
    </div>
</template>

<script>
export default {
    name:'TenantPreview',

    props: ['singleTenant']
}
</script>
