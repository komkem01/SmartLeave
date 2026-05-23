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
            <p class="text-sm font-bold text-slate-800">{{ profile.fullName }}</p>
            <p class="text-3xs text-slate-500">{{ profile.department }}</p>
          </div>
          <div class="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-slate-700">
            {{ profileInitials }}
          </div>
          <AppLogoutButton />
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 mb-4">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">ยื่นใบคำขอลางาน</h1>
        <p class="mt-2 text-sm text-slate-500">กรอกข้อมูลให้ครบถ้วนเพื่อส่งเรื่องพิจารณา</p>
      </div>

      <div class="bg-white border border-slate-200/70 rounded-2xl shadow-sm p-6 sm:p-8 space-y-8">
        <section>
          <h2 class="text-sm font-bold text-slate-900 mb-3">1) ข้อมูลส่วนตัว</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
              <p class="text-2xs text-slate-500">ชื่อ - นามสกุล</p>
              <p class="text-sm font-semibold text-slate-800">{{ profile.fullName }}</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
              <p class="text-2xs text-slate-500">ตำแหน่ง</p>
              <p class="text-sm font-semibold text-slate-800">{{ profile.position }}</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
              <p class="text-2xs text-slate-500">กลุ่มสาระ / หน่วยงาน</p>
              <p class="text-sm font-semibold text-slate-800">{{ profile.department }}</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
              <p class="text-2xs text-slate-500">อีเมล</p>
              <p class="text-sm font-semibold text-slate-800">{{ profile.email }}</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 sm:col-span-2">
              <p class="text-2xs text-slate-500">เบอร์โทรศัพท์</p>
              <p class="text-sm font-semibold text-slate-800">{{ profile.phone }}</p>
            </div>
          </div>
        </section>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <section>
            <h2 class="text-sm font-bold text-slate-900 mb-3">2) เขียนที่</h2>
            <div class="max-w-xxl">
              <input
                v-model="form.writtenAt"
                type="text"
                required
                placeholder="เช่น โรงเรียนสะอาดประชาสรรพ์"
                class="block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </section>

          <section>
            <h2 class="text-sm font-bold text-slate-900 mb-3">3) ประเภทการลา</h2>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 items-stretch">
              <div class="lg:col-span-2">
                <AppDropdown
                  id="leaveType"
                  v-model="form.type"
                  placeholder="เลือกประเภทการลา"
                  :options="leaveTypes.map((leaveType) => ({ label: leaveType.name, value: leaveType.id }))"
                />
              </div>

              <div class="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 flex flex-col justify-center">
                <p class="text-2xs font-semibold text-blue-700">โควต้าคงเหลือ</p>
                <p class="text-sm font-bold text-blue-900 mt-0.5">
                  {{ form.type ? selectedTypeRemainingRequests : '-' }} วัน
                </p>
                <p class="text-2xs text-blue-700/80 mt-1">
                  {{
                    form.type
                      ? 'อ้างอิงจากการตั้งค่าประเภทลา'
                      : 'กรุณาเลือกประเภทการลา'
                  }}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-sm font-bold text-slate-900 mb-3">4) วันที่ลา</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="relative">
                <label class="block text-xs text-slate-700 mb-1">วันที่เริ่มลา</label>
                <button
                  type="button"
                  @click="toggleStartCalendar"
                  class="block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-left text-slate-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <span :class="form.startDate ? 'font-bold text-slate-900' : 'text-slate-500'">
                    {{ form.startDate ? formatThaiDate(form.startDate) : 'เลือกวันที่เริ่มลา' }}
                  </span>
                </button>
                <div
                  v-if="showStartCalendar"
                  class="absolute left-0 top-full z-30 mt-2 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
                >
                  <calendar-date class="w-full" locale="th-TH" :value="form.startDate" @change="onStartDateChange">
                    <svg aria-label="Previous" class="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
                    <svg aria-label="Next" class="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
                    <calendar-month></calendar-month>
                  </calendar-date>
                </div>
              </div>
              <div class="relative">
                <label class="block text-xs text-slate-700 mb-1">วันที่สิ้นสุดลา</label>
                <button
                  type="button"
                  @click="toggleEndCalendar"
                  class="block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-left text-slate-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <span :class="form.endDate ? 'font-bold text-slate-900' : 'text-slate-500'">
                    {{ form.endDate ? formatThaiDate(form.endDate) : 'เลือกวันที่สิ้นสุดลา' }}
                  </span>
                </button>
                <div
                  v-if="showEndCalendar"
                  class="absolute left-0 top-full z-30 mt-2 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
                >
                  <calendar-date class="w-full" locale="th-TH" :value="form.endDate" @change="onEndDateChange">
                    <svg aria-label="Previous" class="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
                    <svg aria-label="Next" class="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
                    <calendar-month></calendar-month>
                  </calendar-date>
                </div>
              </div>
            </div>
            <p v-if="errors.dateRange" class="mt-2 text-xs text-rose-500 font-medium">{{ errors.dateRange }}</p>
          </section>

          <section>
            <h2 class="text-sm font-bold text-slate-900 mb-3">5) สถานที่</h2>
            <div class="space-y-3">
              <div class="max-w-xxl">
                <input
                  v-model="form.location"
                  type="text"
                  required
                  placeholder="เช่น โรงพยาบาลชลบุรี, บ้านเลขที่/หมู่บ้าน/ถนน"
                  class="block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <AppDropdown
                  id="province"
                  v-model="form.province"
                  placeholder="เลือกจังหวัด"
                  :page-size="20"
                  :allow-page-size-select="true"
                  :page-size-options="[10, 20, 30, 50]"
                  :options="provinces.map((province) => ({ label: province.name, value: province.id }))"
                />

                <AppDropdown
                  id="district"
                  v-model="form.district"
                  placeholder="เลือกอำเภอ/เขต"
                  :disabled="!form.province || districts.length === 0"
                  :options="districts.map((district) => ({ label: district.name, value: district.id }))"
                />

                <AppDropdown
                  id="subDistrict"
                  v-model="form.subDistrict"
                  placeholder="เลือกตำบล/แขวง"
                  :disabled="!form.district || subDistricts.length === 0"
                  :options="subDistricts.map((subDistrict) => ({ label: subDistrict.name, value: subDistrict.id }))"
                />
                <div class="w-full">
                <input
                  :value="form.zipcodeName"
                  type="text"
                  readonly
                  placeholder="รหัสไปรษณีย์"
                  class="block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 focus:outline-none"
                />
              </div>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-sm font-bold text-slate-900 mb-3">6) เหตุผล</h2>
            <textarea
              v-model="form.reason"
              required
              rows="4"
              placeholder="ระบุเหตุผลการลาให้ชัดเจน"
              class="block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
            ></textarea>
          </section>

          <section>
            <h2 class="text-sm font-bold text-slate-900 mb-3">7) เอกสาร/ไฟล์แนบ (ไม่บังคับ)</h2>
            <div
              class="flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-2xl hover:border-blue-400 transition-colors duration-200 cursor-pointer"
              :class="{ 'border-rose-300 bg-rose-50/20': errors.attachment }"
              @click="triggerFileInput"
            >
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h20a4 4 0 004-4V20m-6-12l6 6m-6-6v6h6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-slate-600 justify-center">
                  <span class="font-semibold text-blue-600">อัปโหลดไฟล์</span>
                  <p class="pl-1">หรือคลิกเลือกจากเครื่อง</p>
                </div>
                <p class="text-xs text-slate-400">PNG, JPG, PDF ขนาดไม่เกิน 5MB</p>
                <p v-if="isUploadingAttachment" class="text-xs text-blue-600 font-semibold mt-2">กำลังอัปโหลดไฟล์...</p>
                <p v-if="fileName" class="text-xs text-emerald-600 font-bold mt-2">✓ {{ fileName }}</p>
                <a
                  v-if="uploadedPresignedURL"
                  :href="uploadedPresignedURL"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-block text-xs text-blue-700 font-semibold underline mt-1"
                >
                  ดูไฟล์ที่อัปโหลด
                </a>
              </div>
              <input
                ref="fileInput"
                type="file"
                class="sr-only"
                accept="image/*,.pdf"
                @change="handleFileUpload"
              />
            </div>
            <p v-if="errors.attachment" class="mt-1.5 text-xs text-rose-500 font-medium">{{ errors.attachment }}</p>
          </section>

          <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              class="w-full sm:w-1/3 py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
              @click="goBack"
            >
              ย้อนกลับ
            </button>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full sm:w-2/3 flex justify-center py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading" class="mr-2 flex items-center">
                <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </span>
              {{ isLoading ? 'กำลังบันทึกคำขอ...' : 'ส่งใบคำร้องขอลา' }}
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

useHead({
  script: [
    {
      type: 'module',
      src: 'https://unpkg.com/cally'
    }
  ]
})

const router = useRouter()
const config = useRuntimeConfig()
const BASE = config.public.BASE_API as string
const { addToast } = useToast()

const isLoading = ref(false)
const isUploadingAttachment = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const fileName = ref('')
const showStartCalendar = ref(false)
const showEndCalendar = ref(false)
const authToken = ref('')
const uploadedRefID = ref('')
const uploadedPresignedURL = ref('')
const STORAGE_UPLOAD_URL = 'https://storages-production.up.railway.app/api/v1/storages/upload'
const STORAGE_BASE_URL = 'https://storages-production.up.railway.app/api/v1/storages'

interface Item {
  id: string
  name: string
  is_active?: boolean
}

interface ApiCurrentUser {
  id: string
  firstname?: string
  lastname?: string
  role?: string
  department?: string
  email?: string
  phone?: string
}

interface ApiLeaveType {
  id: string
  name: string
  max_days: number
  is_active?: boolean
}

interface ApiLeaveRequest {
  id: string
  member_id: string
  leave_type_id: string
  total_days: number
  status: 'pending' | 'approved' | 'rejected'
}

const currentUser = ref<ApiCurrentUser | null>(null)
const leaveTypes = ref<ApiLeaveType[]>([])
const provinces = ref<Item[]>([])
const districts = ref<Item[]>([])
const subDistricts = ref<Item[]>([])
const zipcodes = ref<Item[]>([])
const myLeaveRequests = ref<ApiLeaveRequest[]>([])

const profile = ref({
  fullName: '-',
  position: 'ครู',
  department: '-',
  email: '-',
  phone: '-'
})

const profileInitials = computed(() => {
  const text = (profile.value.fullName || '').trim()
  if (!text || text === '-') return 'คร'
  const parts = text.split(/\s+/).filter(Boolean)
  if (parts.length === 1) {
    return parts[0]?.slice(0, 2) || 'คร'
  }
  const first = parts[0]?.charAt(0) || ''
  const second = parts[1]?.charAt(0) || ''
  return `${first}${second}` || 'คร'
})

const getTodayLocalDate = () => {
  const now = new Date()
  const yyyy = String(now.getFullYear())
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

const defaultLeaveDate = getTodayLocalDate()
const form = ref({
  type: '',
  writtenAt: '',
  startDate: defaultLeaveDate,
  endDate: defaultLeaveDate,
  location: '',
  province: '',
  district: '',
  subDistrict: '',
  zipcode: '',
  zipcodeName: '',
  reason: '',
  attachment: null as File | null
})

const usedDaysByLeaveType = computed<Record<string, number>>(() => {
  const usage: Record<string, number> = {}
  for (const item of myLeaveRequests.value) {
    if (item.status === 'rejected') continue
    usage[item.leave_type_id] = (usage[item.leave_type_id] || 0) + Number(item.total_days || 0)
  }
  return usage
})

const selectedTypeRemainingRequests = computed(() => {
  if (!form.value.type) return 0
  const selectedType = leaveTypes.value.find((item) => item.id === form.value.type)
  if (!selectedType) return 0
  const maxDays = Number(selectedType.max_days || 0)
  const usedDays = usedDaysByLeaveType.value[selectedType.id] || 0
  return Number(Math.max(0, maxDays - usedDays).toFixed(1))
})

const errors = ref({
  dateRange: '',
  attachment: ''
})

const validateDateRange = () => {
  errors.value.dateRange = ''

  if (!form.value.startDate || !form.value.endDate) return

  const start = new Date(`${form.value.startDate}T00:00:00`)
  const end = new Date(`${form.value.endDate}T00:00:00`)

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    errors.value.dateRange = 'รูปแบบวันที่ไม่ถูกต้อง'
    return
  }

  if (start > end) {
    errors.value.dateRange = 'วันที่สิ้นสุดลาต้องมากกว่าหรือเท่ากับวันที่เริ่มลา'
  }
}

const thaiMonths = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม'
]

const formatThaiDate = (dateString: string) => {
  if (!dateString) return ''

  const [year, month, day] = dateString.split('-').map(Number)
  if (!year || !month || !day) return dateString

  return `${day} ${thaiMonths[month - 1]} ${year + 543}`
}

const toggleStartCalendar = () => {
  showStartCalendar.value = !showStartCalendar.value
  if (showStartCalendar.value) showEndCalendar.value = false
}

const toggleEndCalendar = () => {
  showEndCalendar.value = !showEndCalendar.value
  if (showEndCalendar.value) showStartCalendar.value = false
}

const onStartDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  form.value.startDate = target.value
  showStartCalendar.value = false
  validateDateRange()
}

const onEndDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  form.value.endDate = target.value
  showEndCalendar.value = false
  validateDateRange()
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const getAuthHeaders = () => {
  if (!authToken.value) return undefined
  return { Authorization: `Bearer ${authToken.value}` }
}

const fetchPresignedURL = async (id: string) => {
  const res = await $fetch<any>(`${STORAGE_BASE_URL}/${id}/presign`)
  return (res?.data?.presigned_url || '') as string
}

const fetchDistricts = async (provinceID: string) => {
  if (!provinceID) {
    districts.value = []
    return
  }

  try {
    const res = await $fetch<any>(`${BASE}/system/district?province_id=${provinceID}`, {
      headers: getAuthHeaders(),
    })
    districts.value = (res?.data ?? []).filter((item: Item) => item.is_active !== false)
  } catch {
    districts.value = []
  }
}

const fetchSubDistricts = async (districtID: string) => {
  if (!districtID) {
    subDistricts.value = []
    return
  }

  try {
    const res = await $fetch<any>(`${BASE}/system/sub-district?district_id=${districtID}`, {
      headers: getAuthHeaders(),
    })
    subDistricts.value = (res?.data ?? []).filter((item: Item) => item.is_active !== false)
  } catch {
    subDistricts.value = []
  }
}

const fetchZipcodes = async (subDistrictID: string) => {
  if (!subDistrictID) {
    zipcodes.value = []
    return
  }

  try {
    const res = await $fetch<any>(`${BASE}/system/zipcode?sub_district_id=${subDistrictID}`, {
      headers: getAuthHeaders(),
    })
    zipcodes.value = (res?.data ?? []).filter((item: Item) => item.is_active !== false)

    if (zipcodes.value.length > 0) {
      const first = zipcodes.value[0]
      if (first) {
        form.value.zipcode = first.id
        form.value.zipcodeName = first.name
      }
    }
  } catch {
    zipcodes.value = []
  }
}

const onProvinceChange = async () => {
  form.value.district = ''
  form.value.subDistrict = ''
  form.value.zipcode = ''
  form.value.zipcodeName = ''
  districts.value = []
  subDistricts.value = []
  zipcodes.value = []
  await fetchDistricts(form.value.province)
}

const onDistrictChange = async () => {
  form.value.subDistrict = ''
  form.value.zipcode = ''
  form.value.zipcodeName = ''
  subDistricts.value = []
  zipcodes.value = []
  await fetchSubDistricts(form.value.district)
}

const onSubDistrictChange = async () => {
  form.value.zipcode = ''
  form.value.zipcodeName = ''
  zipcodes.value = []
  await fetchZipcodes(form.value.subDistrict)
}

watch(() => form.value.province, async (provinceID, prevProvinceID) => {
  if (provinceID === prevProvinceID) return
  await onProvinceChange()
})

watch(() => form.value.district, async (districtID, prevDistrictID) => {
  if (districtID === prevDistrictID) return
  await onDistrictChange()
})

watch(() => form.value.subDistrict, async (subDistrictID, prevSubDistrictID) => {
  if (subDistrictID === prevSubDistrictID) return
  await onSubDistrictChange()
})

const handleFileUpload = async (event: Event) => {
  errors.value.attachment = ''
  const target = event.target as HTMLInputElement

  if (!target.files || target.files.length === 0) return

  const file = target.files[0]
  if (!file) return

  if (file.size > 5 * 1024 * 1024) {
    errors.value.attachment = 'ขนาดไฟล์ต้องไม่เกิน 5MB'
    return
  }

  form.value.attachment = file
  fileName.value = file.name
  uploadedRefID.value = ''
  uploadedPresignedURL.value = ''

  const formData = new FormData()
  formData.append('file', file)

  isUploadingAttachment.value = true
  try {
    const res = await $fetch<any>(STORAGE_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })

    const refID = res?.data?.id || ''
    if (!refID) {
      throw new Error('upload-id-not-found')
    }
    uploadedRefID.value = refID
    uploadedPresignedURL.value = await fetchPresignedURL(refID)
  } catch {
    form.value.attachment = null
    fileName.value = ''
    uploadedRefID.value = ''
    uploadedPresignedURL.value = ''
    errors.value.attachment = 'อัปโหลดไฟล์ไม่สำเร็จ กรุณาลองใหม่'
    addToast('error', 'อัปโหลดไฟล์ไม่สำเร็จ', 'ไม่สามารถอัปโหลดไฟล์แนบได้ กรุณาลองใหม่')
  } finally {
    isUploadingAttachment.value = false
  }
}

const handleSubmit = async () => {
  if (!form.value.type) {
    addToast('warning', 'ข้อมูลไม่ครบ', 'กรุณาเลือกประเภทการลา')
    return
  }

  if (!form.value.writtenAt.trim()) {
    addToast('warning', 'ข้อมูลไม่ครบ', 'กรุณาระบุเขียนที่')
    return
  }

  if (!form.value.startDate || !form.value.endDate) {
    addToast('warning', 'ข้อมูลไม่ครบ', 'กรุณาเลือกวันที่เริ่มลาและวันที่สิ้นสุดลา')
    return
  }

  validateDateRange()
  if (errors.value.dateRange) {
    addToast('warning', 'วันที่ลาไม่ถูกต้อง', errors.value.dateRange)
    return
  }

  if (!form.value.location || !form.value.province || !form.value.district || !form.value.subDistrict || !form.value.zipcode) {
    addToast('warning', 'ข้อมูลไม่ครบ', 'กรุณากรอกสถานที่และเลือก จังหวัด/อำเภอ/ตำบล ให้ครบถ้วน')
    return
  }

  if (isUploadingAttachment.value) {
    addToast('warning', 'กำลังอัปโหลดไฟล์', 'กรุณารอให้อัปโหลดไฟล์เสร็จก่อนส่งคำร้อง')
    return
  }

  const memberID = currentUser.value?.id || ''
  if (!memberID) {
    addToast('error', 'ไม่พบข้อมูลผู้ใช้', 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง')
    return
  }

  const start = new Date(`${form.value.startDate}T00:00:00`)
  const end = new Date(`${form.value.endDate}T00:00:00`)
  const diffDays = Math.floor((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000))
  const totalDays = Math.max(1, diffDays + 1)

  isLoading.value = true
  try {
    await $fetch(`${BASE}/leave-request`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: {
        member_id: memberID,
        leave_type_id: form.value.type,
        written_at: form.value.writtenAt,
        contact_address: form.value.location,
        province_id: form.value.province,
        district_id: form.value.district,
        sub_district_id: form.value.subDistrict,
        zipcode_id: form.value.zipcode,
        start_date: form.value.startDate,
        end_date: form.value.endDate,
        total_days: totalDays,
        reason: form.value.reason,
        ...(uploadedRefID.value ? { ref_id: uploadedRefID.value } : {}),
      },
    })

    addToast('success', 'ยื่นคำขอสำเร็จ', 'ระบบบันทึกใบคำขอลาและส่งต่อให้ผู้อำนวยการแล้ว')
    router.push('/teacher/dashboard')
  }
  catch {
    addToast('error', 'ส่งคำขอไม่สำเร็จ', 'ไม่สามารถบันทึกใบคำขอได้ในขณะนี้ กรุณาลองใหม่')
  }
  finally {
    isLoading.value = false
  }
}

const fetchPageData = async () => {
  isLoading.value = true
  try {
    const token = import.meta.client ? localStorage.getItem('smartleave:access_token') : null
    if (!token) {
      addToast('warning', 'ไม่พบโทเค็นเข้าสู่ระบบ', 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง')
      router.push('/login')
      return
    }
    authToken.value = token

    const meRes = await $fetch<any>(`${BASE}/member/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const me = (meRes?.data ?? null) as ApiCurrentUser | null
    if (!me) {
      addToast('error', 'โหลดข้อมูลไม่สำเร็จ', 'ไม่พบข้อมูลผู้ใช้งาน')
      return
    }

    currentUser.value = me
    profile.value = {
      fullName: `${me.firstname || ''} ${me.lastname || ''}`.trim() || '-',
      position: me.role === 'director' ? 'ผู้อำนวยการ' : 'ครู',
      department: me.department || '-',
      email: me.email || '-',
      phone: me.phone || '-',
    }

    const [leaveTypeRes, provinceRes, leaveReqRes] = await Promise.all([
      $fetch<any>(`${BASE}/system/leave-type`, { headers: getAuthHeaders() }),
      $fetch<any>(`${BASE}/system/province`, { headers: getAuthHeaders() }),
      $fetch<any>(`${BASE}/leave-request`, { headers: getAuthHeaders() }),
    ])

    leaveTypes.value = (leaveTypeRes?.data ?? []).filter((item: ApiLeaveType) => item.is_active !== false)
    provinces.value = (provinceRes?.data ?? []).filter((item: Item) => item.is_active !== false)

    const allLeaveRequests = (leaveReqRes?.data ?? []) as ApiLeaveRequest[]
    myLeaveRequests.value = allLeaveRequests.filter((item) => item.member_id === me.id)
  } catch {
    addToast('error', 'โหลดข้อมูลไม่สำเร็จ', 'ไม่สามารถโหลดข้อมูลแบบฟอร์มขอลาได้ กรุณาลองใหม่')
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.push('/teacher/dashboard')
}

onMounted(() => {
  fetchPageData()
})
</script>