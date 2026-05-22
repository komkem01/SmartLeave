<template>
  <div class="contents">
    <button
      type="button"
      :disabled="isLoggingOut"
      class="inline-flex items-center rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      @click="openConfirm = true"
    >
      {{ isLoggingOut ? 'กำลังออกจากระบบ...' : 'ออกจากระบบ' }}
    </button>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="openConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeConfirm"></div>

        <div class="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div class="border-b border-slate-100 bg-slate-50 px-6 py-5">
            <h3 class="text-base font-bold text-slate-950">ยืนยันออกจากระบบ</h3>
          </div>

          <div class="space-y-4 p-6">
            <p class="text-sm text-slate-700">คุณต้องการออกจากระบบตอนนี้ใช่หรือไม่?</p>

            <div class="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                class="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                :disabled="isLoggingOut"
                @click="closeConfirm"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                class="rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white hover:bg-rose-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                :disabled="isLoggingOut"
                @click="confirmLogout"
              >
                {{ isLoggingOut ? 'กำลังออกจากระบบ...' : 'ยืนยันออกจากระบบ' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const openConfirm = ref(false)
const isLoggingOut = ref(false)
const { logout } = useAuthSession()

const closeConfirm = () => {
  if (isLoggingOut.value) return
  openConfirm.value = false
}

const confirmLogout = async () => {
  if (isLoggingOut.value) return
  isLoggingOut.value = true
  await logout()
  isLoggingOut.value = false
  openConfirm.value = false
}
</script>
