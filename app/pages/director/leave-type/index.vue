<template>
  <div class="min-h-screen bg-slate-50 font-sans antialiased">
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <span class="text-lg font-bold text-slate-950 block leading-tight">SmartLeave</span>
              <span class="text-3xs font-semibold text-slate-500 tracking-wider uppercase">โรงเรียนสะอาดประชาสรรพ์</span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="hidden md:block text-right">
              <p class="text-sm font-bold text-slate-800">{{ headerDisplayName }}</p>
              <p class="text-3xs text-slate-500 font-semibold tracking-wider uppercase">ผู้อำนวยการสถานศึกษา</p>
            </div>
            <div class="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-blue-700">
              {{ headerInitials }}
            </div>
            <AppLogoutButton />
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-950">จัดการประเภทการลา</h1>
          <p class="text-sm text-slate-500 mt-1">เพิ่ม ลบ และแก้ไขประเภทการลาให้เป็นมาตรฐานของระบบ</p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <NuxtLink
            to="/director/dashboard"
            class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            ย้อนกลับ
          </NuxtLink>
          <button
            type="button"
            class="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            @click="fetchLeaveTypes"
          >
            รีเฟรชข้อมูล
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
            @click="openCreateModal"
          >
            เพิ่มประเภทการลา
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
        กำลังโหลดข้อมูลประเภทการลา...
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 text-slate-400 text-xs font-sans uppercase tracking-wide border-b border-slate-100">
                <th class="py-3 px-6">ชื่อประเภทลา</th>
                <th class="py-3 px-6">จำนวนวันสูงสุด</th>
                <th class="py-3 px-6">สถานะ</th>
                <th class="py-3 px-6">อัปเดตล่าสุด</th>
                <th class="py-3 px-6 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
              <tr v-for="item in leaveTypes" :key="item.id" class="hover:bg-slate-50/50 transition-colors">
                <td class="py-4 px-6 font-semibold text-slate-900">{{ item.name }}</td>
                <td class="py-4 px-6">{{ item.max_days }} วัน</td>
                <td class="py-4 px-6">
                  <span
                    class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                    :class="item.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'"
                  >
                    {{ item.is_active ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}
                  </span>
                </td>
                <td class="py-4 px-6 text-xs text-slate-500">{{ formatDateTime(item.updated_at) }}</td>
                <td class="py-4 px-6 text-right">
                  <div class="inline-flex items-center gap-2">
                    <button
                      type="button"
                      class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      @click="openEditModal(item)"
                    >
                      แก้ไข
                    </button>
                    <button
                      type="button"
                      class="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors"
                      @click="openDeleteModal(item)"
                    >
                      ลบ
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!isLoading && leaveTypes.length === 0">
                <td colspan="5" class="py-10 text-center text-slate-400 italic">ยังไม่มีข้อมูลประเภทการลา</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="openCreate || openEdit" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeFormModal"></div>

        <div class="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div class="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-5">
            <h3 class="text-base font-bold text-slate-950">{{ openCreate ? 'เพิ่มประเภทการลา' : 'แก้ไขประเภทการลา' }}</h3>
            <button class="text-slate-400 hover:text-slate-600" @click="closeFormModal">✕</button>
          </div>

          <form class="space-y-4 p-6" @submit.prevent="submitForm">
            <div>
              <label class="block text-xs font-semibold text-slate-700">ชื่อประเภทลา <span class="text-rose-500">*</span></label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="เช่น ลาป่วย"
                class="mt-1.5 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700">จำนวนวันสูงสุด <span class="text-rose-500">*</span></label>
              <input
                v-model="form.max_days"
                type="text"
                inputmode="numeric"
                required
                placeholder="เช่น 10"
                class="mt-1.5 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700">สถานะการใช้งาน <span class="text-rose-500">*</span></label>
              <AppDropdown
                v-model="form.is_active"
                :options="statusOptions"
                placeholder="เลือกสถานะ"
                :allow-page-size-select="false"
                :page-size="5"
              />
            </div>

            <div class="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button type="button" class="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200" @click="closeFormModal">
                ยกเลิก
              </button>
              <button
                type="submit"
                :disabled="isSaving"
                class="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {{ isSaving ? 'กำลังบันทึก...' : (openCreate ? 'บันทึกการเพิ่ม' : 'บันทึกการแก้ไข') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="openDelete" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeDeleteModal"></div>

        <div class="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div class="border-b border-slate-100 bg-slate-50 px-6 py-5">
            <h3 class="text-base font-bold text-slate-950">ยืนยันการลบประเภทการลา</h3>
          </div>

          <div class="space-y-4 p-6">
            <p class="text-sm text-slate-700">
              ยืนยันลบประเภทการลา
              <span class="font-bold text-slate-900">{{ selectedItem?.name }}</span>
              ใช่หรือไม่?
            </p>

            <div class="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button type="button" class="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200" @click="closeDeleteModal">
                ยกเลิก
              </button>
              <button
                type="button"
                :disabled="isSaving"
                class="rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white hover:bg-rose-700 disabled:opacity-60 disabled:cursor-not-allowed"
                @click="confirmDelete"
              >
                {{ isSaving ? 'กำลังลบ...' : 'ยืนยันลบ' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const { addToast } = useToast()
const config = useRuntimeConfig()
const BASE = config.public.BASE_API

interface LeaveTypeItem {
  id: string
  name: string
  max_days: number
  is_active: boolean
  created_at: string
  updated_at: string
}

interface ApiCurrentUser {
  firstname?: string
  lastname?: string
}

definePageMeta({
  middleware: ['require-auth'],
})

const leaveTypes = ref<LeaveTypeItem[]>([])
const currentUser = ref<ApiCurrentUser | null>(null)

const isLoading = ref(false)
const isSaving = ref(false)

const openCreate = ref(false)
const openEdit = ref(false)
const openDelete = ref(false)

const selectedItem = ref<LeaveTypeItem | null>(null)

const form = ref({
  id: '',
  name: '',
  max_days: '1',
  is_active: 'true',
})

const statusOptions = [
  { label: 'เปิดใช้งาน', value: 'true' },
  { label: 'ปิดใช้งาน', value: 'false' },
]

const monthShortTH = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']

const headerDisplayName = computed(() => {
  const first = currentUser.value?.firstname?.trim() || ''
  const last = currentUser.value?.lastname?.trim() || ''
  const full = `${first} ${last}`.trim()
  return full ? `ผอ.${full}` : 'ผู้อำนวยการ'
})

const headerInitials = computed(() => {
  const first = currentUser.value?.firstname?.trim() || ''
  const last = currentUser.value?.lastname?.trim() || ''
  return `${first.charAt(0)}${last.charAt(0)}`.trim() || 'ผอ'
})

const formatDateTime = (dateText: string) => {
  const d = new Date(dateText)
  if (Number.isNaN(d.getTime())) return dateText
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${d.getDate()} ${monthShortTH[d.getMonth()]} ${d.getFullYear()}, ${hh}:${mm} น.`
}

const resetForm = () => {
  form.value = {
    id: '',
    name: '',
    max_days: '1',
    is_active: 'true',
  }
}

const fetchCurrentUser = async () => {
  if (!import.meta.client) return

  const token = localStorage.getItem('smartleave:access_token')
  if (!token) return

  const meRes = await $fetch<any>(`${BASE}/member/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  currentUser.value = (meRes?.data ?? null) as ApiCurrentUser | null
}

const fetchLeaveTypes = async () => {
  isLoading.value = true
  try {
    const res = await $fetch<any>(`${BASE}/system/leave-type?include_inactive=true`)
    leaveTypes.value = ((res?.data ?? []) as LeaveTypeItem[]).sort((a, b) => a.name.localeCompare(b.name, 'th'))
  } catch {
    addToast('error', 'โหลดข้อมูลไม่สำเร็จ', 'ไม่สามารถดึงรายการประเภทการลาได้')
  } finally {
    isLoading.value = false
  }
}

const openCreateModal = () => {
  resetForm()
  openCreate.value = true
}

const openEditModal = (item: LeaveTypeItem) => {
  form.value = {
    id: item.id,
    name: item.name,
    max_days: String(item.max_days),
    is_active: item.is_active ? 'true' : 'false',
  }
  openEdit.value = true
}

const closeFormModal = () => {
  if (isSaving.value) return
  openCreate.value = false
  openEdit.value = false
  resetForm()
}

const submitForm = async () => {
  const name = form.value.name.trim()
  const maxDays = Number(form.value.max_days.trim())
  let saveSucceeded = false

  if (!name) {
    addToast('warning', 'ข้อมูลไม่ครบ', 'กรุณาระบุชื่อประเภทการลา')
    return
  }

  if (!Number.isFinite(maxDays) || maxDays <= 0) {
    addToast('warning', 'ข้อมูลไม่ถูกต้อง', 'จำนวนวันสูงสุดต้องมากกว่า 0')
    return
  }

  isSaving.value = true
  try {
    if (openCreate.value) {
      await $fetch(`${BASE}/system/leave-type`, {
        method: 'POST',
        body: {
          name,
          max_days: Math.floor(maxDays),
          is_active: form.value.is_active === 'true',
        },
      })
      addToast('success', 'เพิ่มสำเร็จ', 'เพิ่มประเภทการลาเรียบร้อยแล้ว')
      saveSucceeded = true
    } else if (openEdit.value && form.value.id) {
      await $fetch(`${BASE}/system/leave-type/${form.value.id}`, {
        method: 'PATCH',
        body: {
          name,
          max_days: Math.floor(maxDays),
          is_active: form.value.is_active === 'true',
        },
      })
      addToast('success', 'แก้ไขสำเร็จ', 'บันทึกการแก้ไขประเภทการลาเรียบร้อยแล้ว')
      saveSucceeded = true
    }
  } catch (error: any) {
    const message = error?.data?.message || ''
    if (message === 'leave-type-name-duplicate') {
      addToast('warning', 'ข้อมูลซ้ำ', 'มีชื่อประเภทลานี้อยู่แล้ว กรุณาใช้ชื่ออื่น')
      return
    }

    addToast('error', 'บันทึกไม่สำเร็จ', 'ไม่สามารถบันทึกประเภทการลาได้ กรุณาลองใหม่')
  } finally {
    isSaving.value = false

    if (saveSucceeded) {
      closeFormModal()
      await fetchLeaveTypes()
    }
  }
}

const openDeleteModal = (item: LeaveTypeItem) => {
  selectedItem.value = item
  openDelete.value = true
}

const closeDeleteModal = () => {
  if (isSaving.value) return
  openDelete.value = false
  selectedItem.value = null
}

const confirmDelete = async () => {
  if (!selectedItem.value) return

  let deleteSucceeded = false
  isSaving.value = true
  try {
    await $fetch(`${BASE}/system/leave-type/${selectedItem.value.id}`, {
      method: 'DELETE',
    })
    addToast('success', 'ลบสำเร็จ', `ลบประเภทการลา "${selectedItem.value.name}" เรียบร้อยแล้ว`)
    deleteSucceeded = true
  } catch (error: any) {
    const message = error?.data?.message || ''
    if (message === 'leave-type-in-use') {
      addToast('warning', 'ลบไม่ได้', 'ประเภทลานี้ถูกใช้งานอยู่ในคำขอลา ไม่สามารถลบได้')
      return
    }

    addToast('error', 'ลบไม่สำเร็จ', 'ไม่สามารถลบประเภทการลาได้ กรุณาลองใหม่')
  } finally {
    isSaving.value = false

    if (deleteSucceeded) {
      closeDeleteModal()
      await fetchLeaveTypes()
    }
  }
}

onMounted(async () => {
  await Promise.all([fetchCurrentUser(), fetchLeaveTypes()])
})
</script>
