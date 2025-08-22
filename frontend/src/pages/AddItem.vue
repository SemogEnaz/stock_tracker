<template>
    <qrcode-vue
        :value="value"
        :level="level"
        :render-as="renderAs"
        :background="background"
        :foreground='foreground'
        :gradient="gradient"
        :gradient-type="gradientType"
        :gradient-start-color="gradientStartColor"
        :gradient-end-color="gradientEndColor"
        
    />
    <div>
      <h1>Add new iPhone to stock</h1>
      <p>You are adding item with ECID: {{ id }}</p>
    </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'
  import QrcodeVue from 'qrcode.vue'
  import type { Level, RenderAs, GradientType, ImageSettings } from 'qrcode.vue'
  
  const route = useRoute();
  const id = route.params.id;
  
  const baseUrl = `https://stock-tracker-mt6k.onrender.com`
  const link_to_add_photos = `${baseUrl}/addPhotos/${id}`
  console.log(link_to_add_photos)
  const value = ref(link_to_add_photos)
  
  const level = ref<Level>('M')
  const renderAs = ref<RenderAs>('svg')
  const background = ref('#ffffff')
  const foreground = ref('#000000')
  const margin = ref(0)

  const imageSettings = ref<ImageSettings>({
    src: 'https://github.com/scopewu.png',
    width: 30,
    height: 30,
    // x: 10,
    // y: 10,
    excavate: true,
  });

  const gradient = ref(false);
  const gradientType = ref<GradientType>('linear');
  const gradientStartColor = ref('#000000');
  const gradientEndColor = ref('#38bdf8');

  const qrcode = `<qrcode-vue
        :value="value"
        :level="level"
        :render-as="renderAs"
        :background="background"
        :foreground='foreground'
        :gradient="gradient"
        :gradient-type="gradientType"
        :gradient-start-color="gradientStartColor"
        :gradient-end-color="gradientEndColor"
        :image-settings='imageSettings'
    />`

</script>