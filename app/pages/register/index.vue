<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
    <!-- ส่วนหัวระยะห่างสมมาตร (Spacer) -->
    <div class="hidden sm:block"></div>

    <div class="sm:mx-auto w-full max-w-2xl">
      <!-- โลโก้แบรนดิ้งระบบ SmartLeave สะอาดประชาสรรค์ -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 mb-4 transition-transform hover:scale-105 duration-300">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">
          SmartLeave
        </h2>
        <p class="mt-2 text-sm text-slate-500">
          ลงทะเบียนเข้าใช้งานระบบบริหารจัดการการลางานดิจิทัล
          <span class="block mt-0.5 font-semibold text-slate-700 text-xs tracking-wider uppercase">
            โรงเรียนสะอาดประชาสรรค์
          </span>
        </p>
      </div>

      <!-- บล็อกฟอร์มหลัก (Register Card) -->
      <div class="bg-white py-8 px-6 shadow-sm border border-slate-200/60 rounded-2xl sm:px-10">
        <form @submit.prevent="handleRegister" class="space-y-6">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- คอลัมน์ที่ 1: ข้อมูลส่วนตัวและบัญชี -->
            <div class="space-y-4">
              <h3 class="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                <span class="w-1.5 h-3 bg-blue-600 rounded-full"></span>
                ข้อมูลส่วนตัวและบัญชีผู้ใช้งาน
              </h3>

              <!-- คำนำหน้านาม & เพศ -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="prefix" class="block text-xs font-semibold text-slate-700">
                    คำนำหน้านาม <span class="text-rose-500">*</span>
                  </label>
                  <select
                    id="prefix"
                    v-model="regForm.prefix"
                    required
                    class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-155"
                  >
                    <option value="" disabled>เลือก</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                    <option value="ดร.">ดร.</option>
                  </select>
                </div>
                <div>
                  <label for="gender" class="block text-xs font-semibold text-slate-700">
                    เพศ <span class="text-rose-500">*</span>
                  </label>
                  <select
                    id="gender"
                    v-model="regForm.gender"
                    required
                    class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-155"
                  >
                    <option value="" disabled>เลือกเพศ</option>
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                    <option value="อื่น ๆ / ไม่ระบุ">อื่น ๆ / ไม่ระบุ</option>
                  </select>
                </div>
              </div>

              <!-- ชื่อจริง - นามสกุล -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="firstName" class="block text-xs font-semibold text-slate-700">
                    ชื่อจริง <span class="text-rose-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    v-model="regForm.firstName"
                    type="text"
                    required
                    placeholder="สมชาย"
                    class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-155"
                  />
                </div>
                <div>
                  <label for="lastName" class="block text-xs font-semibold text-slate-700">
                    นามสกุล <span class="text-rose-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    v-model="regForm.lastName"
                    type="text"
                    required
                    placeholder="สายสอน"
                    class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-155"
                  />
                </div>
              </div>

              <!-- กลุ่มสาระการเรียนรู้ (กรอกเอง) -->
              <div>
                <label for="department" class="block text-xs font-semibold text-slate-700">
                  กลุ่มสาระการเรียนรู้ / กลุ่มงาน <span class="text-rose-500">*</span>
                </label>
                <input
                  id="department"
                  v-model="regForm.department"
                  type="text"
                  required
                  placeholder="เช่น คณิตศาสตร์, วิทยาศาสตร์และเทคโนโลยี"
                  class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-155"
                />
              </div>

              <!-- อีเมลบุคลากร -->
              <div>
                <label for="regEmail" class="block text-xs font-semibold text-slate-700">
                  อีเมลบุคลากร (.saard.ac.th) <span class="text-rose-500">*</span>
                </label>
                <input
                  id="regEmail"
                  v-model="regForm.email"
                  type="email"
                  required
                  placeholder="user@saard.ac.th"
                  class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-155"
                  :class="{ 'border-rose-400 focus:border-rose-500': errors.regEmail }"
                  @input="validateEmail"
                />
                <p v-if="errors.regEmail" class="mt-1 text-2xs text-rose-500 font-medium">
                  {{ errors.regEmail }}
                </p>
              </div>

              <!-- รหัสผ่าน -->
              <div>
                <label for="regPassword" class="block text-xs font-semibold text-slate-700">
                  รหัสผ่าน <span class="text-rose-500">*</span>
                </label>
                <input
                  id="regPassword"
                  v-model="regForm.password"
                  type="password"
                  required
                  placeholder="ขั้นต่ำ 6 อักขระ"
                  class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-155"
                  :class="{ 'border-rose-400 focus:border-rose-500': errors.regPassword }"
                  @input="validatePassword"
                />
                <p v-if="errors.regPassword" class="mt-1 text-2xs text-rose-500 font-medium">
                  {{ errors.regPassword }}
                </p>
              </div>
            </div>

            <!-- คอลัมน์ที่ 2: ที่อยู่ตามบัตรประชาชน -->
            <div class="space-y-4">
              <h3 class="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                <span class="w-1.5 h-3 bg-blue-600 rounded-full"></span>
                ที่อยู่ตามบัตรประชาชน
              </h3>

              <!-- บ้านเลขที่ / รายละเอียดที่อยู่ -->
              <div>
                <label for="addressDetail" class="block text-xs font-semibold text-slate-700">
                  บ้านเลขที่ หมู่ที่ ซอย/ถนน <span class="text-rose-500">*</span>
                </label>
                <input
                  id="addressDetail"
                  v-model="regForm.addressDetail"
                  type="text"
                  required
                  placeholder="12/3 ม.4 ซ.ประชาสรรค์ ถ.สุขุมวิท"
                  class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-155"
                />
              </div>

              <!-- จังหวัด -->
              <div>
                <label for="province" class="block text-xs font-semibold text-slate-700">
                  จังหวัด <span class="text-rose-500">*</span>
                </label>
                <select
                  id="province"
                  v-model="regForm.province"
                  required
                  class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-155"
                  @change="onProvinceChange"
                >
                  <option value="" disabled>เลือกจังหวัด</option>
                  <option v-for="prov in mockProvinces" :key="prov.name" :value="prov.name">
                    {{ prov.name }}
                  </option>
                </select>
              </div>

              <!-- อำเภอ -->
              <div>
                <label for="district" class="block text-xs font-semibold text-slate-700">
                  อำเภอ/เขต <span class="text-rose-500">*</span>
                </label>
                <select
                  id="district"
                  v-model="regForm.district"
                  required
                  :disabled="!regForm.province"
                  class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all duration-155"
                  @change="onDistrictChange"
                >
                  <option value="" disabled>เลือกอำเภอ</option>
                  <option v-for="dist in availableDistricts" :key="dist.name" :value="dist.name">
                    {{ dist.name }}
                  </option>
                </select>
              </div>

              <!-- ตำบล -->
              <div>
                <label for="subDistrict" class="block text-xs font-semibold text-slate-700">
                  ตำบล/แขวง <span class="text-rose-500">*</span>
                </label>
                <select
                  id="subDistrict"
                  v-model="regForm.subDistrict"
                  required
                  :disabled="!regForm.district"
                  class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all duration-155"
                  @change="onSubDistrictChange"
                >
                  <option value="" disabled>เลือกตำบล</option>
                  <option v-for="sub in availableSubDistricts" :key="sub.name" :value="sub.name">
                    {{ sub.name }}
                  </option>
                </select>
              </div>

              <!-- รหัสไปรษณีย์ -->
              <div>
                <label for="zipcode" class="block text-xs font-semibold text-slate-700">
                  รหัสไปรษณีย์ <span class="text-rose-500">*</span>
                </label>
                <input
                  id="zipcode"
                  v-model="regForm.zipcode"
                  type="text"
                  required
                  disabled
                  placeholder="ระบุตำบลเพื่อค้นหารหัสอัตโนมัติ"
                  class="mt-1 block w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-500 focus:outline-none"
                />
              </div>
            </div>

          </div>

          <!-- ปุ่มควบคุมฟอร์มด้านล่าง -->
          <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              class="w-full sm:w-1/3 py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors duration-200 focus:outline-none"
              @click="goToLogin"
            >
              ย้อนกลับหน้าเข้าสู่ระบบ
            </button>
            <button
              type="submit"
              :disabled="isLoading || hasErrors"
              class="w-full sm:w-2/3 flex justify-center py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
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

    <!-- ส่วนท้ายสไตล์ทางการ -->
    <div class="mt-8 text-center">
      <p class="text-xs text-slate-400 tracking-wide">
        &copy; 2026 โรงเรียนสะอาดประชาสรรค์. สงวนลิขสิทธิ์ระบบสารสนเทศภายใน
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// คอมโพเนนต์ของเล่นสำหรับเปลี่ยนหน้า หรือแจ้งเตือน (กรณีไม่ได้เชื่อมต่อ useToast ส่วนกลาง)
const router = useRouter()
const { addToast } = useToast()

const isLoading = ref<boolean>(false)

// ตัวแปรโมเดลสำหรับลงทะเบียน
const regForm = ref({
  prefix: '',
  gender: '',
  firstName: '',
  lastName: '',
  department: '',
  email: '',
  password: '',
  addressDetail: '',
  province: '',
  district: '',
  subDistrict: '',
  zipcode: ''
})

// บันทึกข้อผิดพลาดในการตรวจสอบข้อมูล
const errors = ref({
  regEmail: '',
  regPassword: ''
})

// ข้อมูลจำลอง จังหวัด - อำเภอ - ตำบล สำหรับ Autocomplete ท้องถิ่น
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
        subDistricts: [
          { name: 'พระบรมมหาราชวัง', zipcode: '10200' },
          { name: 'วังบูรพาภิรมย์', zipcode: '10200' }
        ]
      },
      {
        name: 'เขตปทุมวัน',
        subDistricts: [
          { name: 'ลุมพินี', zipcode: '10330' },
          { name: 'รองเมือง', zipcode: '10330' }
        ]
      }
    ]
  },
  {
    name: 'ชลบุรี',
    districts: [
      {
        name: 'เมืองชลบุรี',
        subDistricts: [
          { name: 'บางแสน', zipcode: '20130' },
          { name: 'มะขามหย่ง', zipcode: '20000' }
        ]
      },
      {
        name: 'บางละมุง',
        subDistricts: [
          { name: 'หนองปรือ', zipcode: '20150' },
          { name: 'นาเกลือ', zipcode: '20150' }
        ]
      }
    ]
  }
]

// จัดการคัดกรองข้อมูลที่อยู่ตามลำดับขั้น
const availableDistricts = computed<District[]>(() => {
  if (!regForm.value.province) return []
  const provinceObj = mockProvinces.find(p => p.name === regForm.value.province)
  return provinceObj ? provinceObj.districts : []
})

const availableSubDistricts = computed<SubDistrict[]>(() => {
  if (!regForm.value.district) return []
  const districtObj = availableDistricts.value.find(d => d.name === regForm.value.district)
  return districtObj ? districtObj.subDistricts : []
})

// ปลดระบายและรีเซ็ตลำดับที่อยู่เมื่อมีการแก้ไขขั้นที่สูงกว่า
const onProvinceChange = () => {
  regForm.value.district = ''
  regForm.value.subDistrict = ''
  regForm.value.zipcode = ''
}

const onDistrictChange = () => {
  regForm.value.subDistrict = ''
  regForm.value.zipcode = ''
}

const onSubDistrictChange = () => {
  const subObj = availableSubDistricts.value.find(s => s.name === regForm.value.subDistrict)
  regForm.value.zipcode = subObj ? subObj.zipcode : ''
}

// ระบบตรวจสอบเงื่อนไข Validation
const validateEmail = () => {
  errors.value.regEmail = ''
  if (!regForm.value.email) {
    errors.value.regEmail = 'กรุณากรอกอีเมลสะกดของโรงเรียน'
    return
  }
  if (!regForm.value.email.endsWith('@saard.ac.th')) {
    errors.value.regEmail = 'กรุณาใช้อีเมลทางการของโรงเรียน (@saard.ac.th) เท่านั้น'
  }
}

const validatePassword = () => {
  errors.value.regPassword = ''
  if (!regForm.value.password) {
    errors.value.regPassword = 'กรุณาตั้งรหัสผ่านเข้าใช้งาน'
    return
  }
  if (regForm.value.password.length < 6) {
    errors.value.regPassword = 'รหัสผ่านต้องมีความยาวไม่ต่ำกว่า 6 ตัวอักษร'
  }
}

const hasErrors = computed<boolean>(() => {
  return !!errors.value.regEmail || !!errors.value.regPassword
})

// ส่งข้อมูลเพื่อลงทะเบียนบัญชีผู้ใช้ใหม่
const handleRegister = async () => {
  validateEmail()
  validatePassword()

  if (hasErrors.value) {
    addToast(
      'error',
      'ข้อมูลลงทะเบียนไม่ถูกต้อง',
      errors.value.regEmail || errors.value.regPassword
    )
    return
  }

  isLoading.value = true

  try {
    // จำลองเชื่อมต่อ API เซฟข้อมูลลง Database 1.8 วินาที
    await new Promise((resolve) => setTimeout(resolve, 1800))

    addToast(
      'success',
      'ลงทะเบียนสำเร็จ',
      `ลงทะเบียนคุณครู ${regForm.value.firstName} เรียบร้อยแล้ว กำลังพาไปหน้าเข้าสู่ระบบ`
    )
    
    // พากลับไปหน้าเข้าสู่ระบบผ่าน Router
    router.push('/login')

  } catch (error) {
    addToast('error', 'ลงทะเบียนไม่สำเร็จ', 'เกิดข้อผิดพลาดในการลงทะเบียน โปรดลองใหม่อีกครั้ง')
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
/* ดีไซน์มินิมอลแบบสากลทั้งหมด ควบคุมผ่าน Tailwind Utility class อย่างโปร่งใส */
</style>