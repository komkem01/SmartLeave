<template>
  <div>
    <NuxtLoadingIndicator color="#2563eb" :height="3" />
    <AppLoading
      v-if="isRouteLoading"
      fullscreen
      text="กำลังเปลี่ยนหน้า..."
    />
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <AppToast />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const router = useRouter()
const isRouteLoading = ref(false)

const removeBeforeEach = router.beforeEach(() => {
  isRouteLoading.value = true
})

const removeAfterEach = router.afterEach(() => {
  isRouteLoading.value = false
})

const removeOnError = router.onError(() => {
  isRouteLoading.value = false
})

onBeforeUnmount(() => {
  removeBeforeEach()
  removeAfterEach()
  removeOnError()
})
</script>
