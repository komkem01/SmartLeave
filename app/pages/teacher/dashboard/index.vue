<template>
  <div class="min-h-screen bg-slate-50 font-sans antialiased">
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p class="text-lg font-bold text-slate-950 leading-tight">SmartLeave</p>
            <p class="text-3xs font-semibold text-slate-500 tracking-wider uppercase">แดชบอร์ดครูผู้สอน</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-bold text-slate-800">ครูสมชาย สายสอน</p>
            <p class="text-3xs text-slate-500">กลุ่มสาระวิทยาศาสตร์ฯ</p>
          </div>
          <div class="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-slate-700">
            สช
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <section class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-950">สวัสดีครับ, คุณครูสมชาย</h1>
          <p class="text-sm text-slate-500 mt-1">ปีการศึกษา {{ academicYear }} • โควต้าการลานับเป็นจำนวนครั้งต่อปีการศึกษา</p>
          <div class="mt-3 flex flex-wrap gap-2 text-xs">
            <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">ใช้แล้ว {{ totalUsedRequests }} ครั้ง</span>
            <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">คงเหลือ {{ totalRemainingRequests }} ครั้ง</span>
          </div>
        </div>

        <button
          @click="navigateTo('/teacher/leave-request')"
          class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/10 transition-all flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          ยื่นใบขอลาใหม่
        </button>
      </section>

      <section>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-slate-900">โควต้าการลา (ครั้ง/ปีการศึกษา)</h2>
          <span class="text-xs text-slate-400">อิงตามกติกาโรงเรียน</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="policy in leavePolicies"
            :key="policy.type"
            class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div class="flex items-center justify-between mb-3">
              <p class="text-sm font-bold text-slate-900">{{ policy.label }}</p>
              <span class="text-xs px-2 py-0.5 rounded-full" :class="policy.badgeClass">{{ policy.usedRequests }}/{{ policy.maxRequests }} ครั้ง</span>
            </div>
            <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div class="h-full rounded-full transition-all" :class="policy.barClass" :style="{ width: `${Math.min(100, (policy.usedRequests / policy.maxRequests) * 100)}%` }"></div>
            </div>
            <p class="mt-3 text-xs text-slate-500">คงเหลือ {{ policy.maxRequests - policy.usedRequests }} ครั้ง</p>
          </div>
        </div>
      </section>

      <section class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 class="text-lg font-bold text-slate-900">ประวัติการยื่นใบลา</h2>
          <span class="text-xs text-slate-400">ทั้งหมด {{ teacherRequests.length }} รายการ</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 text-slate-400 text-3xs font-bold uppercase tracking-wider border-b border-slate-100">
                <th class="py-4 px-6">ประเภทการลา</th>
                <th class="py-4 px-6">ช่วงวันที่ลา</th>
                <th class="py-4 px-6">จำนวนวัน</th>
                <th class="py-4 px-6">สถานะ</th>
                <th class="py-4 px-6">ผู้พิจารณา</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
              <tr v-for="req in paginatedTeacherRequests" :key="req.id" class="hover:bg-slate-50/50 transition-colors">
                <td class="py-4 px-6 font-semibold text-slate-900">{{ getLeaveTypeLabel(req.type) }}</td>
                <td class="py-4 px-6 text-slate-500">{{ req.dateString }}</td>
                <td class="py-4 px-6 font-semibold">{{ req.totalDays }} วัน</td>
                <td class="py-4 px-6">
                  <span class="px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1" :class="getStatusClass(req.status)">
                    <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(req.status)"></span>
                    {{ getStatusText(req.status) }}
                  </span>
                </td>
                <td class="py-4 px-6 text-slate-500">
                  <div v-if="req.approvedBy" class="flex flex-col">
                    <span class="font-medium text-slate-800">{{ req.approvedBy }}</span>
                    <span class="text-3xs text-slate-400">{{ req.actionTime }}</span>
                  </div>
                  <span v-else class="text-slate-400 italic">รอพิจารณา</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <p class="text-xs text-slate-500">
            แสดง {{ paginationStart }}-{{ paginationEnd }} จาก {{ teacherRequests.length }} รายการ
          </p>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="currentPage === 1"
              @click="goToPreviousPage"
            >
              ก่อนหน้า
            </button>
            <span class="text-xs font-semibold text-slate-600 px-2">หน้า {{ currentPage }}/{{ totalPages }}</span>
            <button
              type="button"
              class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="currentPage === totalPages"
              @click="goToNextPage"
            >
              ถัดไป
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

definePageMeta({
  middleware: ['require-auth']
})

type LeaveType = 'sick' | 'personal' | 'vacation'
type LeaveStatus = 'pending' | 'approved' | 'rejected'

interface LeavePolicy {
  type: LeaveType
  label: string
  maxRequests: number
  usedRequests: number
  badgeClass: string
  barClass: string
}

interface TeacherRequest {
  id: number
  type: LeaveType
  dateString: string
  totalDays: number
  status: LeaveStatus
  approvedBy: string
  actionTime: string
}

const academicYear = '2026'

const leavePolicies = ref<LeavePolicy[]>([
  { type: 'sick', label: 'ลาป่วย', maxRequests: 12, usedRequests: 2, badgeClass: 'bg-emerald-50 text-emerald-700', barClass: 'bg-emerald-500' },
  { type: 'personal', label: 'ลากิจ', maxRequests: 8, usedRequests: 1, badgeClass: 'bg-amber-50 text-amber-700', barClass: 'bg-amber-500' },
  { type: 'vacation', label: 'ลาพักผ่อน', maxRequests: 6, usedRequests: 2, badgeClass: 'bg-blue-50 text-blue-700', barClass: 'bg-blue-500' }
])

const teacherRequests = ref<TeacherRequest[]>([
  {
    id: 1,
    type: 'personal',
    dateString: '18 พ.ค. 2569 - 19 พ.ค. 2569',
    totalDays: 1.5,
    status: 'approved',
    approvedBy: 'ผอ.วันชัย ใจดี',
    actionTime: '15 พ.ค. 2026, 09:30 น.'
  },
  {
    id: 2,
    type: 'sick',
    dateString: '04 พ.ค. 2569 - 05 พ.ค. 2569',
    totalDays: 2,
    status: 'approved',
    approvedBy: 'ผอ.วันชัย ใจดี',
    actionTime: '02 พ.ค. 2026, 14:15 น.'
  },
  {
    id: 3,
    type: 'vacation',
    dateString: '10 มี.ค. 2569 - 14 มี.ค. 2569',
    totalDays: 4,
    status: 'rejected',
    approvedBy: 'ผอ.วันชัย ใจดี',
    actionTime: '08 มี.ค. 2026, 11:00 น.'
  }
])

const pageSize = 5
const currentPage = ref(1)

const totalUsedRequests = computed(() => leavePolicies.value.reduce((sum, p) => sum + p.usedRequests, 0))
const totalRemainingRequests = computed(() => leavePolicies.value.reduce((sum, p) => sum + (p.maxRequests - p.usedRequests), 0))
const totalPages = computed(() => Math.max(1, Math.ceil(teacherRequests.value.length / pageSize)))
const paginatedTeacherRequests = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return teacherRequests.value.slice(start, end)
})
const paginationStart = computed(() => {
  if (teacherRequests.value.length === 0) return 0
  return (currentPage.value - 1) * pageSize + 1
})
const paginationEnd = computed(() => Math.min(currentPage.value * pageSize, teacherRequests.value.length))

const getLeaveTypeLabel = (type: LeaveType) => {
  if (type === 'sick') return 'ลาป่วย'
  if (type === 'personal') return 'ลากิจ'
  return 'ลาพักผ่อน'
}

watch(
  () => teacherRequests.value.length,
  () => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value
    }
  }
)

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
  }
}

const getStatusClass = (status: LeaveStatus) => {
  if (status === 'approved') return 'bg-emerald-50 text-emerald-700'
  if (status === 'rejected') return 'bg-rose-50 text-rose-700'
  return 'bg-amber-50 text-amber-700'
}

const getStatusDotClass = (status: LeaveStatus) => {
  if (status === 'approved') return 'bg-emerald-500'
  if (status === 'rejected') return 'bg-rose-500'
  return 'bg-amber-500'
}

const getStatusText = (status: LeaveStatus) => {
  if (status === 'approved') return 'อนุมัติแล้ว'
  if (status === 'rejected') return 'ไม่อนุมัติ'
  return 'รอพิจารณา'
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.25s ease-out forwards;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0); }
}
</style>