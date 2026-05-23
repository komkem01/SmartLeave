<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
    <div class="hidden sm:block"></div>

    <div class="sm:mx-auto w-full max-w-2xl">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 mb-4 transition-transform hover:scale-105 duration-300">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">SmartLeave</h2>
        <p class="mt-2 text-sm text-slate-500">
          ลงทะเบียนเข้าใช้งานระบบบริหารจัดการการลางานดิจิทัล
          <span class="block mt-0.5 font-semibold text-slate-700 text-xs tracking-wider uppercase">โรงเรียนสะอาดประชาสรรพ์</span>
        </p>
      </div>

      <div class="bg-white py-8 px-6 shadow-sm border border-slate-200/60 rounded-2xl sm:px-10">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <!-- คอลัมน์ที่ 1: ข้อมูลส่วนตัวและบัญชี -->
            <div class="space-y-4">
              <h3 class="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                <span class="w-1.5 h-3 bg-blue-600 rounded-full"></span>
                ข้อมูลส่วนตัวและบัญชีผู้ใช้งาน
              </h3>

              <!-- เพศ & คำนำหน้า -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="gender" class="block text-xs font-semibold text-slate-700">เพศ <span class="text-rose-500">*</span></label>
                  <AppDropdown
                    id="gender"
                    v-model="regForm.genderId"
                    placeholder="เลือกเพศ"
                    :options="genders.map((g) => ({ label: g.name, value: g.id }))"
                  />
                </div>
                <div>
                  <label for="prefix" class="block text-xs font-semibold text-slate-700">คำนำหน้า <span class="text-rose-500">*</span></label>
                  <AppDropdown
                    id="prefix"
                    v-model="regForm.prefixId"
                    placeholder="เลือก"
                    :disabled="!regForm.genderId || prefixes.length === 0"
                    :page-size="8"
                    :allow-page-size-select="true"
                    :page-size-options="[5, 8, 10, 15]"
                    :options="prefixes.map((p) => ({ label: p.name, value: p.id }))"
                  />
                </div>
              </div>

              <!-- ชื่อ - นามสกุล -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="firstName" class="block text-xs font-semibold text-slate-700">ชื่อจริง <span class="text-rose-500">*</span></label>
                  <input id="firstName" v-model="regForm.firstName" type="text" required placeholder="สมชาย"
                    class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
                <div>
                  <label for="lastName" class="block text-xs font-semibold text-slate-700">นามสกุล <span class="text-rose-500">*</span></label>
                  <input id="lastName" v-model="regForm.lastName" type="text" required placeholder="สายสอน"
                    class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
              </div>

              <!-- ตำแหน่ง -->
              <div>
                <label for="role" class="block text-xs font-semibold text-slate-700">ตำแหน่ง <span class="text-rose-500">*</span></label>
                <AppDropdown
                  id="role"
                  v-model="regForm.role"
                  :options="roleOptions.map((r) => ({ label: r.name, value: r.id }))"
                />
              </div>

              <div>
                <label for="department" class="block text-xs font-semibold text-slate-700">กลุ่มสาระการเรียนรู้ <span class="text-rose-500">*</span></label>
                <AppDropdown
                  id="department"
                  v-model="regForm.department"
                  placeholder="เลือกกลุ่มสาระการเรียนรู้"
                  :options="departmentOptions.map((d) => ({ label: d.name, value: d.id }))"
                />
              </div>

              <div>
                <label for="regEmail" class="block text-xs font-semibold text-slate-700">อีเมล <span class="text-rose-500">*</span></label>
                <input id="regEmail" v-model="regForm.email" type="text" inputmode="email" required placeholder="user@example.com"
                  class="mt-1 block w-full min-w-0 rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  :class="{ 'border-rose-400': errors.email }"
                  @input="validateEmail" />
                <p v-if="errors.email" class="mt-1 text-xs text-rose-500 font-medium">{{ errors.email }}</p>
              </div>

            </div>

            <!-- คอลัมน์ที่ 2: ที่อยู่ -->
            <div class="space-y-4">
              <h3 class="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                <span class="w-1.5 h-3 bg-blue-600 rounded-full"></span>
                ที่อยู่ตามบัตรประชาชน
              </h3>

              <!-- จังหวัด -->
              <div>
                <label for="province" class="block text-xs font-semibold text-slate-700">จังหวัด <span class="text-rose-500">*</span></label>
                <AppDropdown
                  id="province"
                  v-model="regForm.provinceId"
                  placeholder="เลือกจังหวัด"
                  :page-size="20"
                  :allow-page-size-select="true"
                  :page-size-options="[10, 20, 30, 50]"
                  :options="provinces.map((prov) => ({ label: prov.name, value: prov.id }))"
                />
              </div>

              <!-- อำเภอ -->
              <div>
                <label for="district" class="block text-xs font-semibold text-slate-700">อำเภอ/เขต <span class="text-rose-500">*</span></label>
                <AppDropdown
                  id="district"
                  v-model="regForm.districtId"
                  placeholder="เลือกอำเภอ"
                  :disabled="!regForm.provinceId || districts.length === 0"
                  :options="districts.map((dist) => ({ label: dist.name, value: dist.id }))"
                />
              </div>

              <!-- ตำบล -->
              <div>
                <label for="subDistrict" class="block text-xs font-semibold text-slate-700">ตำบล/แขวง <span class="text-rose-500">*</span></label>
                <AppDropdown
                  id="subDistrict"
                  v-model="regForm.subDistrictId"
                  placeholder="เลือกตำบล"
                  :disabled="!regForm.districtId || subDistricts.length === 0"
                  :options="subDistricts.map((sub) => ({ label: sub.name, value: sub.id }))"
                />
              </div>

              <!-- รหัสไปรษณีย์ (auto-fill) -->
              <div>
                <label for="zipcode" class="block text-xs font-semibold text-slate-700">รหัสไปรษณีย์ <span class="text-rose-500">*</span></label>
                <input
                  id="zipcode"
                  :value="regForm.zipcodeName"
                  type="text"
                  readonly
                  placeholder="ระบุตำบลเพื่อค้นหารหัสอัตโนมัติ"
                  class="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label for="regPhone" class="block text-xs font-semibold text-slate-700">เบอร์โทรศัพท์ <span class="text-rose-500">*</span></label>
                <input id="regPhone" v-model="regForm.phone" type="text" inputmode="tel" required placeholder="08xxxxxxxx"
                  class="mt-1 block w-full min-w-0 rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
              </div>
            </div>

          </div>

          <!-- รหัสผ่าน & ยืนยันรหัสผ่าน (แถวเต็มความกว้าง) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="regPassword" class="block text-xs font-semibold text-slate-700">รหัสผ่าน <span class="text-rose-500">*</span></label>
              <input id="regPassword" v-model="regForm.password" type="password" required placeholder="ขั้นต่ำ 6 อักขระ"
                class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                :class="{ 'border-rose-400': errors.password }"
                @input="validatePassword" />
              <p v-if="errors.password" class="mt-1 text-xs text-rose-500 font-medium">{{ errors.password }}</p>
            </div>

            <div>
              <label for="regConfirmPassword" class="block text-xs font-semibold text-slate-700">ยืนยันรหัสผ่าน <span class="text-rose-500">*</span></label>
              <input id="regConfirmPassword" v-model="regForm.confirmPassword" type="password" required placeholder="กรอกรหัสผ่านอีกครั้ง"
                class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                :class="{ 'border-rose-400': errors.confirmPassword }"
                @input="validateConfirmPassword" />
              <p v-if="errors.confirmPassword" class="mt-1 text-xs text-rose-500 font-medium">{{ errors.confirmPassword }}</p>
            </div>
          </div>

          <!-- ปุ่มด้านล่าง -->
          <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button type="button" @click="goToLogin"
              class="w-full sm:w-1/3 py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors duration-200 focus:outline-none">
              ย้อนกลับหน้าเข้าสู่ระบบ
            </button>
            <button type="submit" :disabled="isLoading || hasErrors"
              class="w-full sm:w-2/3 flex justify-center py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
              <span v-if="isLoading" class="mr-2 flex items-center">
                <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </span>
              {{ isLoading ? 'กำลังประมวลผลข้อมูล...' : 'ลงทะเบียนบัญชีใหม่' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="mt-8 text-center">
      <p class="text-xs text-slate-400 tracking-wide">&copy; 2026 โรงเรียนสะอาดประชาสรรพ์. สงวนลิขสิทธิ์ระบบสารสนเทศภายใน</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { addToast } = useToast()
const config = useRuntimeConfig()
const BASE = config.public.BASE_API

const isLoading = ref<boolean>(false)

// ---------- Dropdown data from API ----------
interface Item { id: string; name: string }

const genders   = ref<Item[]>([])
const prefixes  = ref<Item[]>([])
const provinces = ref<Item[]>([])
const districts = ref<Item[]>([])
const subDistricts = ref<Item[]>([])
const zipcodes  = ref<Item[]>([])
const roleOptions: Item[] = [
  { id: 'teacher', name: 'ครู' },
  // { id: 'director', name: 'ผู้อำนวยการ' },
]
const departmentOptions: Item[] = [
  { id: 'ภาษาไทย', name: 'ภาษาไทย' },
  { id: 'คณิตศาสตร์', name: 'คณิตศาสตร์' },
  { id: 'วิทยาศาสตร์และเทคโนโลยี', name: 'วิทยาศาสตร์และเทคโนโลยี' },
  { id: 'สังคมศึกษา ศาสนา และวัฒนธรรม', name: 'สังคมศึกษา ศาสนา และวัฒนธรรม' },
  { id: 'สุขศึกษาและพลศึกษา', name: 'สุขศึกษาและพลศึกษา' },
  { id: 'ศิลปะ', name: 'ศิลปะ' },
  { id: 'การงานอาชีพ', name: 'การงานอาชีพ' },
  { id: 'ภาษาต่างประเทศ', name: 'ภาษาต่างประเทศ' },
]

// ---------- Form state ----------
const regForm = ref({
  genderId:      '',
  prefixId:      '',
  firstName:     '',
  lastName:      '',
  department:    '',
  role:          'teacher',
  email:         '',
  phone:         '',
  password:      '',
  confirmPassword: '',
  provinceId:    '',
  districtId:    '',
  subDistrictId: '',
  zipcodeId:     '',
  zipcodeName:   '',
})

const errors = ref({ email: '', password: '', confirmPassword: '' })

// ---------- Load master data ----------
const loadGenders = async () => {
  try {
    const res = await $fetch<any>(`${BASE}/system/gender`)
    genders.value = (res?.data ?? []).filter((g: any) => g.is_active)
  } catch {}
}

const loadProvinces = async () => {
  try {
    const res = await $fetch<any>(`${BASE}/system/province`)
    provinces.value = (res?.data ?? []).filter((p: any) => p.is_active)
  } catch {}
}

onMounted(() => {
  loadGenders()
  loadProvinces()
})

// ---------- Cascading watchers ----------
watch(() => regForm.value.genderId, async (id) => {
  regForm.value.prefixId = ''
  prefixes.value = []
  if (!id) return
  try {
    const res = await $fetch<any>(`${BASE}/system/prefix?gender_id=${id}`)
    prefixes.value = (res?.data ?? []).filter((p: any) => p.is_active)
  } catch {}
})

watch(() => regForm.value.provinceId, async (id) => {
  regForm.value.districtId    = ''
  regForm.value.subDistrictId = ''
  regForm.value.zipcodeId     = ''
  regForm.value.zipcodeName   = ''
  districts.value    = []
  subDistricts.value = []
  zipcodes.value     = []
  if (!id) return
  try {
    const res = await $fetch<any>(`${BASE}/system/district?province_id=${id}`)
    districts.value = (res?.data ?? []).filter((d: any) => d.is_active)
  } catch {}
})

watch(() => regForm.value.districtId, async (id) => {
  regForm.value.subDistrictId = ''
  regForm.value.zipcodeId     = ''
  regForm.value.zipcodeName   = ''
  subDistricts.value = []
  zipcodes.value     = []
  if (!id) return
  try {
    const res = await $fetch<any>(`${BASE}/system/sub-district?district_id=${id}`)
    subDistricts.value = (res?.data ?? []).filter((s: any) => s.is_active)
  } catch {}
})

watch(() => regForm.value.subDistrictId, async (id) => {
  regForm.value.zipcodeId   = ''
  regForm.value.zipcodeName = ''
  zipcodes.value = []
  if (!id) return
  try {
    const res = await $fetch<any>(`${BASE}/system/zipcode?sub_district_id=${id}`)
    zipcodes.value = (res?.data ?? []).filter((z: any) => z.is_active)
    if (zipcodes.value.length > 0) {
      const first = zipcodes.value[0]
      if (first) {
        regForm.value.zipcodeId   = first.id
        regForm.value.zipcodeName = first.name
      }
    }
  } catch {}
})

// ---------- Validation ----------
const validateEmail = () => {
  errors.value.email = ''
  const email = regForm.value.email.trim()
  if (!email) {
    errors.value.email = 'กรุณากรอกอีเมล'
    return
  }
  if (!email.includes('@')) {
    errors.value.email = 'อีเมลต้องมีเครื่องหมาย @'
  }
}

const validatePassword = () => {
  errors.value.password = ''
  if (!regForm.value.password) {
    errors.value.password = 'กรุณาตั้งรหัสผ่าน'
    return
  }
  if (regForm.value.password.length < 6) {
    errors.value.password = 'รหัสผ่านต้องมีความยาวไม่ต่ำกว่า 6 ตัวอักษร'
  }
  validateConfirmPassword()
}

const validateConfirmPassword = () => {
  errors.value.confirmPassword = ''
  if (!regForm.value.confirmPassword) {
    errors.value.confirmPassword = 'กรุณายืนยันรหัสผ่าน'
    return
  }
  if (regForm.value.password !== regForm.value.confirmPassword) {
    errors.value.confirmPassword = 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน'
  }
}

const hasErrors = computed(() => !!errors.value.email || !!errors.value.password || !!errors.value.confirmPassword)

// ---------- Submit ----------
const handleRegister = async () => {
  validateEmail()
  validatePassword()
  validateConfirmPassword()

  if (hasErrors.value) {
    addToast('error', 'ข้อมูลลงทะเบียนไม่ถูกต้อง', errors.value.email || errors.value.password || errors.value.confirmPassword)
    return
  }

  const f = regForm.value
  if (!f.genderId || !f.prefixId || !f.department || !f.phone || !f.provinceId || !f.districtId || !f.subDistrictId || !f.zipcodeId) {
    addToast('error', 'ข้อมูลไม่ครบ', 'กรุณาเลือกเพศ คำนำหน้า กลุ่มสาระการเรียนรู้ และที่อยู่ให้ครบถ้วน')
    return
  }

  isLoading.value = true
  try {
    await $fetch(`${BASE}/member`, {
      method: 'POST',
      body: {
        gender_id:       f.genderId,
        prefix_id:       f.prefixId,
        email:           f.email,
        phone:           f.phone,
        password:        f.password,
        firstname:       f.firstName,
        lastname:        f.lastName,
        department:      f.department,
        role:            f.role,
        province_id:     f.provinceId,
        district_id:     f.districtId,
        sub_district_id: f.subDistrictId,
        zipcode_id:      f.zipcodeId,
        is_active:       true,
      },
    })

    addToast('success', 'ลงทะเบียนสำเร็จ', `ลงทะเบียน ${f.firstName} ${f.lastName} เรียบร้อยแล้ว`)
    router.push('/login')
  } catch (error: any) {
    const statusCode = error?.statusCode || error?.response?.status || 0
    const msg = statusCode === 400
      ? 'ข้อมูลไม่ถูกต้องหรืออีเมลนี้มีในระบบแล้ว'
      : 'เกิดข้อผิดพลาดในการลงทะเบียน โปรดลองใหม่'
    addToast('error', 'ลงทะเบียนไม่สำเร็จ', msg)
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => router.push('/login')
</script>

<style scoped>
/* ดีไซน์มินิมอลแบบสากลทั้งหมด ควบคุมผ่าน Tailwind Utility class อย่างโปร่งใส */
</style>