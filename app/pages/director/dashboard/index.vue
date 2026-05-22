<template>
  <div class="min-h-screen bg-slate-50 font-sans antialiased">
    
    <!-- แถบนำทางด้านบน (Navigation Bar) -->
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <span class="text-lg font-bold text-slate-950 block leading-tight">SmartLeave</span>
                <span class="text-3xs font-semibold text-slate-500 tracking-wider uppercase">โรงเรียนสะอาดประชาสรร</span>
              </div>
            </div>
          </div>

          <!-- ข้อมูลผู้ใช้งาน ผอ. -->
          <div class="flex items-center gap-4">
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
      </div>
    </nav>

    <!-- เนื้อหาหลัก (Main Content Area) -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- ส่วนต้อนรับและสรุปสถิติด่วน (Welcome & Quick Stats) -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <!-- ยอดรอพิจารณา -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div class="space-y-1">
            <span class="text-xs font-bold text-amber-600 uppercase tracking-wider">รอพิจารณา</span>
            <p class="text-3xl font-black text-slate-900">{{ pendingRequests.length }} <span class="text-sm font-semibold text-slate-400">ใบ</span></p>
            <p class="text-xs text-slate-400">ต้องการการอนุมัติเร่งด่วน</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <!-- ครูลาหยุดวันนี้ -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div class="space-y-1">
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">ลาหยุดวันนี้</span>
            <p class="text-3xl font-black text-slate-900">{{ activeLeavesToday }} <span class="text-sm font-semibold text-slate-400">คน</span></p>
            <p class="text-xs text-slate-400">จากบุคลากรทั้งหมด 48 คน</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>

        <!-- สถิติผ่านการอนุมัติเดือนนี้ -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div class="space-y-1">
            <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">อนุมัติแล้วเดือนนี้</span>
            <p class="text-3xl font-black text-slate-900">{{ approvedThisMonth }} <span class="text-sm font-semibold text-slate-400">ใบ</span></p>
            <p class="text-xs text-slate-400">ลงบันทึกในประวัติเรียบร้อย</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <!-- เปอร์เซ็นต์อัตราการมาทำงาน -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div class="space-y-1">
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">อัตราการปฏิบัติงาน</span>
            <p class="text-3xl font-black text-slate-900">{{ attendanceRate }}%</p>
            <p class="text-xs text-slate-400">อยู่ในเกณฑ์ดีเยี่ยม</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>

      </div>

      <!-- ส่วนจัดการคำขออนุมัติการลา (Leave Approvals Section) -->
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 class="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <span class="w-1.5 h-4 bg-blue-600 rounded-full"></span>
            ใบลาค้างพิจารณาอนุมัติ
          </h2>
          <NuxtLink
            to="/director/leave-request-approve"
            class="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors"
          >
            ไปหน้าพิจารณาใบลาทั้งหมด
          </NuxtLink>
        </div>

        <!-- กรณีไม่มีใบลาค้างพิจารณา -->
        <div v-if="pendingRequests.length === 0" class="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div class="w-16 h-16 bg-slate-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="font-bold text-slate-800">ไม่มีใบลาคงค้าง</h3>
          <p class="text-sm text-slate-400">ใบคำร้องขอลาทั้งหมดของโรงเรียนสะอาดประชาสรรได้รับการพิจารณาครบถ้วนแล้ว</p>
        </div>

        <!-- รายการใบคำขอลาแบบการ์ด -->
        <div v-else class="grid grid-cols-1 gap-4">
          <div 
            v-for="req in previewPendingRequests" 
            :key="req.id"
            class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <!-- ฝั่งซ้าย: ข้อมูลผู้ขอลา และรายละเอียดการลา -->
            <div class="flex gap-4 items-start">
              <div class="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-base flex-shrink-0">
                {{ req.firstName.charAt(0) }}{{ req.lastName.charAt(0) }}
              </div>
              <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="font-bold text-slate-900 text-base">
                    {{ req.prefix }}{{ req.firstName }} {{ req.lastName }}
                  </span>
                  <span class="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-lg font-medium">
                    {{ req.department }}
                  </span>
                  <span class="text-xs px-2 py-0.5 rounded-md font-semibold" :class="getLeaveTypeClass(req.type)">
                    {{ getLeaveTypeText(req.type) }}
                  </span>
                </div>
                <p class="text-sm text-slate-700 font-medium">
                  ประสงค์ขอลาหยุดวันที่: <span class="text-slate-900 font-semibold">{{ req.dateString }}</span>
                </p>
                <p class="text-xs text-slate-500 leading-relaxed max-w-xl">
                  <span class="font-bold text-slate-600">เหตุผลการลา:</span> {{ req.reason }}
                </p>
                <!-- แนบไฟล์หลักฐาน (ถ้ามี) -->
                <div v-if="req.attachmentUrl" class="pt-2">
                  <a 
                    href="#" 
                    @click.prevent="viewAttachment(req.attachmentUrl)"
                    class="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-500 font-semibold transition-colors"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    เปิดดูไฟล์แนบ ({{ req.attachmentUrl }})
                  </a>
                </div>
              </div>
            </div>

            <!-- ฝั่งขวา: จำนวนวัน และปุ่มดำเนินการ -->
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-end">
              <div class="text-left sm:text-right pr-4 sm:border-r border-slate-100 flex-shrink-0">
                <span class="text-3xs font-bold text-slate-400 uppercase tracking-wider block">จำนวนวันลา</span>
                <span class="text-2xl font-black text-slate-900">
                  {{ req.totalDays }} <span class="text-sm font-semibold text-slate-500">วัน</span>
                </span>
              </div>
              
              <div class="flex gap-2 w-full sm:w-auto flex-shrink-0">
                <button 
                  @click="openRejectModal(req)"
                  class="flex-1 sm:flex-none px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs transition-colors duration-150 border border-rose-200"
                >
                  ปฏิเสธใบลา
                </button>
                <button 
                  @click="openApproveConfirm(req)"
                  class="flex-1 sm:flex-none px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all duration-150 shadow-md shadow-blue-500/10"
                >
                  อนุมัติใบลา
                </button>
              </div>
            </div>

          </div>

          <div
            v-if="pendingRequests.length > previewPendingRequests.length"
            class="rounded-2xl border border-slate-200 bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <p class="text-sm text-slate-600">
              แสดงแล้ว {{ previewPendingRequests.length }} จาก {{ pendingRequests.length }} รายการ
            </p>
            <NuxtLink
              to="/director/leave-request-approve"
              class="inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              ดูรายการค้างพิจารณาทั้งหมด
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- ตารางประวัติการตรวจสอบล่าสุด (Recently Actioned Requests) -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 class="text-lg font-bold text-slate-900">ประวัติการพิจารณาใบลาล่าสุด</h2>
            <p class="text-xs text-slate-400 mt-0.5">ประวัติการตัดสินอนุมัติ/ปฏิเสธใบลาของคุณครูในโรงเรียน</p>
          </div>
          <!-- ส่วนค้นหาและกรองแบบมินิมอล -->
          <div class="flex gap-2">
            <select
              v-model="filterStatus"
              class="rounded-xl border border-slate-300 px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10"
            >
              <option value="all">แสดงทั้งหมด</option>
              <option value="approved">อนุมัติแล้ว</option>
              <option value="rejected">ปฏิเสธแล้ว</option>
            </select>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 text-slate-400 text-xs font-sans uppercase tracking-wide border-b border-slate-100">
                <th class="py-3 px-6">ชื่อคุณครู</th>
                <th class="py-3 px-6">กลุ่มสาระฯ</th>
                <th class="py-3 px-6">ประเภทการลา</th>
                <th class="py-3 px-6">วันที่ขอลา</th>
                <th class="py-3 px-6">จำนวนวัน</th>
                <th class="py-3 px-6">สถานะ</th>
                <th class="py-3 px-6">วันที่ดำเนินการ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
              <tr 
                v-for="req in filteredHistory" 
                :key="req.id" 
                class="hover:bg-slate-50/50 transition-colors"
              >
                <td class="py-4 px-6 font-semibold text-slate-900">
                  {{ req.prefix }}{{ req.firstName }} {{ req.lastName }}
                </td>
                <td class="py-4 px-6 text-slate-500">{{ req.department }}</td>
                <td class="py-4 px-6">
                  <span class="text-xs font-semibold" :class="getLeaveTypeClass(req.type)">
                    {{ getLeaveTypeText(req.type) }}
                  </span>
                </td>
                <td class="py-4 px-6 text-slate-500">{{ req.dateString }}</td>
                <td class="py-4 px-6 font-semibold">{{ req.totalDays }} วัน</td>
                <td class="py-4 px-6">
                  <span 
                    class="px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1"
                    :class="req.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'"
                  >
                    <span class="w-1.5 h-1.5 rounded-full" :class="req.status === 'approved' ? 'bg-emerald-500' : 'bg-rose-500'"></span>
                    {{ req.status === 'approved' ? 'อนุมัติแล้ว' : 'ปฏิเสธ' }}
                  </span>
                </td>
                <td class="py-4 px-6 text-xs text-slate-400 font-medium">
                  {{ req.actionTime }}
                </td>
              </tr>
              <tr v-if="filteredHistory.length === 0">
                <td colspan="7" class="py-8 text-center text-slate-400 italic">
                  ไม่พบข้อมูลตามที่กรองไว้
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>

    <!-- ==================== MODAL: ปฏิเสธใบลาและระบุเหตุผล (Reject Modal) ==================== -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="openReject" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- ฉากหลังสีทึบ -->
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeRejectModal"></div>
        
        <!-- ตัวกล่องฟอร์มคำขอ -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden relative z-10">
          <div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 class="text-base font-bold text-slate-950">ปฏิเสธใบคำร้องขอลา</h3>
            <button @click="closeRejectModal" class="text-slate-400 hover:text-slate-600 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="openRejectConfirm" class="p-6 space-y-4">
            <div>
              <p class="text-sm text-slate-600 mb-2">
                ใบลาของ: <span class="font-bold text-slate-900">{{ selectedReqForReject?.prefix }}{{ selectedReqForReject?.firstName }} {{ selectedReqForReject?.lastName }}</span>
              </p>
              <label for="rejectReason" class="block text-xs font-semibold text-slate-700">
                ระบุเหตุผลการไม่อนุมัติใบลา <span class="text-rose-500">*</span>
              </label>
              <textarea 
                id="rejectReason"
                v-model="rejectReasonText"
                required
                rows="3"
                placeholder="เช่น เนื่องจากมีภารกิจคุมสอบที่สำคัญในวันดังกล่าว และไม่มีผู้สลับเวรแทน..."
                class="mt-1.5 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 resize-none transition-all duration-155"
              ></textarea>
            </div>

            <!-- ส่งคำขอปฏิเสธ -->
            <div class="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button 
                type="button" 
                class="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                @click="closeRejectModal"
              >
                ยกเลิก
              </button>
              <button 
                type="submit"
                class="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md shadow-rose-500/10 transition-colors"
              >
                ยืนยันการปฏิเสธ
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- ==================== MODAL: ยืนยันการดำเนินการ ==================== -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="openConfirm" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeConfirmModal"></div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-sm overflow-hidden relative z-10">
          <div class="px-6 py-5 border-b border-slate-100 bg-slate-50">
            <h3 class="text-base font-bold text-slate-900">ยืนยันการดำเนินการ</h3>
          </div>

          <div class="p-6 space-y-4">
            <p class="text-sm text-slate-700">
              <span v-if="confirmActionType === 'approve'">
                ยืนยันอนุมัติใบลาของ
                <span class="font-bold text-slate-900">{{ confirmReq?.prefix }}{{ confirmReq?.firstName }} {{ confirmReq?.lastName }}</span>
                ใช่หรือไม่?
              </span>
              <span v-else>
                ยืนยันปฏิเสธใบลาของ
                <span class="font-bold text-slate-900">{{ confirmReq?.prefix }}{{ confirmReq?.firstName }} {{ confirmReq?.lastName }}</span>
                ใช่หรือไม่?
              </span>
            </p>

            <div class="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                @click="closeConfirmModal"
                class="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                @click="confirmAction"
                class="px-5 py-2 rounded-xl text-xs font-bold text-white"
                :class="confirmActionType === 'approve' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-rose-600 hover:bg-rose-700'"
              >
                {{ confirmActionType === 'approve' ? 'ยืนยันอนุมัติ' : 'ยืนยันปฏิเสธ' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { addToast } = useToast()

// โครงสร้างประเภทข้อมูล (TypeScript Interfaces)
interface LeaveRequest {
  id: number
  prefix: string
  firstName: string
  lastName: string
  department: string
  type: 'sick' | 'personal' | 'vacation'
  dateString: string
  totalDays: number
  reason: string
  attachmentUrl?: string
  status: 'pending' | 'approved' | 'rejected'
  actionTime?: string
  rejectReason?: string
}

definePageMeta({
  middleware: ["require-auth"],
});

// ข้อมูลจำลองสถิติภาพรวม
const activeLeavesToday = ref<number>(2)
const approvedThisMonth = ref<number>(14)
const attendanceRate = ref<number>(95.8)

// ฟิลเตอร์คัดเลือกประวัติ
const filterStatus = ref<'all' | 'approved' | 'rejected'>('all')

// รายการใบลาที่ส่งเข้ามาค้างพิจารณา (Pending Approvals)
const pendingRequests = ref<LeaveRequest[]>([
  {
    id: 101,
    prefix: 'นาง',
    firstName: 'สมศรี',
    lastName: 'ดีใจ',
    department: 'กลุ่มสาระการเรียนรู้คณิตศาสตร์',
    type: 'personal',
    dateString: '26 พ.ค. 2026 - 28 พ.ค. 2026',
    totalDays: 3,
    reason: 'มีธุระด่วนในการเดินทางไปทำนิติกรรมมรดกที่ต่างจังหวัด ร่วมกับครอบครัว',
    status: 'pending'
  },
  {
    id: 102,
    prefix: 'นาย',
    firstName: 'มานะ',
    lastName: 'ขยันสอน',
    department: 'กลุ่มสาระการเรียนรู้ภาษาไทย',
    type: 'sick',
    dateString: '25 พ.ค. 2026',
    totalDays: 1,
    reason: 'มีอาการเป็นไข้หวัดใหญ่ ปวดศีรษะรุนแรง และเสียงแหบแห้ง ไม่สามารถปฏิบัติการสอนได้ตามปกติ',
    attachmentUrl: 'medical-certificate.pdf',
    status: 'pending'
  }
])

// รายการประวัติใบลาที่ผ่านการตรวจสอบแล้ว (Actioned Leaves History)
const actionedHistory = ref<LeaveRequest[]>([
  {
    id: 50,
    prefix: 'นางสาว',
    firstName: 'มณฑา',
    lastName: 'เพียรเรียน',
    department: 'กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ',
    type: 'vacation',
    dateString: '12 พ.ค. 2026 - 15 พ.ค. 2026',
    totalDays: 4,
    reason: 'ลาพักผ่อนต่างจังหวัดร่วมกับครอบครัวประจำปี',
    status: 'approved',
    actionTime: '10 พ.ค. 2026, 09:15 น.'
  },
  {
    id: 49,
    prefix: 'นาย',
    firstName: 'เกรียงไกร',
    lastName: 'พละดี',
    department: 'สุขศึกษาและพลศึกษา',
    type: 'personal',
    dateString: '02 พ.ค. 2026',
    totalDays: 1,
    reason: 'พาสมาชิกในครอบครัวไปพบแพทย์ตามนัดที่โรงพยาบาลศูนย์ประจำจังหวัด',
    status: 'approved',
    actionTime: '30 เม.ย. 2026, 16:45 น.'
  },
  {
    id: 48,
    prefix: 'นาง',
    firstName: 'อุษา',
    lastName: 'วาดศิลป์',
    department: 'กลุ่มสาระการเรียนรู้ศิลปะ',
    type: 'vacation',
    dateString: '15 เม.ย. 2026',
    totalDays: 1,
    reason: 'ทำกิจธุระส่วนตัวที่กรุงเทพมหานคร',
    status: 'rejected',
    rejectReason: 'เนื่องจากมีตารางเวรคุมสอบปลายภาคเรียนพอดียากจะหาผู้ทดแทนได้ในวันทำการนั้น',
    actionTime: '12 เม.ย. 2026, 11:30 น.'
  }
])

// ตัวแปรควบคุม Modal ปฏิเสธการลา
const openReject = ref<boolean>(false)
const rejectReasonText = ref<string>('')
const selectedReqForReject = ref<LeaveRequest | null>(null)
const openConfirm = ref<boolean>(false)
const confirmActionType = ref<'approve' | 'reject' | null>(null)
const confirmReq = ref<LeaveRequest | null>(null)
const previewLimit = 2

const previewPendingRequests = computed<LeaveRequest[]>(() => {
  return pendingRequests.value.slice(0, previewLimit)
})

// ตัวคัดกรองรายการตารางตามเงื่อนไข (Filtered History)
const filteredHistory = computed<LeaveRequest[]>(() => {
  if (filterStatus.value === 'all') {
    return actionedHistory.value
  }
  return actionedHistory.value.filter(item => item.status === filterStatus.value)
})

// ฟังก์ชันแปลงข้อความภาษาไทยประเภทการลา
const getLeaveTypeText = (type: string) => {
  if (type === 'sick') return 'ลาป่วย'
  if (type === 'personal') return 'ลากิจ'
  if (type === 'vacation') return 'ลาพักผ่อน'
  return type
}

// สไตล์ประเภทการลา
const getLeaveTypeClass = (type: string) => {
  switch (type) {
    case 'sick': return 'text-emerald-600 bg-emerald-50'
    case 'personal': return 'text-amber-600 bg-amber-50'
    default: return 'text-blue-600 bg-blue-50'
  }
}

// ฟังก์ชันจำลองเปิดไฟล์แนบ
const viewAttachment = (fileName: string) => {
  addToast('info', 'เปิดไฟล์แนบ', `จำลองการเปิดดูไฟล์เอกสาร: ${fileName}`)
}

// ฟังก์ชันสำหรับ อนุมัติใบคำขอลา
const approveRequest = (id: number) => {
  const req = pendingRequests.value.find(p => p.id === id)
  if (!req) return

  // อัปเดตสถานะและข้อมูลการกระทำ
  req.status = 'approved'
  req.actionTime = 'เมื่อสักครู่นี้'

  // ย้ายยัดเข้าตารางประวัติย้อนหลัง
  actionedHistory.value.unshift({ ...req })

  // นำออกจากรายการค้างพิจารณา
  pendingRequests.value = pendingRequests.value.filter(p => p.id !== id)

  // อัปเดตสถิติด้านบนแบบเรียลไทม์
  approvedThisMonth.value++
  activeLeavesToday.value++

  addToast('success', 'อนุมัติใบลาสำเร็จ', `อนุมัติใบลาของ "${req.prefix}${req.firstName} ${req.lastName}" และส่งผลกลับไปยังคุณครูแล้ว`)
}

const openApproveConfirm = (req: LeaveRequest) => {
  confirmReq.value = req
  confirmActionType.value = 'approve'
  openConfirm.value = true
}

// ฟังก์ชันเปิด Modal สำหรับปฏิเสธใบคำขอลา
const openRejectModal = (req: LeaveRequest) => {
  selectedReqForReject.value = req
  rejectReasonText.value = ''
  openReject.value = true
}

const closeRejectModal = () => {
  openReject.value = false
  selectedReqForReject.value = null
  rejectReasonText.value = ''
}

const openRejectConfirm = () => {
  if (!selectedReqForReject.value || !rejectReasonText.value) {
    addToast('warning', 'ยังไม่กรอกเหตุผล', 'กรุณาระบุเหตุผลก่อนยืนยันการปฏิเสธ')
    return
  }

  confirmReq.value = selectedReqForReject.value
  confirmActionType.value = 'reject'
  openConfirm.value = true
}

const closeConfirmModal = () => {
  openConfirm.value = false
  confirmActionType.value = null
  confirmReq.value = null
}

// กดยืนยันจาก Modal เพื่อดำเนินการปฏิเสธใบลา
const submitReject = () => {
  if (!selectedReqForReject.value || !rejectReasonText.value) {
    addToast('warning', 'ยังไม่กรอกเหตุผล', 'กรุณาระบุเหตุผลก่อนยืนยันการปฏิเสธ')
    return
  }

  const req = selectedReqForReject.value
  
  // อัปเดตสถานะ ปฏิเสธการลา
  req.status = 'rejected'
  req.rejectReason = rejectReasonText.value
  req.actionTime = 'เมื่อสักครู่นี้'

  // บันทึกเข้าประวัติ
  actionedHistory.value.unshift({ ...req })

  // ถอดออกจากรายการที่รอพิจารณา
  pendingRequests.value = pendingRequests.value.filter(p => p.id !== req.id)

  addToast('info', 'ปฏิเสธใบคำร้องเรียบร้อย', `ส่งผลปฏิเสธใบคำขอลาของคุณครู "${req.firstName}" พร้อมเหตุผลแล้ว`)
  closeRejectModal()
}

const confirmAction = () => {
  if (!confirmReq.value || !confirmActionType.value) return

  if (confirmActionType.value === 'approve') {
    approveRequest(confirmReq.value.id)
  }
  else {
    submitReject()
  }

  closeConfirmModal()
}
</script>

<style scoped>
/* การสไลด์ขึ้นและจางหายของเนื้อหา */
.animate-fade-in {
  animation: fadeIn 0.22s ease-out forwards;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}
</style>