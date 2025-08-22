<template>
    <QrCode :value="link_to_add_photos"/>
    <div>
      <h1>Add new iPhone to stock</h1>
      <p>You are adding item with ECID: {{ id }}</p>
    </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { computed, ref } from 'vue'
  import QrCode from '@/components/QrCode.vue';

  const route = useRoute();
  const id = route.params.id;
  
  const baseUrl = `https://stock-tracker-mt6k.onrender.com`
  const link_to_add_photos = computed(() => `${baseUrl}/addPhotos/${id}`);
  
</script>