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
</template>

<script setup lang="ts">

    const props = defineProps<{
        value: string
    }>();

    import { ref } from 'vue'
    import QrcodeVue from 'qrcode.vue'
    import type { Level, RenderAs, GradientType, ImageSettings } from 'qrcode.vue'

    const level = ref<Level>('M')
    const renderAs = ref<RenderAs>('svg')
    const background = ref('#ffffff')
    const foreground = ref('#000000')

    const gradient = ref(false)
    const gradientType = ref<GradientType>('linear')
    const gradientStartColor = ref('#000000')
    const gradientEndColor = ref('#38bdf8')
</script>