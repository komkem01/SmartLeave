<template>
  <div class="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-10 font-sans antialiased">
    <div class="w-full max-w-7xl mx-auto">
      <div class="mb-4 flex justify-end">
        <AppLogoutButton />
      </div>

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
          </div>
        </section>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <section>
            <h2 class="text-sm font-bold text-slate-900 mb-3">2) ประเภทการลา</h2>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 items-stretch">
              <div class="lg:col-span-2">
                <select
                  v-model="form.type"
                  required
                  class="block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="" disabled>เลือกประเภทการลา</option>
                  <option value="sick">ลาป่วย (Sick Leave)</option>
                  <option value="personal">ลากิจ (Personal Leave)</option>
                  <option value="vacation">ลาพักผ่อน (Vacation Leave)</option>
                </select>
              </div>

              <div class="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 flex flex-col justify-center">
                <p class="text-2xs font-semibold text-blue-700">โควต้าคงเหลือ</p>
                <p class="text-sm font-bold text-blue-900 mt-0.5">
                  {{ form.type ? selectedTypeRemainingRequests : '-' }} ครั้ง
                </p>
                <p class="text-2xs text-blue-700/80 mt-1">
                  {{
                    form.type
                      ? 'ในปีการศึกษานี้'
                      : 'กรุณาเลือกประเภทการลา'
                  }}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-sm font-bold text-slate-900 mb-3">3) วันที่ลา</h2>
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
                  <calendar-date class="w-full" :value="form.startDate" @change="onStartDateChange">
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
                  <calendar-date class="w-full" :value="form.endDate" @change="onEndDateChange">
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
            <h2 class="text-sm font-bold text-slate-900 mb-3">4) สถานที่</h2>
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
                <select
                  v-model="form.province"
                  required
                  class="block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  @change="onProvinceChange"
                >
                  <option value="" disabled>เลือกจังหวัด</option>
                  <option v-for="province in mockProvinces" :key="province.name" :value="province.name">
                    {{ province.name }}
                  </option>
                </select>

                <select
                  v-model="form.district"
                  required
                  :disabled="!form.province"
                  class="block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  @change="onDistrictChange"
                >
                  <option value="" disabled>เลือกอำเภอ/เขต</option>
                  <option v-for="district in availableDistricts" :key="district.name" :value="district.name">
                    {{ district.name }}
                  </option>
                </select>

                <select
                  v-model="form.subDistrict"
                  required
                  :disabled="!form.district"
                  class="block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  @change="onSubDistrictChange"
                >
                  <option value="" disabled>เลือกตำบล/แขวง</option>
                  <option v-for="subDistrict in availableSubDistricts" :key="subDistrict.name" :value="subDistrict.name">
                    {{ subDistrict.name }}
                  </option>
                </select>
                <div class="w-full">
                <input
                  v-model="form.zipcode"
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
            <h2 class="text-sm font-bold text-slate-900 mb-3">5) เหตุผล</h2>
            <textarea
              v-model="form.reason"
              required
              rows="4"
              placeholder="ระบุเหตุผลการลาให้ชัดเจน"
              class="block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
            ></textarea>
          </section>

          <section>
            <h2 class="text-sm font-bold text-slate-900 mb-3">6) เอกสาร/ไฟล์แนบ</h2>
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
                <p v-if="fileName" class="text-xs text-emerald-600 font-bold mt-2">✓ {{ fileName }}</p>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
const { addToast } = useToast()

const isLoading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const fileName = ref('')
const showStartCalendar = ref(false)
const showEndCalendar = ref(false)

const profile = ref({
  fullName: 'ครูสมชาย สายสอน',
  position: 'ครู',
  department: 'กลุ่มสาระวิทยาศาสตร์ฯ',
  email: 'somchai@saard.ac.th'
})

const form = ref({
  type: '',
  startDate: '',
  endDate: '',
  location: '',
  province: '',
  district: '',
  subDistrict: '',
  zipcode: '',
  reason: '',
  attachment: null as File | null
})

interface SubDistrict {
  name: string
  zipcode: string
}

interface District {
  name: string
  subDistricts: SubDistrict[]
}

interface Province {
  name: string
  districts: District[]
}

const mockProvinces: Province[] = [
  {
    name: 'กรุงเทพมหานคร',
    districts: [
      {
        name: 'เขตพระนคร',
        subDistricts: [{ name: 'พระบรมมหาราชวัง', zipcode: '10200' }, { name: 'วังบูรพาภิรมย์', zipcode: '10200' }]
      },
      {
        name: 'เขตปทุมวัน',
        subDistricts: [{ name: 'ลุมพินี', zipcode: '10330' }, { name: 'รองเมือง', zipcode: '10330' }]
      }
    ]
  },
  {
    name: 'ชลบุรี',
    districts: [
      {
        name: 'เมืองชลบุรี',
        subDistricts: [{ name: 'บางแสน', zipcode: '20130' }, { name: 'มะขามหย่ง', zipcode: '20000' }]
      },
      {
        name: 'บางละมุง',
        subDistricts: [{ name: 'หนองปรือ', zipcode: '20150' }, { name: 'นาเกลือ', zipcode: '20150' }]
      }
    ]
  }
]

const availableDistricts = computed<District[]>(() => {
  if (!form.value.province) return []
  const selectedProvince = mockProvinces.find((province) => province.name === form.value.province)
  return selectedProvince ? selectedProvince.districts : []
})

const availableSubDistricts = computed<SubDistrict[]>(() => {
  if (!form.value.district) return []
  const selectedDistrict = availableDistricts.value.find((district) => district.name === form.value.district)
  return selectedDistrict ? selectedDistrict.subDistricts : []
})

const remainingRequestQuota = {
  sick: 10,
  personal: 7,
  vacation: 4
}

const selectedTypeRemainingRequests = computed(() => {
  if (!form.value.type) return 0
  return remainingRequestQuota[form.value.type as keyof typeof remainingRequestQuota] ?? 0
})

const errors = ref({
  dateRange: '',
  attachment: ''
})

const validateDateRange = () => {
  errors.value.dateRange = ''

  if (!form.value.startDate || !form.value.endDate) return

  const start = new Date(form.value.startDate)
  const end = new Date(form.value.endDate)

  if (start > end) {
    errors.value.dateRange = 'วันที่สิ้นสุดลาต้องไม่น้อยกว่าวันที่เริ่มลา'
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

const onProvinceChange = () => {
  form.value.district = ''
  form.value.subDistrict = ''
  form.value.zipcode = ''
}

const onDistrictChange = () => {
  form.value.subDistrict = ''
  form.value.zipcode = ''
}

const onSubDistrictChange = () => {
  const selected = availableSubDistricts.value.find((subDistrict) => subDistrict.name === form.value.subDistrict)
  form.value.zipcode = selected ? selected.zipcode : ''
}

const handleFileUpload = (event: Event) => {
  errors.value.attachment = ''
  const target = event.target as HTMLInputElement

  if (!target.files || target.files.length === 0) return

  const file = target.files[0]
  if (file.size > 5 * 1024 * 1024) {
    errors.value.attachment = 'ขนาดไฟล์ต้องไม่เกิน 5MB'
    return
  }

  form.value.attachment = file
  fileName.value = file.name
}

const handleSubmit = async () => {
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

  if (!form.value.attachment) {
    errors.value.attachment = 'กรุณาแนบเอกสาร/ไฟล์ประกอบก่อนส่งคำร้อง'
    addToast('warning', 'ข้อมูลไม่ครบ', errors.value.attachment)
    return
  }

  isLoading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    addToast('success', 'ยื่นคำขอสำเร็จ', 'ระบบบันทึกใบคำขอลาและส่งต่อให้ผู้อำนวยการแล้ว')
    router.push('/teacher/dashboard')
  }
  catch (error) {
    addToast('error', 'ส่งคำขอไม่สำเร็จ', 'ไม่สามารถบันทึกใบคำขอได้ในขณะนี้ กรุณาลองใหม่')
  }
  finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.push('/teacher/dashboard')
}
</script>