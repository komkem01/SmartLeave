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
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-950">หน้าดูรายละเอียดคำขอลา</h1>
          <p class="text-sm text-slate-500 mt-1">แสดงข้อมูลทั้งหมดของใบคำร้องพร้อมไฟล์แนบ</p>
          <p class="text-xs text-blue-700 font-semibold mt-1">หน้านี้ต้องแสดงข้อมูลจากฟอร์มกรอกใบลาครบทุกช่อง</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <!-- <NuxtLink
            to="/director/leave-type"
            class="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            จัดการประเภทการลา
          </NuxtLink> -->
          <NuxtLink
            to="/director/leave-request-approve"
            class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            กลับหน้ารายการใบลา
          </NuxtLink>
          <button
            type="button"
            @click="downloadDoc"
            :disabled="leaveRequest?.status !== 'approved'"
            class="inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:hover:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            ดาวน์โหลด PDF
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
        กำลังโหลดข้อมูลใบคำร้องจากระบบ...
      </div>

      <div v-else-if="!leaveRequest" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center space-y-3">
        <h2 class="text-lg font-bold text-slate-900">ไม่พบข้อมูลใบคำร้อง</h2>
        <p class="text-sm text-slate-500">รายการที่ต้องการอาจถูกลบหรือยังไม่มีอยู่ในระบบ</p>
      </div>

      <div v-else class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p class="text-xs text-slate-500">เลขที่คำร้อง</p>
              <p class="text-base font-bold text-slate-900">{{ formattedRequestNumber }}</p>
              <p class="text-3xs text-slate-400 mt-1">อ้างอิงระบบ: {{ leaveRequest.id }}</p>
            </div>

            <div class="rounded-xl border border-slate-200 p-4">
              <p class="text-xs text-slate-500">สถานะ</p>
              <span class="inline-flex mt-1 px-2.5 py-1 rounded-full text-xs font-semibold" :class="getStatusClass(leaveRequest.status)">
                {{ getStatusText(leaveRequest.status) }}
              </span>
              <p v-if="leaveRequest.actionTime" class="text-xs text-slate-500 mt-2">ดำเนินการเมื่อ: {{ leaveRequest.actionTime }}</p>
              <p v-if="leaveRequest.rejectReason" class="text-xs text-rose-700 mt-2">เหตุผลการปฏิเสธ: {{ leaveRequest.rejectReason }}</p>
            </div>

            <div class="rounded-xl border border-slate-200 p-4">
              <p class="text-xs text-slate-500 mb-2">การพิจารณา</p>
              <div v-if="leaveRequest.status === 'pending'" class="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  @click="openRejectModal"
                  class="w-full sm:w-1/2 rounded-xl px-4 py-2 text-xs font-bold border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors"
                >
                  ไม่อนุมัติ
                </button>
                <button
                  type="button"
                  @click="openApproveConfirmModal"
                  :disabled="isActionLoading"
                  class="w-full sm:w-1/2 rounded-xl px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                    {{ isActionLoading ? 'กำลังบันทึก...' : 'อนุมัติ' }}
                </button>
              </div>
              <p v-else class="text-xs text-slate-600">รายการนี้ดำเนินการแล้ว ไม่สามารถเปลี่ยนสถานะซ้ำได้</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm lg:col-span-2">
              <div class="rounded-xl border border-slate-200 p-4">
                <p class="text-xs text-slate-500">ชื่อผู้ยื่น</p>
                <p class="font-bold text-slate-900">{{ leaveRequest.prefix }}{{ leaveRequest.firstName }} {{ leaveRequest.lastName }}</p>
              </div>
              <div class="rounded-xl border border-slate-200 p-4">
                <p class="text-xs text-slate-500">กลุ่มสาระ/ฝ่ายงาน</p>
                <p class="font-semibold text-slate-900">{{ leaveRequest.department }}</p>
              </div>
              <div class="rounded-xl border border-slate-200 p-4">
                <p class="text-xs text-slate-500">ประเภทการลา</p>
                <span class="inline-flex mt-1 rounded-lg px-2.5 py-1 text-xs font-semibold" :class="getLeaveTypeClass(leaveRequest.type)">
                  {{ getLeaveTypeText(leaveRequest.type) }}
                </span>
              </div>
              <div class="rounded-xl border border-slate-200 p-4">
                <p class="text-xs text-slate-500">จำนวนวัน</p>
                <p class="font-semibold text-slate-900">{{ leaveRequest.totalDays }} วัน</p>
              </div>
              <div class="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                <p class="text-xs text-slate-500">ช่วงวันที่ลา</p>
                <p class="font-semibold text-slate-900">{{ leaveRequest.dateString }}</p>
              </div>
              <div class="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                <p class="text-xs text-slate-500">ข้อมูลจากแบบฟอร์มใบลา (ครบทุกช่อง)</p>
                <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <p><span class="text-slate-500">อีเมล :</span> <span class="font-semibold text-slate-900">{{ leaveRequest.email }}</span></p>
                  <p><span class="text-slate-500">ตำแหน่ง :</span> <span class="font-semibold text-slate-900">{{ leaveRequest.position }}</span></p>
                  <p><span class="text-slate-500">วันที่เริ่มลา :</span> <span class="font-semibold text-slate-900">{{ leaveRequest.startDate }}</span></p>
                  <p><span class="text-slate-500">วันที่สิ้นสุดลา :</span> <span class="font-semibold text-slate-900">{{ leaveRequest.endDate }}</span></p>
                  <p class="sm:col-span-2"><span class="text-slate-500">สถานที่ :</span> <span class="font-semibold text-slate-900">{{ leaveRequest.location }}</span></p>
                  <p><span class="text-slate-500">จังหวัด :</span> <span class="font-semibold text-slate-900">{{ leaveRequest.province }}</span></p>
                  <p><span class="text-slate-500">อำเภอ/เขต :</span> <span class="font-semibold text-slate-900">{{ leaveRequest.district }}</span></p>
                  <p><span class="text-slate-500">ตำบล/แขวง :</span> <span class="font-semibold text-slate-900">{{ leaveRequest.subDistrict }}</span></p>
                  <p><span class="text-slate-500">รหัสไปรษณีย์ :</span> <span class="font-semibold text-slate-900">{{ leaveRequest.zipcode }}</span></p>
                </div>
              </div>
              <div class="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                <p class="text-xs text-slate-500">เหตุผลการลา</p>
                <p class="text-slate-800 leading-relaxed">{{ leaveRequest.reason }}</p>
              </div>
              <div class="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                <p class="text-xs text-slate-500">ไฟล์แนบ</p>
                <a
                  v-if="leaveRequest.attachmentUrl"
                  :href="leaveRequest.attachmentUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-semibold text-blue-700 underline"
                >
                  เปิดไฟล์แนบ
                </a>
                <p v-else class="font-semibold text-slate-900">ไม่มีไฟล์แนบ</p>
              </div>
              <div class="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                <p class="text-xs text-slate-500">เอกสารแนบเพิ่มเติม</p>
                <div v-if="leaveRequest.attachmentUrl" class="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2">
                  <p class="text-xs text-slate-700">เอกสารแนบถูกอัปโหลดแล้ว</p>
                  <div class="rounded-md bg-white border border-slate-200 p-3 text-xs text-slate-600">
                    <a
                      :href="leaveRequest.attachmentUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="font-semibold text-blue-700 underline"
                    >
                      คลิกเพื่อเปิดพรีวิวไฟล์แนบ
                    </a>
                  </div>
                </div>
                <p v-else class="mt-2 text-xs text-slate-500">ไม่มีไฟล์แนบเพิ่มเติม</p>
              </div>
            </div>
        </div>
      </div>

      <div
        v-if="leaveRequest"
        class="pointer-events-none"
        aria-hidden="true"
        style="position: fixed; left: -100000px; top: 0; z-index: -1;"
      >
        <div id="pdf-content" ref="pdfContentRef">
          <LeaveDocumentPreview :data="computedPreviewData" />
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
      <div v-if="openApproveConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeApproveConfirmModal">
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeApproveConfirmModal"></div>
        <div class="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden relative z-10">
          <div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 class="text-base font-bold text-slate-950">ยืนยันการอนุมัติ</h3>
            <button @click="closeApproveConfirmModal" class="text-slate-400 hover:text-slate-600 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-6 space-y-4">
            <p class="text-sm text-slate-700">
              ยืนยันอนุมัติใบคำร้องของ
              <span class="font-bold text-slate-900">{{ leaveRequest?.prefix }}{{ leaveRequest?.firstName }} {{ leaveRequest?.lastName }}</span>
              ใช่หรือไม่?
            </p>

            <div class="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                class="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
                @click="closeApproveConfirmModal"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all"
                :disabled="isActionLoading"
                @click="confirmApprove"
              >
                {{ isActionLoading ? 'กำลังบันทึก...' : 'ยืนยันอนุมัติ' }}
              </button>
            </div>
          </div>
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
      <div v-if="openReject" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeRejectModal">
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeRejectModal"></div>
        <div class="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden relative z-10">
          <div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 class="text-base font-bold text-slate-950">ไม่อนุมัติใบคำร้อง</h3>
            <button @click="closeRejectModal" class="text-slate-400 hover:text-slate-600 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitReject" class="p-6 space-y-4">
            <div>
              <label for="rejectReason" class="block text-xs font-semibold text-slate-700">
                ระบุเหตุผลการไม่อนุมัติ <span class="text-rose-500">*</span>
              </label>
              <textarea
                id="rejectReason"
                v-model="rejectReason"
                required
                rows="3"
                placeholder="ระบุเหตุผลเพื่อแจ้งกลับผู้ยื่นคำขอ"
                class="mt-1.5 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 resize-none"
              ></textarea>
            </div>

            <div class="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                class="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
                @click="closeRejectModal"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                :disabled="isActionLoading"
                class="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-all"
              >
                {{ isActionLoading ? 'กำลังบันทึก...' : 'ยืนยันไม่อนุมัติ' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import LeaveDocumentPreview from '~/components/leave/LeaveDocumentPreview.vue'

const route = useRoute()
const { addToast } = useToast()
const config = useRuntimeConfig()
const BASE = config.public.BASE_API

interface LeaveRequest {
  id: string
  prefix: string
  firstName: string
  lastName: string
  position: string
  email: string
  department: string
  type: 'sick' | 'personal' | 'vacation' | 'other'
  startDate: string
  endDate: string
  dateString: string
  totalDays: number
  location: string
  province: string
  district: string
  subDistrict: string
  zipcode: string
  reason: string
  attachmentUrl?: string
  status: 'pending' | 'approved' | 'rejected'
  actionTime?: string
  rejectReason?: string
}

interface ApiLeaveRequest {
  id: string
  member_id: string
  leave_type_id: string
  attachment_url?: string
  start_date: string
  end_date: string
  total_days: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  approved_at?: string
  reject_reason?: string
  updated_at: string
}

interface ApiMember {
  id: string
  prefix_id: string
  email: string
  firstname: string
  lastname: string
  role: string
  department: string
  province_id: string
  district_id: string
  sub_district_id: string
  zipcode_id: string
}

interface ApiCurrentUser {
  firstname?: string
  lastname?: string
}

interface PdfStats {
  taken?: number
  this_time?: number
  total?: number
}

interface LeaveRequestPdfApi {
  type: 'vacation' | 'sick' | 'personal' | 'maternity'
  written_at?: string
  date?: string
  to?: string
  name?: string
  position?: string
  department?: string
  accumulated_days?: number
  start_date?: string
  end_date?: string
  total_days?: number
  reason?: string
  last_leave_type?: string
  last_leave_start_date?: string
  last_leave_end_date?: string
  last_leave_total_days?: number
  location?: string
  province?: string
  district?: string
  sub_district?: string
  zipcode?: string
  contact_address?: string
  email?: string
  phone?: string
  substitute_name?: string
  teacher_signature_url?: string
  director_signature_url?: string
  stats?: {
    vacation?: PdfStats
    sick?: PdfStats
    personal?: PdfStats
    maternity?: PdfStats
  }
}

interface LeavePreviewData {
  type: 'vacation' | 'sick' | 'personal' | 'maternity'
  writtenAt?: string
  date?: string
  to?: string
  name?: string
  position?: string
  department?: string
  accumulatedDays?: number
  startDate?: string
  endDate?: string
  totalDays?: number
  reason?: string
  lastLeaveType?: string
  lastLeaveStartDate?: string
  lastLeaveEndDate?: string
  lastLeaveTotalDays?: number
  location?: string
  province?: string
  district?: string
  subDistrict?: string
  zipcode?: string
  contactAddress?: string
  email?: string
  phone?: string
  substituteName?: string
  teacherSignatureUrl?: string
  directorSignatureUrl?: string
  stats?: {
    vacation?: { taken?: number; thisTime?: number; total?: number }
    sick?: { taken?: number; thisTime?: number; total?: number }
    personal?: { taken?: number; thisTime?: number; total?: number }
    maternity?: { taken?: number; thisTime?: number; total?: number }
  }
}

definePageMeta({
  middleware: ['require-auth'],
})

const openApproveConfirm = ref(false)
const openReject = ref(false)
const rejectReason = ref('')
const isLoading = ref(false)
const isActionLoading = ref(false)
const currentUser = ref<ApiCurrentUser | null>(null)
const leaveRequest = ref<LeaveRequest | null>(null)
const previewPdfData = ref<LeavePreviewData | null>(null)
const pdfContentRef = ref<HTMLElement | null>(null)

const monthShortTH = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
const monthLongTH = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']

const computedPreviewData = computed(() => {
  return previewPdfData.value || {}
})

const headerDisplayName = computed(() => {
  const first = currentUser.value?.firstname?.trim() || ''
  const last = currentUser.value?.lastname?.trim() || ''
  const fullName = `${first} ${last}`.trim()
  return fullName ? `ผอ.${fullName}` : 'ผู้อำนวยการ'
})

const headerInitials = computed(() => {
  const first = currentUser.value?.firstname?.trim() || ''
  const last = currentUser.value?.lastname?.trim() || ''
  return `${first.charAt(0)}${last.charAt(0)}`.trim() || 'ผอ'
})

const formattedRequestNumber = computed(() => {
  const id = leaveRequest.value?.id || ''
  const compact = id.replace(/-/g, '').toUpperCase()
  if (!compact) return '-'
  if (compact.length < 8) return `LR-${compact}`
  return `LR-${compact.slice(0, 4)}-${compact.slice(4, 8)}`
})

const formatDateShort = (dateText: string) => {
  const d = new Date(dateText)
  if (Number.isNaN(d.getTime())) return dateText
  return `${d.getDate()} ${monthShortTH[d.getMonth()]} ${d.getFullYear() + 543}`
}

const formatDateLongThai = (dateText: string) => {
  const d = new Date(dateText)
  if (Number.isNaN(d.getTime())) return dateText
  return `${d.getDate()} ${monthLongTH[d.getMonth()]} ${d.getFullYear() + 543}`
}

const formatDateTimeShort = (dateText: string) => {
  const d = new Date(dateText)
  if (Number.isNaN(d.getTime())) return dateText
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${d.getDate()} ${monthShortTH[d.getMonth()]} ${d.getFullYear() + 543}, ${hh}:${mm} น.`
}

const toLeaveTypeKey = (leaveTypeName?: string): LeaveRequest['type'] => {
  const text = (leaveTypeName || '').toLowerCase()
  if (text.includes('ป่วย') || text.includes('sick')) return 'sick'
  if (text.includes('กิจ') || text.includes('personal')) return 'personal'
  if (text.includes('พักผ่อน') || text.includes('vacation')) return 'vacation'
  return 'other'
}

const resolveNameById = async (path: string, id?: string) => {
  if (!id) return '-'
  try {
    const res = await $fetch<any>(`${BASE}${path}/${id}`)
    return res?.data?.name || '-'
  } catch {
    return '-'
  }
}

const fetchCurrentUser = async () => {
  if (!import.meta.client) return
  const token = localStorage.getItem('smartleave:access_token')
  if (!token) return

  const meRes = await $fetch<any>(`${BASE}/member/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  currentUser.value = (meRes?.data ?? null) as ApiCurrentUser | null
}

const loadLeaveRequest = async () => {
  const id = String(route.params.id || '')
  if (!id) {
    leaveRequest.value = null
    previewPdfData.value = null
    return
  }

  const [leaveRes, pdfRes] = await Promise.all([
    $fetch<any>(`${BASE}/leave-request/${id}`),
    $fetch<any>(`${BASE}/leave-request/${id}/pdf-data`),
  ])

  const lr = (leaveRes?.data ?? null) as ApiLeaveRequest | null
  const pdf = (pdfRes?.data ?? null) as LeaveRequestPdfApi | null
  if (!lr) {
    leaveRequest.value = null
    previewPdfData.value = null
    return
  }

  if (pdf) {
    previewPdfData.value = {
      type: pdf.type,
      writtenAt: pdf.written_at,
      date: pdf.date,
      to: pdf.to,
      name: pdf.name,
      position: pdf.position,
      department: pdf.department,
      accumulatedDays: pdf.accumulated_days,
      startDate: pdf.start_date,
      endDate: pdf.end_date,
      totalDays: pdf.total_days,
      reason: pdf.reason,
      lastLeaveType: pdf.last_leave_type,
      lastLeaveStartDate: pdf.last_leave_start_date,
      lastLeaveEndDate: pdf.last_leave_end_date,
      lastLeaveTotalDays: pdf.last_leave_total_days,
      location: pdf.location,
      province: pdf.province,
      district: pdf.district,
      subDistrict: pdf.sub_district,
      zipcode: pdf.zipcode,
      contactAddress: pdf.contact_address,
      email: pdf.email,
      phone: pdf.phone,
      substituteName: pdf.substitute_name,
      teacherSignatureUrl: pdf.teacher_signature_url,
      directorSignatureUrl: pdf.director_signature_url,
      stats: {
        vacation: {
          taken: pdf.stats?.vacation?.taken,
          thisTime: pdf.stats?.vacation?.this_time,
          total: pdf.stats?.vacation?.total,
        },
        sick: {
          taken: pdf.stats?.sick?.taken,
          thisTime: pdf.stats?.sick?.this_time,
          total: pdf.stats?.sick?.total,
        },
        personal: {
          taken: pdf.stats?.personal?.taken,
          thisTime: pdf.stats?.personal?.this_time,
          total: pdf.stats?.personal?.total,
        },
        maternity: {
          taken: pdf.stats?.maternity?.taken,
          thisTime: pdf.stats?.maternity?.this_time,
          total: pdf.stats?.maternity?.total,
        },
      },
    }
  } else {
    previewPdfData.value = null
    return
  }

  const memberRes = await $fetch<any>(`${BASE}/member/${lr.member_id}`)
  const member = (memberRes?.data ?? null) as ApiMember | null
  if (!member) {
    leaveRequest.value = null
    previewPdfData.value = null
    return
  }

  const [prefixName, leaveTypeName, provinceName, districtName, subDistrictName, zipcodeName] = await Promise.all([
    resolveNameById('/system/prefix', member.prefix_id),
    resolveNameById('/system/leave-type', lr.leave_type_id),
    resolveNameById('/system/province', member.province_id),
    resolveNameById('/system/district', member.district_id),
    resolveNameById('/system/sub-district', member.sub_district_id),
    resolveNameById('/system/zipcode', member.zipcode_id),
  ])

  const type = toLeaveTypeKey(leaveTypeName)
  const dateString = lr.start_date === lr.end_date
    ? formatDateShort(lr.start_date)
    : `${formatDateShort(lr.start_date)} - ${formatDateShort(lr.end_date)}`

  leaveRequest.value = {
    id: lr.id,
    prefix: prefixName,
    firstName: member.firstname,
    lastName: member.lastname,
    position: member.role === 'director' ? 'ผู้อำนวยการ' : 'ครู',
    email: member.email,
    department: member.department || '-',
    type,
    startDate: formatDateLongThai(lr.start_date),
    endDate: formatDateLongThai(lr.end_date),
    dateString,
    totalDays: lr.total_days,
    location: pdf?.location || lr.contact_address || '-',
    province: pdf?.province || provinceName,
    district: pdf?.district || districtName,
    subDistrict: pdf?.sub_district || subDistrictName,
    zipcode: pdf?.zipcode || zipcodeName,
    reason: lr.reason,
    attachmentUrl: lr.attachment_url || '',
    status: lr.status,
    actionTime: formatDateTimeShort(lr.updated_at),
    rejectReason: lr.reject_reason,
  }
}

const loadPageData = async () => {
  isLoading.value = true
  try {
    await Promise.all([fetchCurrentUser(), loadLeaveRequest()])
  } catch {
    leaveRequest.value = null
    previewPdfData.value = null
    addToast('error', 'โหลดข้อมูลไม่สำเร็จ', 'ไม่สามารถดึงรายละเอียดใบคำร้องได้ กรุณาลองใหม่อีกครั้ง')
  } finally {
    isLoading.value = false
  }
}

const isPdfFile = (fileName?: string) => {
  if (!fileName) return false
  return fileName.toLowerCase().endsWith('.pdf')
}

const getLeaveTypeText = (type: string) => {
  if (type === 'sick') return 'ลาป่วย'
  if (type === 'personal') return 'ลากิจ'
  if (type === 'vacation') return 'ลาพักผ่อน'
  return 'ประเภทอื่นๆ'
}

const getLeaveTypeClass = (type: string) => {
  if (type === 'sick') return 'text-emerald-700 bg-emerald-50'
  if (type === 'personal') return 'text-amber-700 bg-amber-50'
  if (type === 'vacation') return 'text-blue-700 bg-blue-50'
  return 'text-slate-700 bg-slate-100'
}

const normalizeUnsupportedPdfColors = (root: HTMLElement) => {
  const allElements = [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))]

  const hasUnsupportedColor = (value: string) => value.includes('oklch(')

  for (const el of allElements) {
    const computedStyle = getComputedStyle(el)
    const isRoot = el === root

    if (hasUnsupportedColor(computedStyle.color)) {
      el.style.color = '#000000'
    }

    if (hasUnsupportedColor(computedStyle.backgroundColor)) {
      el.style.backgroundColor = isRoot ? '#ffffff' : 'transparent'
    }

    if (
      hasUnsupportedColor(computedStyle.borderTopColor) ||
      hasUnsupportedColor(computedStyle.borderRightColor) ||
      hasUnsupportedColor(computedStyle.borderBottomColor) ||
      hasUnsupportedColor(computedStyle.borderLeftColor)
    ) {
      el.style.borderColor = '#000000'
    }

    if (hasUnsupportedColor(computedStyle.outlineColor)) {
      el.style.outlineColor = '#000000'
    }

    if (hasUnsupportedColor(computedStyle.textDecorationColor)) {
      el.style.textDecorationColor = '#000000'
    }

    if (hasUnsupportedColor(computedStyle.boxShadow)) {
      el.style.boxShadow = 'none'
    }
  }
}

const getStatusText = (status: string) => {
  if (status === 'approved') return 'อนุมัติเรียบร้อย'
  if (status === 'rejected') return 'ปฏิเสธใบคำร้อง'
  return 'รอการพิจารณา'
}

const getStatusClass = (status: string) => {
  if (status === 'approved') return 'bg-emerald-50 text-emerald-700'
  if (status === 'rejected') return 'bg-rose-50 text-rose-700'
  return 'bg-amber-50 text-amber-700'
}

const downloadDoc = async () => {
  if (!leaveRequest.value || leaveRequest.value.status !== 'approved') {
    addToast('warning', 'ยังดาวน์โหลดไม่ได้', 'ดาวน์โหลดเอกสารได้เมื่อสถานะอนุมัติแล้วเท่านั้น')
    return
  }

  addToast('info', 'เริ่มดาวน์โหลดไฟล์', `กำลังสร้างไฟล์ PDF กรุณารอสักครู่...`)
  if (import.meta.client) {
    let sandbox: HTMLDivElement | null = null
    try {
      await nextTick()
      const html2pdfModule = await import('html2pdf.js')
      const html2pdf = (html2pdfModule.default ?? html2pdfModule) as any
      const source = pdfContentRef.value
      if (!source) {
        addToast('error', 'ไม่พบเอกสารสำหรับดาวน์โหลด', 'กรุณาลองใหม่อีกครั้ง')
        return
      }

      sandbox = document.createElement('div')
      sandbox.style.position = 'fixed'
      sandbox.style.left = '0'
      sandbox.style.top = '0'
      sandbox.style.zIndex = '-1'
      sandbox.style.pointerEvents = 'none'
      sandbox.style.background = 'white'

      const cloned = source.cloneNode(true) as HTMLElement
      sandbox.appendChild(cloned)
      document.body.appendChild(sandbox)
      normalizeUnsupportedPdfColors(cloned)

      const opt = {
        margin: 0,
        filename: `ใบลา_${leaveRequest.value?.firstName}_${leaveRequest.value?.startDate}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }

      await html2pdf().set(opt).from(cloned).save()
    } catch (error) {
      console.error('PDF download failed (director):', error)
      addToast('error', 'ดาวน์โหลดไม่สำเร็จ', 'ระบบไม่สามารถสร้างไฟล์ PDF ได้ กรุณาลองใหม่อีกครั้ง')
    } finally {
      sandbox?.remove()
    }
  }
}

const approveRequest = async () => {
  if (!leaveRequest.value || leaveRequest.value.status !== 'pending') return
  isActionLoading.value = true
  try {
    const token = import.meta.client ? localStorage.getItem('smartleave:access_token') : ''
    await $fetch(`${BASE}/leave-request/${leaveRequest.value.id}`, {
      method: 'PATCH',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: { status: 'approved' },
    })
    await loadLeaveRequest()
    addToast('success', 'อนุมัติสำเร็จ', 'อนุมัติใบคำร้องเรียบร้อยแล้ว')
  } catch {
    addToast('error', 'อนุมัติไม่สำเร็จ', 'ไม่สามารถบันทึกการอนุมัติได้ กรุณาลองใหม่')
  } finally {
    isActionLoading.value = false
  }
}

const openApproveConfirmModal = () => {
  if (!leaveRequest.value || leaveRequest.value.status !== 'pending') return
  openApproveConfirm.value = true
}

const closeApproveConfirmModal = () => {
  openApproveConfirm.value = false
}

const confirmApprove = async () => {
  await approveRequest()
  closeApproveConfirmModal()
}

const openRejectModal = () => {
  if (!leaveRequest.value || leaveRequest.value.status !== 'pending') return
  rejectReason.value = ''
  openReject.value = true
}

const closeRejectModal = () => {
  openReject.value = false
  rejectReason.value = ''
}

const submitReject = async () => {
  if (!leaveRequest.value || leaveRequest.value.status !== 'pending') return
  if (!rejectReason.value.trim()) {
    addToast('warning', 'ยังไม่กรอกเหตุผล', 'กรุณาระบุเหตุผลก่อนยืนยันไม่อนุมัติ')
    return
  }

  isActionLoading.value = true
  try {
    const token = import.meta.client ? localStorage.getItem('smartleave:access_token') : ''
    await $fetch(`${BASE}/leave-request/${leaveRequest.value.id}`, {
      method: 'PATCH',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: {
        status: 'rejected',
        reject_reason: rejectReason.value.trim(),
      },
    })
    await loadLeaveRequest()
    closeRejectModal()
    addToast('info', 'ไม่อนุมัติเรียบร้อย', 'ระบบบันทึกเหตุผลและแจ้งกลับผู้ยื่นคำขอแล้ว')
  } catch {
    addToast('error', 'ไม่อนุมัติไม่สำเร็จ', 'ไม่สามารถบันทึกเหตุผลการไม่อนุมัติได้ กรุณาลองใหม่')
  } finally {
    isActionLoading.value = false
  }
}

onMounted(() => {
  loadPageData()
})
</script>