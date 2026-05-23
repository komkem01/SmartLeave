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
                <span class="text-3xs font-semibold text-slate-500 tracking-wider uppercase">โรงเรียนสะอาดประชาสรรพ์</span>
              </div>
            </div>
          </div>

          <!-- ข้อมูลผู้ใช้งาน ผอ. -->
          <div class="flex items-center gap-4">
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
      </div>
    </nav>

    <!-- เนื้อหาหลัก (Main Content Area) -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div v-if="isLoading" class="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
        กำลังโหลดข้อมูลแดชบอร์ดจากระบบจริง...
      </div>
      
      <!-- ส่วนต้อนรับและสรุปสถิติด่วน (Welcome & Quick Stats) -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <!-- ยอดรอพิจารณา -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div class="space-y-1">
            <span class="text-xs font-bold text-amber-600 uppercase tracking-wider">รอพิจารณา</span>
            <p class="text-3xl font-black text-slate-900">{{ pendingRequestsCount }} <span class="text-sm font-semibold text-slate-400">ใบ</span></p>
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
            <p class="text-xs text-slate-400">จากบุคลากรทั้งหมด {{ totalMembers }} คน</p>
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
          <div class="flex flex-wrap items-center gap-2">
            <NuxtLink
              to="/director/leave-type"
              class="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              จัดการประเภทการลา
            </NuxtLink>
            <NuxtLink
              to="/director/leave-request-approve"
              class="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors"
            >
              ไปหน้าพิจารณาใบลาทั้งหมด
            </NuxtLink>
          </div>
        </div>

        <!-- กรณีไม่มีใบลาค้างพิจารณา -->
        <div v-if="pendingRequests.length === 0" class="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div class="w-16 h-16 bg-slate-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="font-bold text-slate-800">ไม่มีใบลาคงค้าง</h3>
          <p class="text-sm text-slate-400">ใบคำร้องขอลาทั้งหมดของโรงเรียนสะอาดประชาสรรพ์ได้รับการพิจารณาครบถ้วนแล้ว</p>
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
                :disabled="isActionLoading"
                class="px-5 py-2 rounded-xl text-xs font-bold text-white"
                :class="[
                  confirmActionType === 'approve' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-rose-600 hover:bg-rose-700',
                  isActionLoading ? 'opacity-60 cursor-not-allowed' : ''
                ]"
              >
                {{ isActionLoading ? 'กำลังบันทึก...' : (confirmActionType === 'approve' ? 'ยืนยันอนุมัติ' : 'ยืนยันปฏิเสธ') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const { addToast } = useToast()
const config = useRuntimeConfig()
const BASE = config.public.BASE_API

type LeaveStatus = 'pending' | 'approved' | 'rejected'
type LeaveTypeKey = 'sick' | 'personal' | 'vacation' | 'other'

interface LeaveRequest {
  id: string
  prefix: string
  firstName: string
  lastName: string
  department: string
  type: LeaveTypeKey
  dateString: string
  totalDays: number
  reason: string
  attachmentUrl?: string
  status: LeaveStatus
  actionTime?: string
  rejectReason?: string
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
  reject_reason?: string
  created_at: string
  updated_at: string
}

interface ApiMember {
  id: string
  firstname: string
  lastname: string
  department?: string
}

interface ApiLeaveType {
  id: string
  name: string
}

interface ApiCurrentUser {
  firstname?: string
  lastname?: string
  role?: string
}

interface ApiDashboardSummary {
  pending_requests: number
  active_leaves_today: number
  approved_this_month: number
  attendance_rate: number
  total_members: number
}

definePageMeta({
  middleware: ['require-auth'],
})

const isLoading = ref(false)
const isActionLoading = ref(false)

const pendingRequestsCount = ref<number>(0)
const activeLeavesToday = ref<number>(0)
const approvedThisMonth = ref<number>(0)
const attendanceRate = ref<number>(0)
const totalMembers = ref<number>(0)

const filterStatus = ref<'all' | 'approved' | 'rejected'>('all')
const pendingRequests = ref<LeaveRequest[]>([])
const actionedHistory = ref<LeaveRequest[]>([])

const openReject = ref<boolean>(false)
const rejectReasonText = ref<string>('')
const selectedReqForReject = ref<LeaveRequest | null>(null)
const openConfirm = ref<boolean>(false)
const confirmActionType = ref<'approve' | 'reject' | null>(null)
const confirmReq = ref<LeaveRequest | null>(null)
const previewLimit = 2

const memberMap = ref<Record<string, ApiMember>>({})
const leaveTypeMap = ref<Record<string, ApiLeaveType>>({})
const currentUser = ref<ApiCurrentUser | null>(null)

const headerDisplayName = computed(() => {
  const first = currentUser.value?.firstname?.trim() || ''
  const last = currentUser.value?.lastname?.trim() || ''
  const fullName = `${first} ${last}`.trim()
  return fullName ? `ผอ.${fullName}` : 'ผู้อำนวยการ'
})

const headerInitials = computed(() => {
  const first = currentUser.value?.firstname?.trim() || ''
  const last = currentUser.value?.lastname?.trim() || ''
  const a = first.charAt(0)
  const b = last.charAt(0)
  const initials = `${a}${b}`.trim()
  return initials || 'ผอ'
})

const previewPendingRequests = computed<LeaveRequest[]>(() => pendingRequests.value.slice(0, previewLimit))

const filteredHistory = computed<LeaveRequest[]>(() => {
  if (filterStatus.value === 'all') return actionedHistory.value
  return actionedHistory.value.filter((item) => item.status === filterStatus.value)
})

const monthShortTH = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']

const formatDisplayDate = (dateText: string) => {
  const d = new Date(dateText)
  if (Number.isNaN(d.getTime())) return dateText
  return `${d.getDate()} ${monthShortTH[d.getMonth()]} ${d.getFullYear()}`
}

const formatDisplayDateTime = (dateText: string) => {
  const d = new Date(dateText)
  if (Number.isNaN(d.getTime())) return dateText
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${d.getDate()} ${monthShortTH[d.getMonth()]} ${d.getFullYear()}, ${hh}:${mm} น.`
}

const toLeaveTypeKey = (leaveTypeName?: string): LeaveTypeKey => {
  const text = (leaveTypeName || '').toLowerCase()
  if (text.includes('ป่วย') || text.includes('sick')) return 'sick'
  if (text.includes('กิจ') || text.includes('personal')) return 'personal'
  if (text.includes('พักผ่อน') || text.includes('vacation')) return 'vacation'
  return 'other'
}

const mapLeaveRequest = (item: ApiLeaveRequest): LeaveRequest => {
  const member = memberMap.value[item.member_id]
  const leaveType = leaveTypeMap.value[item.leave_type_id]
  const typeKey = toLeaveTypeKey(leaveType?.name)
  const dateString = item.start_date === item.end_date
    ? formatDisplayDate(item.start_date)
    : `${formatDisplayDate(item.start_date)} - ${formatDisplayDate(item.end_date)}`

  return {
    id: item.id,
    prefix: '',
    firstName: member?.firstname || 'ไม่ทราบชื่อ',
    lastName: member?.lastname || '',
    department: member?.department || 'ไม่ระบุกลุ่มสาระ',
    type: typeKey,
    dateString,
    totalDays: item.total_days,
    reason: item.reason,
    status: item.status,
    actionTime: item.approved_at ? formatDisplayDateTime(item.approved_at) : formatDisplayDateTime(item.updated_at),
    rejectReason: item.reject_reason,
  }
}

const fetchReferenceData = async () => {
  const [membersRes, leaveTypesRes] = await Promise.all([
    $fetch<any>(`${BASE}/member`),
    $fetch<any>(`${BASE}/system/leave-type`),
  ])

  const members = (membersRes?.data ?? []) as ApiMember[]
  const leaveTypes = (leaveTypesRes?.data ?? []) as ApiLeaveType[]

  memberMap.value = members.reduce<Record<string, ApiMember>>((acc, m) => {
    acc[m.id] = m
    return acc
  }, {})

  leaveTypeMap.value = leaveTypes.reduce<Record<string, ApiLeaveType>>((acc, lt) => {
    acc[lt.id] = lt
    return acc
  }, {})
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

const computeStats = (allRequests: ApiLeaveRequest[]) => {
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)

  const todayApproved = allRequests.filter((req) => {
    if (req.status !== 'approved') return false
    const start = new Date(req.start_date)
    const end = new Date(req.end_date)
    return !Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && start <= endOfToday && end >= startOfToday
  }).length

  const approvedThisMonthCount = allRequests.filter((req) => {
    if (req.status !== 'approved') return false
    const actionAt = req.approved_at ? new Date(req.approved_at) : new Date(req.updated_at)
    return !Number.isNaN(actionAt.getTime()) && actionAt.getMonth() === now.getMonth() && actionAt.getFullYear() === now.getFullYear()
  }).length

  const memberCount = Object.keys(memberMap.value).length
  const attendance = memberCount > 0 ? Math.max(0, ((memberCount - todayApproved) / memberCount) * 100) : 0

  activeLeavesToday.value = todayApproved
  approvedThisMonth.value = approvedThisMonthCount
  attendanceRate.value = Number(attendance.toFixed(1))
  totalMembers.value = memberCount
  pendingRequestsCount.value = allRequests.filter((req) => req.status === 'pending').length
}

const fetchDashboardSummary = async (): Promise<boolean> => {
  try {
    const summaryRes = await $fetch<any>(`${BASE}/dashboard/summary`)
    const summary = (summaryRes?.data ?? null) as ApiDashboardSummary | null
    if (!summary) return false

    pendingRequestsCount.value = Number(summary.pending_requests || 0)
    activeLeavesToday.value = Number(summary.active_leaves_today || 0)
    approvedThisMonth.value = Number(summary.approved_this_month || 0)
    attendanceRate.value = Number(summary.attendance_rate || 0)
    totalMembers.value = Number(summary.total_members || 0)
    return true
  } catch {
    return false
  }
}

const fetchDashboardData = async () => {
  isLoading.value = true
  try {
    await Promise.all([fetchCurrentUser(), fetchReferenceData()])
    const leaveRes = await $fetch<any>(`${BASE}/leave-request`)
    const allRequests = (leaveRes?.data ?? []) as ApiLeaveRequest[]

    pendingRequests.value = allRequests
      .filter((item) => item.status === 'pending')
      .map(mapLeaveRequest)

    actionedHistory.value = allRequests
      .filter((item) => item.status === 'approved' || item.status === 'rejected')
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .map(mapLeaveRequest)

    const hasSummary = await fetchDashboardSummary()
    if (!hasSummary) {
      computeStats(allRequests)
    }
  } catch (error) {
    addToast('error', 'โหลดข้อมูลไม่สำเร็จ', 'ไม่สามารถดึงข้อมูลแดชบอร์ดได้ กรุณาลองใหม่อีกครั้ง')
  } finally {
    isLoading.value = false
  }
}

const getLeaveTypeText = (type: LeaveTypeKey) => {
  if (type === 'sick') return 'ลาป่วย'
  if (type === 'personal') return 'ลากิจ'
  if (type === 'vacation') return 'ลาพักผ่อน'
  return 'ลาอื่นๆ'
}

const getLeaveTypeClass = (type: LeaveTypeKey) => {
  if (type === 'sick') return 'text-emerald-600 bg-emerald-50'
  if (type === 'personal') return 'text-amber-600 bg-amber-50'
  if (type === 'vacation') return 'text-blue-600 bg-blue-50'
  return 'text-slate-600 bg-slate-100'
}

const viewAttachment = (fileName: string) => {
  addToast('info', 'เปิดไฟล์แนบ', `ยังไม่มีไฟล์แนบจริงสำหรับรายการนี้: ${fileName}`)
}

const openApproveConfirm = (req: LeaveRequest) => {
  confirmReq.value = req
  confirmActionType.value = 'approve'
  openConfirm.value = true
}

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
  if (!selectedReqForReject.value || !rejectReasonText.value.trim()) {
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

const updateLeaveStatus = async (id: string, status: LeaveStatus, rejectReason?: string) => {
  isActionLoading.value = true
  try {
    const token = import.meta.client ? localStorage.getItem('smartleave:access_token') : ''
    await $fetch(`${BASE}/leave-request/${id}`, {
      method: 'PATCH',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: {
        status,
        reject_reason: rejectReason || '',
      },
    })

    await fetchDashboardData()
  } finally {
    isActionLoading.value = false
  }
}

const confirmAction = async () => {
  if (!confirmReq.value || !confirmActionType.value || isActionLoading.value) return

  try {
    if (confirmActionType.value === 'approve') {
      await updateLeaveStatus(confirmReq.value.id, 'approved')
      addToast('success', 'อนุมัติใบลาสำเร็จ', `อนุมัติใบลาของ "${confirmReq.value.firstName}" เรียบร้อยแล้ว`)
    } else {
      const reason = rejectReasonText.value.trim()
      if (!reason) {
        addToast('warning', 'ยังไม่กรอกเหตุผล', 'กรุณาระบุเหตุผลก่อนยืนยันการปฏิเสธ')
        return
      }
      await updateLeaveStatus(confirmReq.value.id, 'rejected', reason)
      addToast('info', 'ปฏิเสธใบคำร้องเรียบร้อย', `ส่งผลปฏิเสธใบคำขอของ "${confirmReq.value.firstName}" พร้อมเหตุผลแล้ว`)
      closeRejectModal()
    }
  } catch (error) {
    addToast('error', 'อัปเดตสถานะไม่สำเร็จ', 'ไม่สามารถบันทึกผลการพิจารณาได้ กรุณาลองใหม่อีกครั้ง')
  } finally {
    closeConfirmModal()
  }
}

onMounted(() => {
  fetchDashboardData()
})
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