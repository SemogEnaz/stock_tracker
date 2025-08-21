<template>
    <div>
        <h1>Item: {{ id }}</h1>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import { ref } from 'vue';

    const route = useRoute();
    const id = ref(route.params.id);
    
</script>