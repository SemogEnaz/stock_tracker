<template>
  <div class="uploader">
    <h2>Upload to R2</h2>

    <form @submit.prevent="upload" id="f">
      <label>
        Object key
        <input v-model="keyInput" placeholder="0x00015/front.jpg" />
      </label>

      <label class="file">
        File
        <input type="file" accept="image/*" @change="onFile" />
      </label>

      <button :disabled="!canUpload || busy">
        {{ busy ? `Uploading… ${progress}%` : 'Upload' }}
      </button>
    </form>

    <div v-if="previewUrl" class="preview">
      <img :src="previewUrl" alt="preview" />
    </div>

    <pre v-if="result" class="result">{{ result }}</pre>
    <div v-if="error" class="error"><strong>Error:</strong> {{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const API_BASE = '' // same-origin; set to 'http://localhost:3001' in dev if needed

const keyInput = ref('0x00015/front.jpg')
const file = ref(null)
const busy = ref(false)
const progress = ref(0)
const result = ref('')
const error = ref('')
const previewUrl = ref(null)

const canUpload = computed(() => !!file.value && !!keyInput.value)

function onFile(e) {
  const f = e.target.files?.[0]
  if (!f) return
  file.value = f
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = URL.createObjectURL(f)
}

async function upload() {
  if (!canUpload.value) return
  busy.value = true
  error.value = ''
  result.value = ''
  progress.value = 0

  try {
    const fd = new FormData()
    fd.append('key', keyInput.value)
    fd.append('file', file.value)

    // fetch (simple) — mirrors your earlier HTML example
    const res = await fetch(`${API_BASE}/r2/upload`, {
      method: 'POST',
      body: fd,
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json?.error || 'Upload failed')
    result.value = JSON.stringify(json, null, 2)
  } catch (e) {
    error.value = e?.message || 'Upload failed'
  } finally {
    busy.value = false
  }
}
</script>

<style scoped>
.uploader { max-width: 520px; margin: 1rem auto; padding: 1rem; border: 1px solid #eee; border-radius: 8px; }
label { display: block; margin: 0.5rem 0; }
input[type="file"] { display: block; margin-top: 0.25rem; }
button { margin-top: 0.75rem; padding: 0.5rem 0.9rem; }
.preview { margin-top: 1rem; }
.preview img { max-width: 100%; display: block; border: 1px solid #eee; border-radius: 6px; }
.result, .error { margin-top: 1rem; white-space: pre-wrap; word-break: break-word; }
.error { color: #b00020; }
</style>
