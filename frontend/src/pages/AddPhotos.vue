<template>
    <h2>Add Photos for item {{ id }}</h2>

    <!-- 1) Pick photos -->
    <button type="button" @click="openPicker">Choose or take photo(s)</button>

    <!-- Hidden file input -->
    <input
        ref="fileInput"
        type="file"
        accept="image/*"
        multiple
        @change="onFilesSelected"
        style="display:none"
    />

    <!-- 2) Simple status -->
    <p v-if="files.length">Selected: {{ files.length }} file(s)</p>

    <!-- (optional) one tiny preview so user knows it worked -->
    <img
        v-if="previewUrl"
        :src="previewUrl"
        alt="preview"
        style="max-width:140px; display:block; margin:8px 0;"
    />

    <!-- 3) Confirm: send to backend -->
    <button
        type="button"
        :disabled="!files.length || isSubmitting"
        @click="confirm"
    >
        {{ isSubmitting ? 'Submitting…' : 'Confirm' }}
    </button>
</template>

<script setup>

    import { useRoute } from 'vue-router'
    import { ref, onBeforeUnmount } from 'vue';

    const route = useRoute();
    const id = ref(route.params.id);

    const fileInput = ref(null)
    const files = ref([])         // holds File objects (stays in frontend until confirm)
    const previewUrl = ref('')     // quick feedback
    const isSubmitting = ref(false)

    function openPicker() {
    fileInput.value?.click()
    }

    function onFilesSelected(e) {
    // clear previous
    files.value = []
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = ''

    const list = Array.from(e.target.files || [])
    files.value = list

    // show a single tiny preview (first image), optional
    if (list[0]) previewUrl.value = URL.createObjectURL(list[0])
    }

    onBeforeUnmount(() => {
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    })

    async function confirm() {
    // MINIMUM: send files to backend when user confirms
    // Backend can forward/chain to another API.
    isSubmitting.value = true
    try {
        const form = new FormData()
        // if your backend expects an array name:
        files.value.forEach((f) => form.append('photos[]', f, f.name))

        // call your API endpoint (adjust the URL to match your server)
        const res = await fetch('/api/photos/confirm', {
        method: 'POST',
        body: form
        })

        if (!res.ok) throw new Error(`Server returned ${res.status}`)
        alert('Submitted!')

        // reset UI
        files.value = []
        if (fileInput.value) fileInput.value.value = ''
        if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
        previewUrl.value = ''
    } catch (err) {
        console.error(err)
        alert('Sorry, submission failed.')
    } finally {
        isSubmitting.value = false
    }
    }
</script>
