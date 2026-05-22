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
              <span class="text-3xs font-semibold text-slate-500 tracking-wider uppercase">โรงเรียนสะอาดประชาสรรค์</span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="hidden md:block text-right">
              <p class="text-sm font-bold text-slate-800">ผอ.วันชัย ใจดี</p>
              <p class="text-3xs text-slate-500 font-semibold tracking-wider uppercase">ผู้อำนวยการสถานศึกษา</p>
            </div>
            <div class="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-blue-700">
              วช
            </div>
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
        <NuxtLink
          to="/director/leave-request-approve"
          class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          กลับหน้ารายการใบลา
        </NuxtLink>
      </div>

      <div v-if="!leaveRequest" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center space-y-3">
        <h2 class="text-lg font-bold text-slate-900">ไม่พบข้อมูลใบคำร้อง</h2>
        <p class="text-sm text-slate-500">รายการที่ต้องการอาจถูกลบหรือยังไม่มีอยู่ในระบบจำลอง</p>
      </div>

      <div v-else class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[620px]">
          <section class="bg-slate-900 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-700">
            <div class="bg-slate-950 rounded-xl px-4 py-2 flex items-center justify-between text-white mb-4">
              <div class="text-xs text-slate-300 truncate pr-2">
                ฟอร์มใบลาราชการ (PDF): แบบใบลาของข้าราชการ.pdf
              </div>
              <div class="flex items-center gap-2">
                <button @click="zoomOut" class="text-slate-300 hover:text-white" title="ซูมออก">-</button>
                <span class="text-xs text-slate-300 min-w-[38px] text-center">{{ Math.round(docZoom * 100) }}%</span>
                <button @click="zoomIn" class="text-slate-300 hover:text-white" title="ซูมเข้า">+</button>
                <button @click="rotateDoc" class="text-slate-300 hover:text-white" title="หมุน">⟳</button>
                <button @click="printFormPdf" class="text-slate-300 hover:text-white" title="พิมพ์ฟอร์ม">🖨</button>
              </div>
            </div>

            <div class="mb-4">
              <button
                type="button"
                @click="downloadDoc"
                class="inline-flex w-full items-center justify-center rounded-xl px-3 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                ดาวน์โหลดไฟล์ PDF (A4)
              </button>
            </div>

            <div class="bg-slate-800 rounded-xl p-4 sm:p-6 min-h-[520px] flex items-center justify-center overflow-auto">
              <div
                class="bg-white rounded-lg shadow-2xl p-8 text-slate-800 transition-all duration-200"
                :style="{ transform: `scale(${docZoom}) rotate(${docRotation}deg)`, width: '420px', minHeight: '594px' }"
              >
                <div class="text-[10px] leading-relaxed space-y-2">
                  <div class="text-center font-bold">แบบฟอร์มการขอลางาน</div>

                  <div class="text-right pt-1">
                    <div>เขียนที่ โรงเรียนสะอาดประชาสรรค์</div>
                    <div>วันที่ {{ leaveRequest.startDate }}</div>
                  </div>

                  <div class="pt-1">
                    <span class="mr-2">เรื่อง</span>
                    <span class="mr-2">ขอลา</span>
                    <span class="mr-2">{{ leaveRequest.type === 'sick' ? '●' : '○' }} ป่วย</span>
                    <span class="mr-2">{{ leaveRequest.type === 'personal' ? '●' : '○' }} กิจส่วนตัว</span>
                    <span>{{ leaveRequest.type === 'vacation' ? '●' : '○' }} อื่นๆ (ระบุ) {{ getLeaveTypeText(leaveRequest.type) }}</span>
                  </div>

                  <div>เรียน ผู้อำนวยการโรงเรียนสะอาดประชาสรรค์</div>

                  <div>
                    ข้าพเจ้า {{ leaveRequest.prefix }}{{ leaveRequest.firstName }} {{ leaveRequest.lastName }}
                    ตำแหน่ง {{ leaveRequest.position }}
                  </div>
                  <div>สังกัดกลุ่มสาระการเรียนรู้ {{ leaveRequest.department }}</div>

                  <div>
                    ขอลา {{ leaveRequest.type === 'sick' ? '●' : '○' }} ป่วย
                    {{ leaveRequest.type === 'personal' ? '●' : '○' }} กิจส่วนตัว
                    {{ leaveRequest.type === 'vacation' ? '●' : '○' }} อื่นๆ
                    เนื่องจาก {{ leaveRequest.reason }}
                  </div>

                  <div>
                    ตั้งแต่วันที่ {{ leaveRequest.startDate }} ถึงวันที่ {{ leaveRequest.endDate }} มีกำหนด {{ leaveRequest.totalDays }} วัน
                  </div>

                  <div>
                    ข้าพเจ้าได้ลาได้ลา ○ป่วย ○กิจส่วนตัว ○คลอดบุตร ครั้งสุดท้าย ตั้งแต่วันที่ ............ ถึงวันที่ ............ มีกำหนด ............ วัน
                  </div>

                  <div>
                    ในระหว่างลาสามารถติดต่อข้าพเจ้าได้ที่ {{ leaveRequest.location }} โทร {{ leaveRequest.email }}
                  </div>

                  <div class="pt-4 grid grid-cols-2 gap-6">
                    <div>
                      <div class="font-semibold mb-1">สถิติการลาในปีงบประมาณนี้</div>
                      <table class="w-full border border-slate-700 border-collapse text-center">
                        <thead>
                          <tr>
                            <th class="border border-slate-700 px-1 py-1 font-normal">ประเภทลา</th>
                            <th class="border border-slate-700 px-1 py-1 font-normal">ลามาแล้ว</th>
                            <th class="border border-slate-700 px-1 py-1 font-normal">ลาครั้งนี้</th>
                            <th class="border border-slate-700 px-1 py-1 font-normal">รวมเป็น</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="border border-slate-700 px-1 py-1">ป่วย</td>
                            <td class="border border-slate-700 px-1 py-1"></td>
                            <td class="border border-slate-700 px-1 py-1">{{ leaveRequest.type === 'sick' ? leaveRequest.totalDays : '' }}</td>
                            <td class="border border-slate-700 px-1 py-1"></td>
                          </tr>
                          <tr>
                            <td class="border border-slate-700 px-1 py-1">กิจส่วนตัว</td>
                            <td class="border border-slate-700 px-1 py-1"></td>
                            <td class="border border-slate-700 px-1 py-1">{{ leaveRequest.type === 'personal' ? leaveRequest.totalDays : '' }}</td>
                            <td class="border border-slate-700 px-1 py-1"></td>
                          </tr>
                          <tr>
                            <td class="border border-slate-700 px-1 py-1">คลอดบุตร</td>
                            <td class="border border-slate-700 px-1 py-1"></td>
                            <td class="border border-slate-700 px-1 py-1"></td>
                            <td class="border border-slate-700 px-1 py-1"></td>
                          </tr>
                        </tbody>
                      </table>

                      <div class="mt-3">(ลงชื่อ)..............................................ผู้ตรวจสอบ</div>
                      <div class="mt-1">ตำแหน่ง .............................................................</div>
                      <div class="mt-1">วันที่ ........... / ........... / ...........</div>
                    </div>

                    <div class="space-y-3">
                      <div class="text-center">
                        <div>ขอแสดงความนับถือ</div>
                        <div class="mt-7">(ลงชื่อ)........................................................</div>
                        <div>( {{ leaveRequest.prefix }}{{ leaveRequest.firstName }} {{ leaveRequest.lastName }} )</div>
                      </div>

                      <div>
                        <div>เห็นสมควร {{ leaveRequest.status === 'approved' ? '●' : '○' }} อนุญาต {{ leaveRequest.status === 'rejected' ? '●' : '○' }} ไม่อนุญาต</div>
                        <div class="mt-2">(ลงชื่อ)........................................................</div>
                        <div>รองผู้อำนวยการกลุ่มบริหารงานบุคคล</div>
                        <div>วันที่ ........... / ........... / ...........</div>
                      </div>

                      <div>
                        <div class="font-semibold text-center">คำสั่ง</div>
                        <div class="mt-1 text-center">○ อนุญาต &nbsp;&nbsp;&nbsp; ○ ไม่อนุญาต</div>
                        <div class="mt-2">(ลงชื่อ)........................................................</div>
                        <div>ผู้อำนวยการโรงเรียนสะอาดประชาสรรค์</div>
                        <div>วันที่ ........... / ........... / ...........</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="p-6 space-y-4">
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p class="text-xs text-slate-500">เลขที่คำร้อง</p>
              <p class="text-base font-bold text-slate-900">#S-{{ leaveRequest.id }}</p>
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
                  class="w-full sm:w-1/2 rounded-xl px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  อนุมัติ
                </button>
              </div>
              <p v-else class="text-xs text-slate-600">รายการนี้ดำเนินการแล้ว ไม่สามารถเปลี่ยนสถานะซ้ำได้</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
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
                  <p><span class="text-slate-500">อีเมล:</span> <span class="font-semibold text-slate-900">{{ leaveRequest.email }}</span></p>
                  <p><span class="text-slate-500">ตำแหน่ง:</span> <span class="font-semibold text-slate-900">{{ leaveRequest.position }}</span></p>
                  <p><span class="text-slate-500">วันที่เริ่มลา:</span> <span class="font-semibold text-slate-900">{{ leaveRequest.startDate }}</span></p>
                  <p><span class="text-slate-500">วันที่สิ้นสุดลา:</span> <span class="font-semibold text-slate-900">{{ leaveRequest.endDate }}</span></p>
                  <p class="sm:col-span-2"><span class="text-slate-500">สถานที่:</span> <span class="font-semibold text-slate-900">{{ leaveRequest.location }}</span></p>
                  <p><span class="text-slate-500">จังหวัด:</span> <span class="font-semibold text-slate-900">{{ leaveRequest.province }}</span></p>
                  <p><span class="text-slate-500">อำเภอ/เขต:</span> <span class="font-semibold text-slate-900">{{ leaveRequest.district }}</span></p>
                  <p><span class="text-slate-500">ตำบล/แขวง:</span> <span class="font-semibold text-slate-900">{{ leaveRequest.subDistrict }}</span></p>
                  <p><span class="text-slate-500">รหัสไปรษณีย์:</span> <span class="font-semibold text-slate-900">{{ leaveRequest.zipcode }}</span></p>
                </div>
              </div>
              <div class="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                <p class="text-xs text-slate-500">เหตุผลการลา</p>
                <p class="text-slate-800 leading-relaxed">{{ leaveRequest.reason }}</p>
              </div>
              <div class="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                <p class="text-xs text-slate-500">ไฟล์แนบ</p>
                <p class="font-semibold text-slate-900">{{ leaveRequest.attachmentUrl || 'ไม่มีไฟล์แนบ' }}</p>
              </div>
              <div class="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                <p class="text-xs text-slate-500">เอกสารแนบเพิ่มเติม</p>
                <div v-if="leaveRequest.attachmentUrl" class="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2">
                  <p class="text-xs text-slate-700">ชื่อไฟล์: <span class="font-semibold text-slate-900">{{ leaveRequest.attachmentUrl }}</span></p>
                  <div class="rounded-md bg-white border border-slate-200 p-3 text-xs text-slate-600">
                    พรีวิวไฟล์แนบ (จำลอง): {{ leaveRequest.attachmentUrl }}
                  </div>
                </div>
                <p v-else class="mt-2 text-xs text-slate-500">ไม่มีไฟล์แนบเพิ่มเติม</p>
              </div>
            </div>
          </section>
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
      <div v-if="openApproveConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
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
                @click="confirmApprove"
              >
                ยืนยันอนุมัติ
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
      <div v-if="openReject" class="fixed inset-0 z-50 flex items-center justify-center p-4">
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
                class="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-all"
              >
                ยืนยันไม่อนุมัติ
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const route = useRoute()
const { addToast } = useToast()

interface LeaveRequest {
  id: number
  prefix: string
  firstName: string
  lastName: string
  position: string
  email: string
  department: string
  type: 'sick' | 'personal' | 'vacation'
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

const docZoom = ref(1)
const docRotation = ref(0)
const openApproveConfirm = ref(false)
const openReject = ref(false)
const rejectReason = ref('')
const formPdfFileName = 'แบบใบลาของข้าราชการ.pdf'

const leaveRequests = ref<LeaveRequest[]>([
  {
    id: 101,
    prefix: 'นาง',
    firstName: 'สมศรี',
    lastName: 'ดีใจ',
    position: 'ครู',
    email: 'somsri@saard.ac.th',
    department: 'คณิตศาสตร์',
    type: 'personal',
    startDate: '26 พฤษภาคม 2569',
    endDate: '28 พฤษภาคม 2569',
    dateString: '26 พ.ค. 2026 - 28 พ.ค. 2026',
    totalDays: 3,
    location: 'บ้านเลขที่ 88 ถนนสุขุมวิท',
    province: 'ชลบุรี',
    district: 'เมืองชลบุรี',
    subDistrict: 'บางแสน',
    zipcode: '20130',
    reason: 'มีธุระด่วนในการเดินทางไปทำนิติกรรมมรดกประจำครอบครัวที่ต่างจังหวัด',
    status: 'pending',
    attachmentUrl: 'personal-leave-request-memo.pdf'
  },
  {
    id: 102,
    prefix: 'นาย',
    firstName: 'มานะ',
    lastName: 'ขยันสอน',
    position: 'ครู',
    email: 'mana@saard.ac.th',
    department: 'ภาษาไทย',
    type: 'sick',
    startDate: '25 พฤษภาคม 2569',
    endDate: '25 พฤษภาคม 2569',
    dateString: '25 พ.ค. 2026',
    totalDays: 1,
    location: 'โรงพยาบาลชลบุรี',
    province: 'ชลบุรี',
    district: 'เมืองชลบุรี',
    subDistrict: 'มะขามหย่ง',
    zipcode: '20000',
    reason: 'มีอาการเป็นไข้หวัดใหญ่ ปวดศีรษะรุนแรง แพทย์แนะนำให้พักรักษาตัว',
    attachmentUrl: 'medical-certificate.pdf',
    status: 'pending'
  },
  {
    id: 103,
    prefix: 'นางสาว',
    firstName: 'มณฑา',
    lastName: 'เพียรเรียน',
    position: 'ครู',
    email: 'monta@saard.ac.th',
    department: 'ภาษาต่างประเทศ',
    type: 'vacation',
    startDate: '12 พฤษภาคม 2569',
    endDate: '15 พฤษภาคม 2569',
    dateString: '12 พ.ค. 2026 - 15 พ.ค. 2026',
    totalDays: 4,
    location: 'บ้านพักต่างจังหวัด',
    province: 'กรุงเทพมหานคร',
    district: 'เขตปทุมวัน',
    subDistrict: 'ลุมพินี',
    zipcode: '10330',
    reason: 'ลาพักผ่อนต่างจังหวัดร่วมกับครอบครัวประจำปีการศึกษา',
    status: 'approved',
    actionTime: '10 พ.ค. 2026'
  },
  {
    id: 104,
    prefix: 'นาย',
    firstName: 'เกรียงไกร',
    lastName: 'พละดี',
    position: 'ครู',
    email: 'kriengkrai@saard.ac.th',
    department: 'สุขศึกษาและพลศึกษา',
    type: 'personal',
    startDate: '2 พฤษภาคม 2569',
    endDate: '2 พฤษภาคม 2569',
    dateString: '02 พ.ค. 2026',
    totalDays: 1,
    location: 'โรงพยาบาลศูนย์จังหวัด',
    province: 'ชลบุรี',
    district: 'เมืองชลบุรี',
    subDistrict: 'บางแสน',
    zipcode: '20130',
    reason: 'พาสมาชิกในครอบครัวเดินทางไปตามที่หมอนัดตรวจโรงพยาบาลศูนย์ประจำจังหวัด',
    status: 'approved',
    actionTime: '30 เม.ย. 2026'
  },
  {
    id: 105,
    prefix: 'นาง',
    firstName: 'อุษา',
    lastName: 'วาดศิลป์',
    position: 'ครู',
    email: 'usa@saard.ac.th',
    department: 'สุขศึกษาและพลศึกษา',
    type: 'vacation',
    startDate: '15 เมษายน 2569',
    endDate: '15 เมษายน 2569',
    dateString: '15 เม.ย. 2026',
    totalDays: 1,
    location: 'คลินิกทันตกรรมกรุงเทพ',
    province: 'กรุงเทพมหานคร',
    district: 'เขตพระนคร',
    subDistrict: 'พระบรมมหาราชวัง',
    zipcode: '10200',
    reason: 'ทำกิจธุระทำฟันและรักษาพยาบาลที่กรุงเทพฯ',
    status: 'rejected',
    rejectReason: 'เนื่องจากตรงกับตารางเวรสอบของโรงเรียนซึ่งขาดผู้ทดแทนทดลองสลับ',
    actionTime: '12 เม.ย. 2026'
  }
])

const leaveRequest = computed(() => {
  const id = Number(route.params.id)
  return leaveRequests.value.find((item) => item.id === id) ?? null
})

const isPdfFile = (fileName?: string) => {
  if (!fileName) return false
  return fileName.toLowerCase().endsWith('.pdf')
}

const getLeaveTypeText = (type: string) => {
  if (type === 'sick') return 'ลาป่วย'
  if (type === 'personal') return 'ลากิจ'
  if (type === 'vacation') return 'ลาพักผ่อน'
  return type
}

const getLeaveTypeClass = (type: string) => {
  if (type === 'sick') return 'text-emerald-700 bg-emerald-50'
  if (type === 'personal') return 'text-amber-700 bg-amber-50'
  return 'text-blue-700 bg-blue-50'
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

const zoomIn = () => {
  if (docZoom.value < 1.8) docZoom.value += 0.15
}

const zoomOut = () => {
  if (docZoom.value > 0.6) docZoom.value -= 0.15
}

const rotateDoc = () => {
  docRotation.value = (docRotation.value + 90) % 360
}

const downloadDoc = () => {
  if (!isPdfFile(formPdfFileName)) {
    addToast('warning', 'ดาวน์โหลดไม่ได้', 'อนุญาตเฉพาะไฟล์ PDF เท่านั้น')
    return
  }
  addToast('info', 'เริ่มดาวน์โหลดไฟล์', `เริ่มดาวน์โหลดไฟล์ PDF ขนาด A4 ที่กรอกข้อมูลจากระบบแล้ว: ${formPdfFileName}`)
}

const printFormPdf = () => {
  window.print()
}

const approveRequest = () => {
  if (!leaveRequest.value || leaveRequest.value.status !== 'pending') return
  leaveRequest.value.status = 'approved'
  leaveRequest.value.actionTime = 'เมื่อสักครู่นี้'
  leaveRequest.value.rejectReason = undefined
  addToast('success', 'อนุมัติสำเร็จ', 'อนุมัติใบคำร้องเรียบร้อยแล้ว')
}

const openApproveConfirmModal = () => {
  if (!leaveRequest.value || leaveRequest.value.status !== 'pending') return
  openApproveConfirm.value = true
}

const closeApproveConfirmModal = () => {
  openApproveConfirm.value = false
}

const confirmApprove = () => {
  approveRequest()
  closeApproveConfirmModal()
}

const openRejectModal = () => {
  rejectReason.value = ''
  openReject.value = true
}

const closeRejectModal = () => {
  openReject.value = false
  rejectReason.value = ''
}

const submitReject = () => {
  if (!leaveRequest.value || leaveRequest.value.status !== 'pending') return
  if (!rejectReason.value.trim()) {
    addToast('warning', 'ยังไม่กรอกเหตุผล', 'กรุณาระบุเหตุผลก่อนยืนยันไม่อนุมัติ')
    return
  }

  leaveRequest.value.status = 'rejected'
  leaveRequest.value.rejectReason = rejectReason.value.trim()
  leaveRequest.value.actionTime = 'เมื่อสักครู่นี้'
  closeRejectModal()
  addToast('info', 'ไม่อนุมัติเรียบร้อย', 'ระบบบันทึกเหตุผลและแจ้งกลับผู้ยื่นคำขอแล้ว')
}
</script>