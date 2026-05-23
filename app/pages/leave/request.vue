<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <!-- Input Form Section -->
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 h-fit no-print">
        <h1 class="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">สร้างแบบฟอร์มการลา</h1>
        
        <form @submit.prevent class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Leave Type -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">ประเภทการลา</label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition" :class="{'border-blue-500 bg-blue-50': form.type === 'vacation'}">
                  <input type="radio" v-model="form.type" value="vacation" class="mr-2 text-blue-600 focus:ring-blue-500">
                  พักผ่อน
                </label>
                <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition" :class="{'border-blue-500 bg-blue-50': form.type === 'sick'}">
                  <input type="radio" v-model="form.type" value="sick" class="mr-2 text-blue-600 focus:ring-blue-500">
                  ป่วย
                </label>
                <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition" :class="{'border-blue-500 bg-blue-50': form.type === 'personal'}">
                  <input type="radio" v-model="form.type" value="personal" class="mr-2 text-blue-600 focus:ring-blue-500">
                  กิจส่วนตัว
                </label>
                <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition" :class="{'border-blue-500 bg-blue-50': form.type === 'maternity'}">
                  <input type="radio" v-model="form.type" value="maternity" class="mr-2 text-blue-600 focus:ring-blue-500">
                  คลอดบุตร
                </label>
              </div>
            </div>

            <!-- Basic Info -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">เขียนที่</label>
              <input type="text" v-model="form.writtenAt" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="เช่น ศธจ.ภูเก็ต">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">วันที่เขียน</label>
              <input type="date" v-model="form.date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">เรียน</label>
              <input type="text" v-model="form.to" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="เช่น ศึกษาธิการจังหวัดภูเก็ต">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล</label>
              <input type="text" v-model="form.name" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ตำแหน่ง</label>
              <input type="text" v-model="form.position" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">สังกัด</label>
              <input type="text" v-model="form.department" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
            </div>

            <!-- Vacation Specific -->
            <template v-if="form.type === 'vacation'">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">วันลาพักผ่อนสะสม (วัน)</label>
                <input type="number" v-model.number="form.accumulatedDays" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
              </div>
            </template>

            <!-- Personal Specific -->
            <template v-if="form.type === 'personal'">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">เนื่องจาก</label>
                <input type="text" v-model="form.reason" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="เหตุผลการลากิจ">
              </div>
            </template>

            <!-- Leave Dates -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ลาตั้งแต่วันที่</label>
              <input type="date" v-model="form.startDate" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ถึงวันที่</label>
              <input type="date" v-model="form.endDate" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">มีกำหนด (วัน)</label>
              <input type="number" v-model.number="form.totalDays" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
            </div>

            <!-- Last Leave Info (Non-vacation) -->
            <template v-if="form.type !== 'vacation'">
              <div class="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                <h3 class="font-medium mb-3">ข้อมูลการลาครั้งสุดท้าย</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">ประเภทการลาครั้งสุดท้าย</label>
                    <select v-model="form.lastLeaveType" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
                      <option value="">-- ไม่ระบุ --</option>
                      <option value="sick">ป่วย</option>
                      <option value="personal">กิจส่วนตัว</option>
                      <option value="maternity">คลอดบุตร</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">ตั้งแต่วันที่</label>
                    <input type="date" v-model="form.lastLeaveStartDate" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">ถึงวันที่</label>
                    <input type="date" v-model="form.lastLeaveEndDate" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">มีกำหนด (วัน)</label>
                    <input type="number" v-model.number="form.lastLeaveTotalDays" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border">
                  </div>
                </div>
              </div>
            </template>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">ติดต่อได้ที่</label>
              <textarea v-model="form.contactAddress" rows="2" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"></textarea>
            </div>

            <!-- Stats -->
            <div class="md:col-span-2 bg-gray-50 p-4 rounded-lg">
              <h3 class="font-medium mb-3">สถิติการลาในปีงบประมาณนี้ (วันทำการ)</h3>
              <div v-if="form.type === 'vacation'" class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">ลามาแล้ว</label>
                  <input type="number" v-model.number="form.stats.vacation.taken" class="w-full rounded-md border-gray-300 p-2 border">
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">ลาครั้งนี้</label>
                  <input type="number" v-model.number="form.stats.vacation.thisTime" class="w-full rounded-md border-gray-300 p-2 border">
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">รวมเป็น</label>
                  <input type="number" :value="(form.stats.vacation.taken || 0) + (form.stats.vacation.thisTime || 0)" readonly class="w-full rounded-md border-gray-300 bg-gray-100 p-2 border">
                </div>
              </div>
              <div v-else class="space-y-4">
                <div class="grid grid-cols-4 gap-2 items-center">
                  <span class="text-sm font-medium">ลาป่วย</span>
                  <input type="number" v-model.number="form.stats.sick.taken" placeholder="มาแล้ว" class="w-full rounded-md border-gray-300 p-1 border text-sm">
                  <input type="number" v-model.number="form.stats.sick.thisTime" placeholder="ครั้งนี้" class="w-full rounded-md border-gray-300 p-1 border text-sm">
                  <input type="number" :value="(form.stats.sick.taken || 0) + (form.stats.sick.thisTime || 0)" readonly class="w-full rounded-md border-gray-300 bg-gray-100 p-1 border text-sm">
                </div>
                <div class="grid grid-cols-4 gap-2 items-center">
                  <span class="text-sm font-medium">ลากิจ</span>
                  <input type="number" v-model.number="form.stats.personal.taken" placeholder="มาแล้ว" class="w-full rounded-md border-gray-300 p-1 border text-sm">
                  <input type="number" v-model.number="form.stats.personal.thisTime" placeholder="ครั้งนี้" class="w-full rounded-md border-gray-300 p-1 border text-sm">
                  <input type="number" :value="(form.stats.personal.taken || 0) + (form.stats.personal.thisTime || 0)" readonly class="w-full rounded-md border-gray-300 bg-gray-100 p-1 border text-sm">
                </div>
                <div class="grid grid-cols-4 gap-2 items-center">
                  <span class="text-sm font-medium">คลอดบุตร</span>
                  <input type="number" v-model.number="form.stats.maternity.taken" placeholder="มาแล้ว" class="w-full rounded-md border-gray-300 p-1 border text-sm">
                  <input type="number" v-model.number="form.stats.maternity.thisTime" placeholder="ครั้งนี้" class="w-full rounded-md border-gray-300 p-1 border text-sm">
                  <input type="number" :value="(form.stats.maternity.taken || 0) + (form.stats.maternity.thisTime || 0)" readonly class="w-full rounded-md border-gray-300 bg-gray-100 p-1 border text-sm">
                </div>
              </div>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">ผู้ปฏิบัติหน้าที่แทน (ถ้ามี)</label>
              <input type="text" v-model="form.substituteName" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="ชื่อ-นามสกุล">
            </div>

          </div>

          <div class="pt-6 border-t flex flex-col sm:flex-row gap-4">
            <button @click="exportToPDF" type="button" class="w-full sm:w-auto flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              ดาวน์โหลด PDF
            </button>
            <button @click="printDocument" type="button" class="w-full sm:w-auto flex-1 bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              พิมพ์เอกสาร
            </button>
          </div>
        </form>
      </div>

      <!-- Preview Section -->
      <div class="overflow-x-auto bg-gray-200 p-4 md:p-8 rounded-2xl shadow-inner no-print flex justify-center">
        <div class="scale-50 sm:scale-75 lg:scale-100 origin-top">
          <!-- Wrapper for html2pdf to grab -->
          <div id="pdf-content">
            <LeaveDocumentPreview :data="computedData" />
          </div>
        </div>
      </div>

      <!-- Hidden Print Version -->
      <div class="print-only">
        <LeaveDocumentPreview :data="computedData" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import LeaveDocumentPreview from '~/components/leave/LeaveDocumentPreview.vue'

// Initialize form data
const form = ref({
  type: 'vacation',
  writtenAt: 'ศธจ.ภูเก็ต',
  date: new Date().toISOString().split('T')[0],
  to: 'ศึกษาธิการจังหวัดภูเก็ต',
  name: 'นายทดสอบ ระบบ',
  position: 'นักวิชาการคอมพิวเตอร์',
  department: 'สำนักงานศึกษาธิการจังหวัดภูเก็ต',
  accumulatedDays: 5,
  reason: '',
  startDate: '',
  endDate: '',
  totalDays: 0,
  lastLeaveType: '',
  lastLeaveStartDate: '',
  lastLeaveEndDate: '',
  lastLeaveTotalDays: 0,
  contactAddress: '123 ม.1 ต.ตลาดใหญ่ อ.เมือง จ.ภูเก็ต 83000 เบอร์โทร 081-2345678',
  substituteName: '',
  stats: {
    vacation: { taken: 0, thisTime: 0, total: 0 },
    sick: { taken: 0, thisTime: 0, total: 0 },
    personal: { taken: 0, thisTime: 0, total: 0 },
    maternity: { taken: 0, thisTime: 0, total: 0 }
  }
})

// Auto calculate totals in stats
watch(() => form.value.stats.vacation.thisTime, (val) => {
  form.value.stats.vacation.total = (form.value.stats.vacation.taken || 0) + (val || 0)
})
watch(() => form.value.stats.sick.thisTime, (val) => {
  form.value.stats.sick.total = (form.value.stats.sick.taken || 0) + (val || 0)
})
watch(() => form.value.stats.personal.thisTime, (val) => {
  form.value.stats.personal.total = (form.value.stats.personal.taken || 0) + (val || 0)
})
watch(() => form.value.stats.maternity.thisTime, (val) => {
  form.value.stats.maternity.total = (form.value.stats.maternity.taken || 0) + (val || 0)
})
watch(() => form.value.totalDays, (val) => {
  // Auto-fill thisTime based on leave type
  if (form.value.type === 'vacation') form.value.stats.vacation.thisTime = val
  if (form.value.type === 'sick') form.value.stats.sick.thisTime = val
  if (form.value.type === 'personal') form.value.stats.personal.thisTime = val
  if (form.value.type === 'maternity') form.value.stats.maternity.thisTime = val
})

// Computed data to pass to preview
const computedData = computed(() => {
  return { ...form.value }
})

const printDocument = () => {
  window.print()
}

const exportToPDF = async () => {
  if (import.meta.client) {
    const html2pdf = (await import('html2pdf.js')).default
    const element = document.getElementById('pdf-content')
    
    // Configure PDF options
    const opt = {
      margin:       0,
      filename:     `ใบลา_${form.value.name}_${form.value.startDate}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    
    // Generate PDF
    html2pdf().set(opt).from(element).save()
  }
}
</script>
