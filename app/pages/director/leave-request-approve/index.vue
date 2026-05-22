<template>
  <div class="min-h-screen bg-slate-50 font-sans antialiased">
    <!-- แถบนำทางด้านบน (Navigation Bar) -->
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <span
                  class="text-lg font-bold text-slate-950 block leading-tight"
                  >SmartLeave</span
                >
                <span
                  class="text-3xs font-semibold text-slate-500 tracking-wider uppercase"
                  >โรงเรียนสะอาดประชาสรรค์</span
                >
              </div>
            </div>
          </div>

          <!-- ข้อมูลผู้ใช้งาน ผอ. -->
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-3">
              <div class="hidden md:block text-right">
                <p class="text-sm font-bold text-slate-800">ผอ.วันชัย ใจดี</p>
                <p
                  class="text-3xs text-slate-500 font-semibold tracking-wider uppercase"
                >
                  ผู้อำนวยการสถานศึกษา
                </p>
              </div>
              <div
                class="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-blue-700"
              >
                วช
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- คอนเทนต์หลัก -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <!-- ส่วนหัวของหน้าเพจ (Page Header) -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 class="text-2xl font-extrabold text-slate-950">
            ทะเบียนใบคำร้องขอลาของครู
          </h1>
          <p class="text-sm text-slate-500 mt-1">
            ตรวจสอบ ค้นหา และพิจารณาอนุมัติใบคำร้องขอลาของบุคลากรทั้งหมด
          </p>
        </div>
        <div class="flex items-center gap-2">
          <NuxtLink
            to="/director/dashboard"
            class="inline-flex items-center gap-1.5 text-xs bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg font-semibold transition-colors"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            ย้อนกลับ
          </NuxtLink>
          <div
            class="flex items-center gap-2 text-xs bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg font-semibold"
          >
            จำนวนบุคลากรทั้งหมดในระบบ: 48 คน
          </div>
        </div>
      </div>

      <!-- ส่วนตัวกรองข้อมูลอัจฉริยะ (Smart Filter Bar) -->
      <div
        class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- ค้นหาด้วยชื่อจริง-นามสกุล -->
          <div class="relative">
            <label
              class="block text-2xs font-bold text-slate-400 uppercase tracking-wider mb-1.5"
              >ค้นหาชื่อบุคลากร</label
            >
            <div class="relative rounded-md shadow-sm">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-4 w-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="พิมพ์ชื่อหรือนามสกุลครู..."
                class="block w-full rounded-xl border border-slate-300 pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <!-- ตัวกรอง: กลุ่มสาระฯ -->
          <div>
            <label
              class="block text-2xs font-bold text-slate-400 uppercase tracking-wider mb-1.5"
              >กลุ่มสาระ / ฝ่ายงาน</label
            >
            <select
              v-model="filterDept"
              class="block w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10"
            >
              <option value="all">แสดงทุกกลุ่มสาระฯ</option>
              <option value="คณิตศาสตร์">คณิตศาสตร์</option>
              <option value="วิทยาศาสตร์และเทคโนโลยี">
                วิทยาศาสตร์และเทคโนโลยี
              </option>
              <option value="ภาษาไทย">ภาษาไทย</option>
              <option value="ภาษาต่างประเทศ">ภาษาต่างประเทศ</option>
              <option value="สุขศึกษาและพลศึกษา">สุขศึกษาและพลศึกษา</option>
            </select>
          </div>

          <!-- ตัวกรอง: ประเภทการลา -->
          <div>
            <label
              class="block text-2xs font-bold text-slate-400 uppercase tracking-wider mb-1.5"
              >ประเภทการลา</label
            >
            <select
              v-model="filterType"
              class="block w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10"
            >
              <option value="all">แสดงทุกประเภทการลา</option>
              <option value="sick">ลาป่วย (Sick)</option>
              <option value="personal">ลากิจ (Personal)</option>
              <option value="vacation">ลาพักผ่อน (Vacation)</option>
            </select>
          </div>

          <!-- ตัวกรอง: สถานะการพิจารณา -->
          <div>
            <label
              class="block text-2xs font-bold text-slate-400 uppercase tracking-wider mb-1.5"
              >สถานะใบคำขอ</label
            >
            <select
              v-model="filterStatus"
              class="block w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10"
            >
              <option value="all">แสดงทุกสถานะ</option>
              <option value="pending">รอการพิจารณา</option>
              <option value="approved">อนุมัติเรียบร้อย</option>
              <option value="rejected">ปฏิเสธใบคำร้อง</option>
            </select>
          </div>
        </div>

        <!-- ปุ่มรีเซ็ตตัวกรอง -->
        <div class="flex justify-end pt-2 border-t border-slate-100">
          <button
            @click="resetFilters"
            class="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
          >
            <svg
              class="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5"
              />
            </svg>
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      </div>

      <!-- ตารางและรายการข้อมูลหลัก (Main Requests Table) -->
      <div
        class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="bg-slate-50 text-slate-400 text-xs font-sans uppercase tracking-wide border-b border-slate-100"
              >
                <th class="py-3 px-6">ชื่อคุณครู / กลุ่มงาน</th>
                <th class="py-3 px-6">ประเภทการลา</th>
                <th class="py-3 px-6">ช่วงวันที่ขอลาหยุด</th>
                <th class="py-3 px-6 text-center">จำนวนวัน</th>
                <th class="py-3 px-6">สถานะการพิจารณา</th>
                <th class="py-3 px-6 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
              <tr
                v-for="req in filteredRequests"
                :key="req.id"
                class="hover:bg-slate-50/50 transition-colors"
              >
                <!-- ชื่อครูและกลุ่มงาน -->
                <td class="py-4 px-6">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600"
                    >
                      {{ req.firstName.charAt(0) }}
                    </div>
                    <div>
                      <p class="font-bold text-slate-900">
                        {{ req.prefix }}{{ req.firstName }} {{ req.lastName }}
                      </p>
                      <p class="text-3xs text-slate-400 font-semibold">
                        {{ req.department }}
                      </p>
                    </div>
                  </div>
                </td>

                <!-- ประเภทการลา -->
                <td class="py-4 px-6">
                  <span
                    class="text-xs font-semibold px-2.5 py-1 rounded-lg"
                    :class="getLeaveTypeClass(req.type)"
                  >
                    {{ getLeaveTypeText(req.type) }}
                  </span>
                </td>

                <!-- วันที่ลา -->
                <td class="py-4 px-6 text-slate-500 font-medium">
                  {{ req.dateString }}
                </td>

                <!-- จำนวนวัน -->
                <td class="py-4 px-6 text-center font-bold text-slate-900">
                  {{ req.totalDays }} วัน
                </td>

                <!-- สถานะ -->
                <td class="py-4 px-6">
                  <span
                    class="px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1"
                    :class="getStatusClass(req.status)"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full"
                      :class="getStatusDotClass(req.status)"
                    ></span>
                    {{ getStatusText(req.status) }}
                  </span>
                </td>

                <!-- การจัดการ (Action buttons) -->
                <td class="py-4 px-6 text-right">
                  <div class="flex items-center justify-end gap-2 flex-wrap">
                    <NuxtLink
                      :to="`/director/leave-request-approve/${req.id}`"
                      class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                    >
                      ดูรายละเอียด
                    </NuxtLink>

                    <!-- โชว์ปุ่มอนุมัติด่วนเฉพาะที่สถานะเป็น pending -->
                    <template v-if="req.status === 'pending'">
                      <button
                        @click="openApproveConfirm(req)"
                        class="px-3 py-1.5 text-xs font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        อนุมัติ
                      </button>
                      <button
                        @click="openRejectWithReason(req)"
                        class="px-3 py-1.5 text-xs font-bold rounded-lg border border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                      >
                        ปฏิเสธ
                      </button>
                    </template>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredRequests.length === 0">
                <td
                  colspan="6"
                  class="py-12 text-center text-slate-400 italic font-medium"
                >
                  ไม่พบใบคำร้องขอลาที่สอดคล้องกับตัวเลือกค้นหาของคุณ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- ==================== MODAL: ดูรายละเอียดใบลาเชิงลึก (Detail Modal) ==================== -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="openDetail"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          @click="closeDetailModal"
        ></div>

        <div
          class="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden relative z-10"
        >
          <div
            class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50"
          >
            <h3
              class="text-sm font-bold text-slate-900 uppercase tracking-wide"
            >
              รายละเอียดใบคำร้องขอลาก่อนพิจารณา
            </h3>
            <button
              @click="closeDetailModal"
              class="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="p-6 space-y-5">
            <!-- ข้อมูลโปรไฟล์ครูจำลองบนการ์ดภายใน -->
            <div
              class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div
                class="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center"
              >
                {{ selectedReq?.firstName.charAt(0) }}
              </div>
              <div>
                <p class="font-bold text-slate-900">
                  {{ selectedReq?.prefix }}{{ selectedReq?.firstName }}
                  {{ selectedReq?.lastName }}
                </p>
                <p class="text-xs text-slate-500">
                  {{ selectedReq?.department }}
                </p>
              </div>
            </div>

            <!-- ข้อมูลรายละเอียดวันเวลาและเหตุผลลา -->
            <div class="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span class="block text-slate-400 font-bold mb-1"
                  >ประเภทการลา</span
                >
                <span class="text-sm font-bold text-slate-900">{{
                  getLeaveTypeText(selectedReq?.type || "")
                }}</span>
              </div>
              <div>
                <span class="block text-slate-400 font-bold mb-1"
                  >จำนวนวันหยุดที่ขอลา</span
                >
                <span class="text-sm font-bold text-slate-900"
                  >{{ selectedReq?.totalDays }} วันทำการ</span
                >
              </div>
              <div class="col-span-2">
                <span class="block text-slate-400 font-bold mb-1"
                  >ระยะเวลาหยุดงาน</span
                >
                <span class="text-sm font-medium text-slate-900">{{
                  selectedReq?.dateString
                }}</span>
              </div>
              <div class="col-span-2">
                <span class="block text-slate-400 font-bold mb-1"
                  >เหตุผลประกอบการขอลาหยุด</span
                >
                <p
                  class="text-sm text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100"
                >
                  {{ selectedReq?.reason }}
                </p>
              </div>
              <div v-if="selectedReq?.attachmentUrl" class="col-span-2">
                <span class="block text-slate-400 font-bold mb-1"
                  >เอกสารหลักฐานที่แนบเข้ามา</span
                >
                <a
                  href="#"
                  class="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-500 font-semibold text-sm"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  เปิดดูไฟล์ {{ selectedReq?.attachmentUrl }}
                </a>
              </div>
            </div>

            <!-- ข้อมูลโควตาคงเหลืออัจฉริยะ (Smart Balance Check) -->
            <div class="pt-4 border-t border-slate-100">
              <span
                class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2"
                >ตรวจสอบวันลาคงเหลือของครูท่านนี้ (ก่อนอนุมัติ)</span
              >
              <div class="grid grid-cols-3 gap-3 text-center text-xs">
                <div
                  class="p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl"
                >
                  <span class="block text-emerald-700 font-bold"
                    >ลาป่วยคงเหลือ</span
                  >
                  <span class="text-base font-black text-emerald-800"
                    >28 วัน</span
                  >
                </div>
                <div
                  class="p-2.5 bg-amber-50/50 border border-amber-100 rounded-xl"
                >
                  <span class="block text-amber-700 font-bold"
                    >ลากิจคงเหลือ</span
                  >
                  <span class="text-base font-black text-amber-800"
                    >43.5 วัน</span
                  >
                </div>
                <div
                  class="p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl"
                >
                  <span class="block text-blue-700 font-bold"
                    >ลาพักผ่อนคงเหลือ</span
                  >
                  <span class="text-base font-black text-blue-800">6 วัน</span>
                </div>
              </div>
            </div>

            <!-- ข้อความเหตุผลกรณีโดนปฏิเสธ -->
            <div
              v-if="selectedReq?.status === 'rejected'"
              class="p-3 bg-rose-50 border border-rose-100 rounded-xl"
            >
              <span class="block text-xs font-bold text-rose-800"
                >เหตุผลประกอบการปฏิเสธของ ผอ.:</span
              >
              <p class="text-xs text-rose-700 mt-1 font-medium">
                {{ selectedReq?.rejectReason }}
              </p>
            </div>

            <!-- ปุ่มดำเนินการจัดการภายใน Modal (โชว์เฉพาะเคส pending) -->
            <div
              v-if="selectedReq?.status === 'pending'"
              class="pt-5 border-t border-slate-100 flex gap-3"
            >
              <button
                @click="rejectFromModal"
                class="w-1/3 py-2.5 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 transition-colors"
              >
                ปฏิเสธใบลา
              </button>
              <button
                @click="approveFromModal"
                class="w-2/3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10"
              >
                อนุมัติใบคำร้องนี้
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- ==================== MODAL: ปฏิเสธพร้อมใส่เหตุผล (Reject Modal) ==================== -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="openReject"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          @click="closeRejectModal"
        ></div>

        <div
          class="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden relative z-10"
        >
          <div
            class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50"
          >
            <h3 class="text-base font-bold text-slate-950">
              ปฏิเสธใบคำร้องขอลา
            </h3>
            <button
              @click="closeRejectModal"
              class="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form @submit.prevent="openRejectConfirm" class="p-6 space-y-4">
            <div>
              <p class="text-xs text-slate-500 mb-2">
                ผู้ยื่นคำขอ:
                <span class="font-bold text-slate-900"
                  >{{ reqToReject?.prefix }}{{ reqToReject?.firstName }}
                  {{ reqToReject?.lastName }}</span
                >
              </p>
              <label
                for="rejectReason"
                class="block text-xs font-semibold text-slate-700"
              >
                ระบุเหตุผลการไม่อนุมัติใบลา <span class="text-rose-500">*</span>
              </label>
              <textarea
                id="rejectReason"
                v-model="rejectReasonText"
                required
                rows="3"
                placeholder="ระบุเหตุผลเพื่อส่งข้อความระบบกลับไปยังคุณครู..."
                class="mt-1.5 block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 resize-none transition-all"
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
                class="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md shadow-rose-500/10 transition-all"
              >
                ยืนยันการปฏิเสธ
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- ==================== MODAL: ยืนยันการดำเนินการ (Confirm Modal) ==================== -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="openConfirm"
        class="fixed inset-0 z-[60] flex items-center justify-center p-4"
      >
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
import { ref, computed } from "vue";

const { addToast } = useToast();

// โครงสร้างประเภทข้อมูล (TypeScript Interfaces)
interface LeaveRequest {
  id: number;
  prefix: string;
  firstName: string;
  lastName: string;
  department: string;
  type: "sick" | "personal" | "vacation";
  dateString: string;
  totalDays: number;
  reason: string;
  attachmentUrl?: string;
  status: "pending" | "approved" | "rejected";
  actionTime?: string;
  rejectReason?: string;
}

// แถบสแกนค้นหาและคัดเลือก
const searchQuery = ref<string>("");
const filterDept = ref<string>("all");
const filterType = ref<string>("all");
const filterStatus = ref<string>("all");

// รายการใบลาบุคลากรทั้งหมดในตารางฐานข้อมูลจำลอง (Mock Master Data)
const leaveRequests = ref<LeaveRequest[]>([
  {
    id: 101,
    prefix: "นาง",
    firstName: "สมศรี",
    lastName: "ดีใจ",
    department: "คณิตศาสตร์",
    type: "personal",
    dateString: "26 พ.ค. 2026 - 28 พ.ค. 2026",
    totalDays: 3,
    reason: "มีธุระด่วนในการเดินทางไปทำนิติกรรมมรดกประจำครอบครัวที่ต่างจังหวัด",
    status: "pending",
  },
  {
    id: 102,
    prefix: "นาย",
    firstName: "มานะ",
    lastName: "ขยันสอน",
    department: "ภาษาไทย",
    type: "sick",
    dateString: "25 พ.ค. 2026",
    totalDays: 1,
    reason: "มีอาการเป็นไข้หวัดใหญ่ ปวดศีรษะรุนแรง แพทย์แนะนำให้พักรักษาตัว",
    attachmentUrl: "medical-certificate.pdf",
    status: "pending",
  },
  {
    id: 103,
    prefix: "นางสาว",
    firstName: "มณฑา",
    lastName: "เพียรเรียน",
    department: "ภาษาต่างประเทศ",
    type: "vacation",
    dateString: "12 พ.ค. 2026 - 15 พ.ค. 2026",
    totalDays: 4,
    reason: "ลาพักผ่อนต่างจังหวัดร่วมกับครอบครัวประจำปีการศึกษา",
    status: "approved",
    actionTime: "10 พ.ค. 2026",
  },
  {
    id: 104,
    prefix: "นาย",
    firstName: "เกรียงไกร",
    lastName: "พละดี",
    department: "สุขศึกษาและพลศึกษา",
    type: "personal",
    dateString: "02 พ.ค. 2026",
    totalDays: 1,
    reason:
      "พาสมาชิกในครอบครัวเดินทางไปตามที่หมอนัดตรวจโรงพยาบาลศูนย์ประจำจังหวัด",
    status: "approved",
    actionTime: "30 เม.ย. 2026",
  },
  {
    id: 105,
    prefix: "นาง",
    firstName: "อุษา",
    lastName: "วาดศิลป์",
    department: "สุขศึกษาและพลศึกษา",
    type: "vacation",
    dateString: "15 เม.ย. 2026",
    totalDays: 1,
    reason: "ทำกิจธุระทำฟันและรักษาพยาบาลที่กรุงเทพฯ",
    status: "rejected",
    rejectReason:
      "เนื่องจากตรงกับตารางเวรสอบของโรงเรียนซึ่งขาดผู้ทดแทนทดลองสลับ",
    actionTime: "12 เม.ย. 2026",
  },
]);

// ข้อมูลจำลองสถิติตัวแปรหลัก
const activeLeavesToday = ref<number>(2);
const approvedThisMonth = ref<number>(14);
const attendanceRate = ref<number>(95.8);

// ควบคุมหน้าต่างป๊อปอัปดีเทล
const openDetail = ref<boolean>(false);
const selectedReq = ref<LeaveRequest | null>(null);

// ควบคุมหน้าต่างป๊อปอัปปฏิเสธ
const openReject = ref<boolean>(false);
const rejectReasonText = ref<string>("");
const reqToReject = ref<LeaveRequest | null>(null);
const openConfirm = ref<boolean>(false);
const confirmActionType = ref<"approve" | "reject" | null>(null);
const confirmReq = ref<LeaveRequest | null>(null);

// ตัวประมวลผลคัดกรองตารางด้วย Computed Property อัจฉริยะ (Smart Filter Engine)
const filteredRequests = computed<LeaveRequest[]>(() => {
  return leaveRequests.value.filter((req) => {
    // 1. ค้นหาด้วยชื่อจริง หรือ นามสกุล
    const fullName = `${req.firstName} ${req.lastName}`.toLowerCase();
    const matchSearch = fullName.includes(searchQuery.value.toLowerCase());

    // 2. กรองกลุ่มสาระฯ
    const matchDept =
      filterDept.value === "all" || req.department === filterDept.value;

    // 3. กรองประเภทวันลา
    const matchType =
      filterType.value === "all" || req.type === filterType.value;

    // 4. กรองสถานะใบคำขอ
    const matchStatus =
      filterStatus.value === "all" || req.status === filterStatus.value;

    return matchSearch && matchDept && matchType && matchStatus;
  });
});

// ล้างค่าตัวคัดกรองทั้งหมดกลับสู่สถานะเริ่มต้น
const resetFilters = () => {
  searchQuery.value = "";
  filterDept.value = "all";
  filterType.value = "all";
  filterStatus.value = "all";
};

// แมปค่าเพื่อเปลี่ยนคำอธิบายประเภทการลา
const getLeaveTypeText = (type: string) => {
  if (type === "sick") return "ลาป่วย";
  if (type === "personal") return "ลากิจ";
  if (type === "vacation") return "ลาพักผ่อน";
  return type;
};

const getLeaveTypeClass = (type: string) => {
  switch (type) {
    case "sick":
      return "text-emerald-700 bg-emerald-50";
    case "personal":
      return "text-amber-700 bg-amber-50";
    default:
      return "text-blue-700 bg-blue-50";
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-emerald-50 text-emerald-700";
    case "rejected":
      return "bg-rose-50 text-rose-700";
    default:
      return "bg-amber-50 text-amber-700";
  }
};

const getStatusDotClass = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-emerald-500";
    case "rejected":
      return "bg-rose-500";
    default:
      return "bg-amber-500";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "approved":
      return "อนุมัติเรียบร้อย";
    case "rejected":
      return "ปฏิเสธใบคำร้อง";
    default:
      return "รอการพิจารณา";
  }
};

// เปิด-ปิด ป๊อปอัปดีเทล
const openDetailModal = (req: LeaveRequest) => {
  selectedReq.value = req;
  openDetail.value = true;
};

const closeDetailModal = () => {
  openDetail.value = false;
  selectedReq.value = null;
};

// อนุมัติใบลา
const approveRequest = (id: number) => {
  const req = leaveRequests.value.find((p) => p.id === id);
  if (!req) return;

  req.status = "approved";
  req.actionTime = "เมื่อครู่นี้";

  approvedThisMonth.value++;
  activeLeavesToday.value++;

  addToast(
    "success",
    "อนุมัติใบลาสำเร็จ",
    `อนุมัติใบลาของ "${req.prefix}${req.firstName} ${req.lastName}" เรียบร้อยแล้ว ระบบจัดส่งผลกลับไปยังคุณครูแล้ว`,
  );
};

const openApproveConfirm = (req: LeaveRequest) => {
  confirmReq.value = req;
  confirmActionType.value = "approve";
  openConfirm.value = true;
};

// ปฏิเสธการลาพร้อมระบุเหตุผล
const openRejectWithReason = (req: LeaveRequest) => {
  reqToReject.value = req;
  rejectReasonText.value = "";
  openReject.value = true;
};

const closeRejectModal = () => {
  openReject.value = false;
  reqToReject.value = null;
  rejectReasonText.value = "";
};

const submitReject = () => {
  if (!reqToReject.value || !rejectReasonText.value) {
    addToast("warning", "ยังไม่กรอกเหตุผล", "กรุณาระบุเหตุผลก่อนยืนยันการปฏิเสธ");
    return;
  }

  const req = leaveRequests.value.find((p) => p.id === reqToReject.value!.id);
  if (req) {
    req.status = "rejected";
    req.rejectReason = rejectReasonText.value;
    req.actionTime = "เมื่อครู่นี้";
  }

  addToast(
    "info",
    "ปฏิเสธคำร้องเรียบร้อย",
    `ปฏิเสธคำร้องขอลาของครู "${req?.firstName}" และส่งเหตุผลกลับในระบบแล้ว`,
  );
  closeRejectModal();
};

const openRejectConfirm = () => {
  if (!reqToReject.value || !rejectReasonText.value) {
    addToast("warning", "ยังไม่กรอกเหตุผล", "กรุณาระบุเหตุผลก่อนยืนยันการปฏิเสธ");
    return;
  }

  confirmReq.value = reqToReject.value;
  confirmActionType.value = "reject";
  openConfirm.value = true;
};

const closeConfirmModal = () => {
  openConfirm.value = false;
  confirmActionType.value = null;
  confirmReq.value = null;
};

const confirmAction = () => {
  if (!confirmReq.value || !confirmActionType.value) return;

  if (confirmActionType.value === "approve") {
    approveRequest(confirmReq.value.id);
    closeDetailModal();
  }
  else {
    submitReject();
  }

  closeConfirmModal();
};

// จัดการกรณีใช้งานปุ่มอนุมัติ/ปฏิเสธจากทางด้านในป๊อปอัปดีเทลตรงกลาง
const approveFromModal = () => {
  if (selectedReq.value) {
    openApproveConfirm(selectedReq.value);
  }
};

const rejectFromModal = () => {
  if (selectedReq.value) {
    const req = selectedReq.value;
    closeDetailModal();
    openRejectWithReason(req);
  }
};
</script>

<style scoped>
/* การสไลด์ขึ้นนวลสายตาของเนื้อหาตาราง */
.animate-fade-in {
  animation: fadeIn 0.22s ease-out forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
