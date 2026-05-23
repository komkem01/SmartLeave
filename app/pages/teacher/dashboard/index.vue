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
            <p class="text-sm font-bold text-slate-800">{{ profileFullName }}</p>
            <p class="text-3xs text-slate-500">{{ profileDepartment }}</p>
          </div>
          <div class="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-slate-700">
            {{ profileInitials }}
          </div>
          <AppLogoutButton />
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div v-if="isLoading" class="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
        กำลังโหลดข้อมูลแดชบอร์ดครู...
      </div>

      <section class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-950">สวัสดีครับ, {{ greetingName }}</h1>
          <p class="text-sm text-slate-500 mt-1">โควต้าการลาดึงจากการตั้งค่าประเภทลาในระบบ</p>
          <div class="mt-3 flex flex-wrap gap-2 text-xs">
            <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">ใช้แล้ว {{ formatDay(totalUsedRequests) }} วัน</span>
            <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">คงเหลือ {{ formatDay(totalRemainingRequests) }} วัน</span>
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
          <h2 class="text-lg font-bold text-slate-900">โควต้าการลา (วัน)</h2>
          <span class="text-xs text-slate-400">อิงตามการตั้งค่าประเภทลา (นับเฉพาะที่อนุมัติแล้ว)</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="policy in leavePolicies"
            :key="policy.type"
            class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div class="flex items-center justify-between mb-3">
              <p class="text-sm font-bold text-slate-900">{{ policy.label }}</p>
              <span class="text-xs px-2 py-0.5 rounded-full" :class="policy.badgeClass">{{ formatDay(policy.usedRequests) }}/{{ formatDay(policy.maxRequests) }} วัน</span>
            </div>
            <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div class="h-full rounded-full transition-all" :class="policy.barClass" :style="{ width: `${policy.maxRequests > 0 ? Math.min(100, (policy.usedRequests / policy.maxRequests) * 100) : 0}%` }"></div>
            </div>
            <p class="mt-3 text-xs text-slate-500">คงเหลือ {{ formatDay(Math.max(0, policy.maxRequests - policy.usedRequests)) }} วัน</p>
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
                <th class="py-4 px-6 text-right">รายละเอียด</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
              <tr v-for="req in paginatedTeacherRequests" :key="req.id" class="hover:bg-slate-50/50 transition-colors">
                <td class="py-4 px-6 font-semibold text-slate-900">{{ req.leaveTypeName }}</td>
                <td class="py-4 px-6 text-slate-500">{{ req.dateString }}</td>
                <td class="py-4 px-6 font-semibold">{{ formatDay(req.totalDays) }} วัน</td>
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
                <td class="py-4 px-6 text-right">
                  <NuxtLink
                    :to="`/teacher/leave-request/${req.id}`"
                    class="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    ดูรายละเอียด
                  </NuxtLink>
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
import { computed, onMounted, ref, watch } from 'vue'

const { addToast } = useToast()
const config = useRuntimeConfig()
const BASE = config.public.BASE_API

definePageMeta({
  middleware: ['require-auth']
})

type LeaveType = 'sick' | 'personal' | 'vacation' | 'other'
type LeaveStatus = 'pending' | 'approved' | 'rejected'

interface LeavePolicy {
  type: string
  label: string
  maxRequests: number
  usedRequests: number
  badgeClass: string
  barClass: string
}

interface TeacherRequest {
  id: string
  leaveTypeID: string
  leaveTypeName: string
  dateString: string
  totalDays: number
  status: LeaveStatus
  approvedBy: string | null
  actionTime: string
}

interface ApiCurrentUser {
  id: string
  firstname?: string
  lastname?: string
  department?: string
  role?: string
  email?: string
}

interface ApiLeaveRequest {
  id: string
  member_id: string
  leave_type_id: string
  start_date: string
  end_date: string
  total_days: number
  reason: string
  status: LeaveStatus
  approved_by?: string
  approved_at?: string
  updated_at: string
}

interface ApiLeaveType {
  id: string
  name: string
  max_days: number
}

interface ApiMember {
  id: string
  firstname?: string
  lastname?: string
}

const isLoading = ref(false)

const currentUser = ref<ApiCurrentUser | null>(null)
const leaveTypeMap = ref<Record<string, ApiLeaveType>>({})
const memberMap = ref<Record<string, ApiMember>>({})

const leavePolicies = ref<LeavePolicy[]>([])

const teacherRequests = ref<TeacherRequest[]>([])

const pageSize = 5
const currentPage = ref(1)

const monthShortTH = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']

const profileFullName = computed(() => {
  const first = currentUser.value?.firstname?.trim() || ''
  const last = currentUser.value?.lastname?.trim() || ''
  return `${first} ${last}`.trim() || 'ครูผู้สอน'
})

const profileDepartment = computed(() => currentUser.value?.department || '-')

const profileInitials = computed(() => {
  const first = currentUser.value?.firstname?.trim() || ''
  const last = currentUser.value?.lastname?.trim() || ''
  const initials = `${first.charAt(0)}${last.charAt(0)}`.trim()
  return initials || 'คร'
})

const greetingName = computed(() => currentUser.value?.firstname?.trim() || 'คุณครู')

const normalizeDayNumber = (value: number, digits = 2) => {
  const num = Number(value || 0)
  const factor = 10 ** digits
  return Math.round((num + Number.EPSILON) * factor) / factor
}

const formatDay = (value: number) => {
  const normalized = normalizeDayNumber(value)
  if (Number.isInteger(normalized)) return String(normalized)
  return String(normalized)
}

const totalUsedRequests = computed(() => normalizeDayNumber(leavePolicies.value.reduce((sum, p) => sum + p.usedRequests, 0)))
const totalRemainingRequests = computed(() => normalizeDayNumber(leavePolicies.value.reduce((sum, p) => sum + (p.maxRequests - p.usedRequests), 0)))
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

const formatDate = (dateText: string) => {
  const d = new Date(dateText)
  if (Number.isNaN(d.getTime())) return dateText
  return `${d.getDate()} ${monthShortTH[d.getMonth()]} ${d.getFullYear() + 543}`
}

const formatDateTime = (dateText: string) => {
  const d = new Date(dateText)
  if (Number.isNaN(d.getTime())) return dateText
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${d.getDate()} ${monthShortTH[d.getMonth()]} ${d.getFullYear() + 543}, ${hh}:${mm} น.`
}

const policyColorPairs = [
  { badgeClass: 'bg-emerald-50 text-emerald-700', barClass: 'bg-emerald-500' },
  { badgeClass: 'bg-amber-50 text-amber-700', barClass: 'bg-amber-500' },
  { badgeClass: 'bg-blue-50 text-blue-700', barClass: 'bg-blue-500' },
  { badgeClass: 'bg-violet-50 text-violet-700', barClass: 'bg-violet-500' },
  { badgeClass: 'bg-cyan-50 text-cyan-700', barClass: 'bg-cyan-500' },
]

const syncPolicyQuotaFromBackend = (leaveTypes: ApiLeaveType[]) => {
  leavePolicies.value = leaveTypes.map((item, index) => {
    const colors = policyColorPairs[index % policyColorPairs.length] || { badgeClass: 'bg-slate-100 text-slate-700', barClass: 'bg-slate-500' }
    const maxDays = Number(item.max_days || 0)
    return {
      type: item.id,
      label: item.name,
      maxRequests: Number.isFinite(maxDays) && maxDays > 0 ? Math.floor(maxDays) : 0,
      usedRequests: 0,
      badgeClass: colors.badgeClass,
      barClass: colors.barClass,
    }
  })
}

const mapRequest = (item: ApiLeaveRequest): TeacherRequest => {
  const leaveTypeName = leaveTypeMap.value[item.leave_type_id]?.name || 'ไม่ระบุประเภท'
  const approvedMember = item.approved_by ? memberMap.value[item.approved_by] : null
  const approvedBy = approvedMember
    ? `ผอ.${(approvedMember.firstname || '').trim()} ${(approvedMember.lastname || '').trim()}`.trim()
    : null

  return {
    id: item.id,
    leaveTypeID: item.leave_type_id,
    leaveTypeName,
    dateString: item.start_date === item.end_date
      ? formatDate(item.start_date)
      : `${formatDate(item.start_date)} - ${formatDate(item.end_date)}`,
    totalDays: Number(item.total_days || 0),
    status: item.status,
    approvedBy,
    actionTime: formatDateTime(item.approved_at || item.updated_at),
  }
}

const updatePolicyUsage = () => {
  const usedByType: Record<string, number> = {}

  for (const item of teacherRequests.value) {
    if (item.status !== 'approved') continue
    usedByType[item.leaveTypeID] = (usedByType[item.leaveTypeID] || 0) + Number(item.totalDays || 0)
  }

  leavePolicies.value = leavePolicies.value.map((policy) => ({
    ...policy,
    usedRequests: Number((usedByType[policy.type] || 0).toFixed(1)),
  }))
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

const fetchReferenceData = async () => {
  const [leaveTypeRes, memberRes] = await Promise.all([
    $fetch<any>(`${BASE}/system/leave-type`),
    $fetch<any>(`${BASE}/member`),
  ])

  const leaveTypes = (leaveTypeRes?.data ?? []) as ApiLeaveType[]
  const members = (memberRes?.data ?? []) as ApiMember[]

  syncPolicyQuotaFromBackend(leaveTypes)

  leaveTypeMap.value = leaveTypes.reduce<Record<string, ApiLeaveType>>((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})

  memberMap.value = members.reduce<Record<string, ApiMember>>((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})
}

const fetchTeacherDashboard = async () => {
  isLoading.value = true
  try {
    await fetchCurrentUser()
    await fetchReferenceData()

    const leaveRes = await $fetch<any>(`${BASE}/leave-request`)
    const allRequests = (leaveRes?.data ?? []) as ApiLeaveRequest[]
    const myId = currentUser.value?.id || ''

    teacherRequests.value = allRequests
      .filter((item) => item.member_id === myId)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .map(mapRequest)

    updatePolicyUsage()
  } catch {
    addToast('error', 'โหลดข้อมูลไม่สำเร็จ', 'ไม่สามารถโหลดข้อมูลแดชบอร์ดครูได้ กรุณาลองใหม่')
  } finally {
    isLoading.value = false
  }
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

onMounted(() => {
  fetchTeacherDashboard()
})
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