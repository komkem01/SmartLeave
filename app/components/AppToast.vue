<script setup lang="ts">
import { useToast, type ToastType } from '@/composables/useToast'

const { toasts, removeToast } = useToast()

// ฟังก์ชันแมปสีและไอคอนตามประเภท (Type)
const getStyles = (type: ToastType) => {
  const styles = {
    success: 'bg-emerald-50 border-emerald-500 text-emerald-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800',
    warning: 'bg-amber-50 border-amber-500 text-amber-800',
    error: 'bg-rose-50 border-rose-500 text-rose-800'
  }
  return styles[type]
}
</script>

<template>
  <div
    class="fixed top-4 right-4 z-50 flex flex-col items-end pointer-events-none w-full max-w-sm"
  >
    <TransitionGroup
      name="toast-list"
      tag="div"
      class="w-full flex flex-col items-end"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex w-full p-4 mb-3 border-l-4 rounded-r-lg shadow-lg transition-all duration-300"
        :class="getStyles(toast.type)"
      >
        <div class="flex-shrink-0">
          <svg
            v-if="toast.type === 'success'"
            class="w-5 h-5 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            v-else-if="toast.type === 'info'"
            class="w-5 h-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            v-else-if="toast.type === 'warning'"
            class="w-5 h-5 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <svg
            v-else-if="toast.type === 'error'"
            class="w-5 h-5 text-rose-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div class="ml-3 flex-1">
          <p class="text-sm font-semibold">{{ toast.title }}</p>
          <p class="mt-1 text-xs opacity-90">{{ toast.message }}</p>
        </div>

        <div class="ml-4 flex-shrink-0 flex">
          <button
            @click="removeToast(toast.id)"
            class="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
/* แอนิเมชันตอน Toast โผล่มาจากทางขวา และตอนยุบหายไป */
.toast-list-enter-from {
  opacity: 0;
  transform: translateX(60px);
}
.toast-list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
/* สไตล์ตอนที่เอลิเมนต์อื่นๆ ขยับตำแหน่งขึ้นด้านบนเมื่อตัวเก่าหายไป */
.toast-list-move {
  transition: transform 0.3s ease;
}
</style>
