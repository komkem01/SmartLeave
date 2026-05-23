<template>
  <div class="min-h-screen bg-slate-50 font-sans antialiased">
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p class="text-lg font-bold text-slate-950 leading-tight">
              SmartLeave
            </p>
            <p
              class="text-3xs font-semibold text-slate-500 tracking-wider uppercase"
            >
              แดชบอร์ดครูผู้สอน
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-bold text-slate-800">
              {{ profileFullName }}
            </p>
            <p class="text-3xs text-slate-500">{{ profileDepartment }}</p>
          </div>
          <div
            class="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-slate-700"
          >
            {{ profileInitials }}
          </div>
          <AppLogoutButton />
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h1 class="text-2xl font-extrabold text-slate-950">
            หน้าดูรายละเอียดคำขอลา
          </h1>
          <p class="text-sm text-slate-500 mt-1">
            แสดงข้อมูลทั้งหมดของใบคำร้องพร้อมไฟล์แนบ
          </p>
          <p class="text-xs text-blue-700 font-semibold mt-1">
            หน้านี้ต้องแสดงข้อมูลจากฟอร์มกรอกใบลาครบทุกช่อง
          </p>
        </div>
        <NuxtLink
          to="/teacher/dashboard"
          class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          กลับหน้ารายการใบลา
        </NuxtLink>
      </div>

      <div
        v-if="isLoading"
        class="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700"
      >
        กำลังโหลดข้อมูลใบคำร้องจากระบบ...
      </div>

      <div
        v-else-if="!leaveRequest"
        class="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center space-y-3"
      >
        <h2 class="text-lg font-bold text-slate-900">ไม่พบข้อมูลใบคำร้อง</h2>
        <p class="text-sm text-slate-500">
          รายการที่ต้องการอาจถูกลบหรือคุณไม่มีสิทธิ์เข้าถึง
        </p>
      </div>

      <div
        v-else
        class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[620px]">
          <section
            class="bg-slate-900 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-700"
          >
            <div
              class="bg-slate-950 rounded-xl px-4 py-2 flex items-center justify-between text-white mb-4"
            >
              <div class="text-xs text-slate-300 truncate pr-2">
                ฟอร์มใบลาราชการ (PDF): แบบใบลาของข้าราชการ.pdf
              </div>
              <div class="flex items-center gap-2">
                <button
                  @click="zoomOut"
                  class="text-slate-300 hover:text-white"
                  title="ซูมออก"
                >
                  -
                </button>
                <span class="text-xs text-slate-300 min-w-[38px] text-center"
                  >{{ Math.round(docZoom * 100) }}%</span
                >
                <button
                  @click="zoomIn"
                  class="text-slate-300 hover:text-white"
                  title="ซูมเข้า"
                >
                  +
                </button>
                <button
                  @click="rotateDoc"
                  class="text-slate-300 hover:text-white"
                  title="หมุน"
                >
                  ⟳
                </button>
                <button
                  @click="printFormPdf"
                  class="text-slate-300 hover:text-white"
                  title="พิมพ์ฟอร์ม"
                >
                  🖨
                </button>
              </div>
            </div>

            <div class="mb-4">
              <button
                type="button"
                @click="downloadDoc"
                :disabled="leaveRequest?.status !== 'approved'"
                class="inline-flex w-full items-center justify-center rounded-xl px-3 py-2 text-sm font-bold text-white transition-colors"
                :class="leaveRequest?.status === 'approved' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-400 cursor-not-allowed'"
              >
                {{ leaveRequest?.status === 'approved' ? 'ดาวน์โหลดไฟล์ PDF (A4)' : 'ดาวน์โหลดได้เมื่ออนุมัติแล้ว' }}
              </button>
            </div>

            <div
              class="bg-slate-800 rounded-xl p-4 sm:p-6 min-h-[520px] flex items-center justify-center overflow-auto no-print"
            >
              <div
                class="transition-all duration-200"
                :style="{
                  transform: `scale(${docZoom * 0.7}) rotate(${docRotation}deg)`,
                  transformOrigin: 'center center'
                }"
              >
                <div id="pdf-content">
                  <LeaveDocumentPreview v-if="leaveRequest" :data="computedPreviewData" />
                </div>
              </div>
            </div>
          </section>

          <section class="p-6 space-y-4">
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p class="text-xs text-slate-500">เลขที่คำร้อง</p>
              <p class="text-base font-bold text-slate-900">
                {{ formattedRequestNumber }}
              </p>
              <p class="text-3xs text-slate-400 mt-1">
                อ้างอิงระบบ: {{ leaveRequest.id }}
              </p>
            </div>

            <div class="rounded-xl border border-slate-200 p-4">
              <p class="text-xs text-slate-500">สถานะ</p>
              <span
                class="inline-flex mt-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                :class="getStatusClass(leaveRequest.status)"
              >
                {{ getStatusText(leaveRequest.status) }}
              </span>
              <p
                v-if="leaveRequest.actionTime"
                class="text-xs text-slate-500 mt-2"
              >
                ดำเนินการเมื่อ: {{ leaveRequest.actionTime }}
              </p>
              <p
                v-if="leaveRequest.rejectReason"
                class="text-xs text-rose-700 mt-2"
              >
                เหตุผลการปฏิเสธ: {{ leaveRequest.rejectReason }}
              </p>
            </div>

            <div class="rounded-xl border border-slate-200 p-4">
              <p class="text-xs text-slate-500">ผู้พิจารณา</p>
              <p class="text-sm font-bold text-slate-900 mt-1">
                {{ approverDisplayName }}
              </p>
              <p
                v-if="leaveRequest.status === 'pending'"
                class="text-xs text-slate-500 mt-1"
              >
                คำร้องนี้ยังไม่ถูกพิจารณา
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div class="rounded-xl border border-slate-200 p-4">
                <p class="text-xs text-slate-500">ชื่อผู้ยื่น</p>
                <p class="font-bold text-slate-900">
                  {{ leaveRequest.prefix }}{{ leaveRequest.firstName }}
                  {{ leaveRequest.lastName }}
                </p>
              </div>
              <div class="rounded-xl border border-slate-200 p-4">
                <p class="text-xs text-slate-500">กลุ่มสาระ/ฝ่ายงาน</p>
                <p class="font-semibold text-slate-900">
                  {{ leaveRequest.department }}
                </p>
              </div>
              <div class="rounded-xl border border-slate-200 p-4">
                <p class="text-xs text-slate-500">ประเภทการลา</p>
                <span
                  class="inline-flex mt-1 rounded-lg px-2.5 py-1 text-xs font-semibold"
                  :class="getLeaveTypeClass(leaveRequest.type)"
                >
                  {{ leaveRequest.leaveTypeName }}
                </span>
              </div>
              <div class="rounded-xl border border-slate-200 p-4">
                <p class="text-xs text-slate-500">จำนวนวัน</p>
                <p class="font-semibold text-slate-900">
                  {{ leaveRequest.totalDays }} วัน
                </p>
              </div>
              <div class="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                <p class="text-xs text-slate-500">ช่วงวันที่ลา</p>
                <p class="font-semibold text-slate-900">
                  {{ leaveRequest.dateString }}
                </p>
              </div>
              <div class="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                <p class="text-xs text-slate-500">ข้อมูลจากแบบฟอร์มใบลา</p>
                <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <p>
                    <span class="text-slate-500">อีเมล:</span>
                    <span class="font-semibold text-slate-900">{{
                      leaveRequest.email
                    }}</span>
                  </p>
                  <p>
                    <span class="text-slate-500">ตำแหน่ง:</span>
                    <span class="font-semibold text-slate-900">{{
                      leaveRequest.position
                    }}</span>
                  </p>
                  <p>
                    <span class="text-slate-500">วันที่เริ่มลา:</span>
                    <span class="font-semibold text-slate-900">{{
                      leaveRequest.startDate
                    }}</span>
                  </p>
                  <p>
                    <span class="text-slate-500">วันที่สิ้นสุดลา:</span>
                    <span class="font-semibold text-slate-900">{{
                      leaveRequest.endDate
                    }}</span>
                  </p>
                  <p class="sm:col-span-2">
                    <span class="text-slate-500">สถานที่:</span>
                    <span class="font-semibold text-slate-900">{{
                      leaveRequest.location
                    }}</span>
                  </p>
                  <p>
                    <span class="text-slate-500">จังหวัด:</span>
                    <span class="font-semibold text-slate-900">{{
                      leaveRequest.province
                    }}</span>
                  </p>
                  <p>
                    <span class="text-slate-500">อำเภอ/เขต:</span>
                    <span class="font-semibold text-slate-900">{{
                      leaveRequest.district
                    }}</span>
                  </p>
                  <p>
                    <span class="text-slate-500">ตำบล/แขวง:</span>
                    <span class="font-semibold text-slate-900">{{
                      leaveRequest.subDistrict
                    }}</span>
                  </p>
                  <p>
                    <span class="text-slate-500">รหัสไปรษณีย์:</span>
                    <span class="font-semibold text-slate-900">{{
                      leaveRequest.zipcode
                    }}</span>
                  </p>
                </div>
              </div>
              <div class="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                <p class="text-xs text-slate-500">เหตุผลการลา</p>
                <p class="text-slate-800 leading-relaxed">
                  {{ leaveRequest.reason }}
                </p>
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
            </div>
          </section>
        </div>
      </div>
    </main>
    <div class="print-only">
      <LeaveDocumentPreview v-if="leaveRequest" :data="computedPreviewData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import LeaveDocumentPreview from '~/components/leave/LeaveDocumentPreview.vue';

const route = useRoute();
const router = useRouter();
const { addToast } = useToast();
const config = useRuntimeConfig();
const BASE = config.public.BASE_API;

definePageMeta({
  middleware: ["require-auth"],
});

interface ApiCurrentUser {
  id: string;
  firstname?: string;
  lastname?: string;
}

interface ApiLeaveRequest {
  id: string;
  member_id: string;
  leave_type_id: string;
  start_date: string;
  end_date: string;
  total_days: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  approved_by?: string;
  approved_at?: string;
  reject_reason?: string;
  updated_at: string;
  attachment_url?: string;
}

interface Item {
  id: string;
  name: string;
}

interface ApiMember {
  id: string;
  prefix_id?: string;
  firstname?: string;
  lastname?: string;
  role?: string;
  department?: string;
  email?: string;
  province_id?: string;
  district_id?: string;
  sub_district_id?: string;
  zipcode_id?: string;
}

interface LeaveRequestView {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  department: string;
  type: "sick" | "personal" | "vacation" | "other";
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  dateString: string;
  totalDays: number;
  location: string;
  province: string;
  district: string;
  subDistrict: string;
  zipcode: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  approvedByName: string;
  actionTime?: string;
  rejectReason?: string;
  attachmentUrl?: string;
}

interface PdfStats {
  taken?: number;
  this_time?: number;
  total?: number;
}

interface LeaveRequestPdfApi {
  type: "vacation" | "sick" | "personal" | "maternity";
  written_at?: string;
  date?: string;
  to?: string;
  name?: string;
  position?: string;
  department?: string;
  accumulated_days?: number;
  start_date?: string;
  end_date?: string;
  total_days?: number;
  reason?: string;
  last_leave_type?: string;
  last_leave_start_date?: string;
  last_leave_end_date?: string;
  last_leave_total_days?: number;
  contact_address?: string;
  email?: string;
  phone?: string;
  substitute_name?: string;
  stats?: {
    vacation?: PdfStats;
    sick?: PdfStats;
    personal?: PdfStats;
    maternity?: PdfStats;
  };
}

interface LeavePreviewData {
  type: "vacation" | "sick" | "personal" | "maternity";
  writtenAt?: string;
  date?: string;
  to?: string;
  name?: string;
  position?: string;
  department?: string;
  accumulatedDays?: number;
  startDate?: string;
  endDate?: string;
  totalDays?: number;
  reason?: string;
  lastLeaveType?: string;
  lastLeaveStartDate?: string;
  lastLeaveEndDate?: string;
  lastLeaveTotalDays?: number;
  contactAddress?: string;
  email?: string;
  phone?: string;
  substituteName?: string;
  stats?: {
    vacation?: { taken?: number; thisTime?: number; total?: number };
    sick?: { taken?: number; thisTime?: number; total?: number };
    personal?: { taken?: number; thisTime?: number; total?: number };
    maternity?: { taken?: number; thisTime?: number; total?: number };
  };
}

const isLoading = ref(false);
const docZoom = ref(1);
const docRotation = ref(0);
const leaveRequest = ref<LeaveRequestView | null>(null);
const previewPdfData = ref<LeavePreviewData | null>(null);

const computedPreviewData = computed(() => {
  return previewPdfData.value || {};
});

const profileFullName = computed(() => {
  if (!leaveRequest.value) return "ครูผู้สอน";
  return `${leaveRequest.value.firstName} ${leaveRequest.value.lastName}`.trim();
});

const profileDepartment = computed(() => {
  return leaveRequest.value?.department || "-";
});

const profileInitials = computed(() => {
  const first = leaveRequest.value?.firstName?.trim() || "";
  const last = leaveRequest.value?.lastName?.trim() || "";
  const initials = `${first.charAt(0)}${last.charAt(0)}`.trim();
  return initials || "คร";
});

const monthShortTH = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];
const monthLongTH = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

const formatDateBE = (dateText: string) => {
  const d = new Date(dateText);
  if (Number.isNaN(d.getTime())) return dateText;
  return `${d.getDate()} ${monthShortTH[d.getMonth()]} ${d.getFullYear() + 543}`;
};

const formatDateLongBE = (dateText: string) => {
  const d = new Date(dateText);
  if (Number.isNaN(d.getTime())) return dateText;
  return `${d.getDate()} ${monthLongTH[d.getMonth()]} ${d.getFullYear() + 543}`;
};

const formatDateTimeBE = (dateText: string) => {
  const d = new Date(dateText);
  if (Number.isNaN(d.getTime())) return dateText;
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${d.getDate()} ${monthShortTH[d.getMonth()]} ${d.getFullYear() + 543}, ${hh}:${mm} น.`;
};

const formattedRequestNumber = computed(() => {
  const id = leaveRequest.value?.id || "";
  const compact = id.replace(/-/g, "").toUpperCase();
  if (!compact) return "-";
  if (compact.length < 8) return `LR-${compact}`;
  return `LR-${compact.slice(0, 4)}-${compact.slice(4, 8)}`;
});

const approverDisplayName = computed(() => {
  if (!leaveRequest.value) return "-";
  if (leaveRequest.value.status === "pending") return "รอพิจารณา";
  return leaveRequest.value.approvedByName || "-";
});

const toLeaveTypeKey = (leaveTypeName?: string): LeaveRequestView["type"] => {
  const text = (leaveTypeName || "").toLowerCase();
  if (text.includes("ป่วย") || text.includes("sick")) return "sick";
  if (text.includes("กิจ") || text.includes("personal")) return "personal";
  if (text.includes("พักผ่อน") || text.includes("vacation")) return "vacation";
  return "other";
};

const getStatusText = (status: LeaveRequestView["status"]) => {
  if (status === "approved") return "อนุมัติเรียบร้อย";
  if (status === "rejected") return "ปฏิเสธใบคำร้อง";
  return "รอการพิจารณา";
};

const getStatusClass = (status: LeaveRequestView["status"]) => {
  if (status === "approved") return "bg-emerald-50 text-emerald-700";
  if (status === "rejected") return "bg-rose-50 text-rose-700";
  return "bg-amber-50 text-amber-700";
};

const getLeaveTypeClass = (type: LeaveRequestView["type"]) => {
  if (type === "sick") return "text-emerald-700 bg-emerald-50";
  if (type === "personal") return "text-amber-700 bg-amber-50";
  if (type === "vacation") return "text-blue-700 bg-blue-50";
  return "text-slate-700 bg-slate-100";
};

const zoomIn = () => {
  if (docZoom.value < 1.8) docZoom.value += 0.15;
};

const zoomOut = () => {
  if (docZoom.value > 0.6) docZoom.value -= 0.15;
};

const rotateDoc = () => {
  docRotation.value = (docRotation.value + 90) % 360;
};

const printFormPdf = () => {
  window.print();
};

const downloadDoc = async () => {
  if (!leaveRequest.value || leaveRequest.value.status !== "approved") {
    addToast(
      "warning",
      "ยังดาวน์โหลดไม่ได้",
      "ดาวน์โหลดเอกสารได้เมื่อสถานะอนุมัติแล้วเท่านั้น",
    );
    return;
  }

  addToast(
    "info",
    "เริ่มดาวน์โหลดไฟล์",
    "กำลังสร้างไฟล์ PDF กรุณารอสักครู่...",
  );
  if (import.meta.client) {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('pdf-content');
    const opt = {
      margin:       0,
      filename:     `ใบลา_${leaveRequest.value?.firstName}_${leaveRequest.value?.startDate}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  }
};

const resolveNameById = async (
  path: string,
  id: string | undefined,
  headers?: Record<string, string>,
) => {
  if (!id) return "-";
  try {
    const res = await $fetch<any>(`${BASE}${path}/${id}`, { headers });
    return res?.data?.name || "-";
  } catch {
    return "-";
  }
};

const loadDetail = async () => {
  isLoading.value = true;
  try {
    const token = import.meta.client
      ? localStorage.getItem("smartleave:access_token")
      : "";
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    const id = String(route.params.id || "");
    if (!id) {
      leaveRequest.value = null;
      previewPdfData.value = null;
      return;
    }

    const [meRes, leaveRes, pdfRes] = await Promise.all([
      $fetch<any>(`${BASE}/member/me`, { headers }),
      $fetch<any>(`${BASE}/leave-request/${id}`, { headers }),
      $fetch<any>(`${BASE}/leave-request/${id}/pdf-data`, { headers }),
    ]);

    const me = (meRes?.data ?? null) as ApiCurrentUser | null;
    const lr = (leaveRes?.data ?? null) as ApiLeaveRequest | null;
    const pdf = (pdfRes?.data ?? null) as LeaveRequestPdfApi | null;

    if (!me || !lr || !pdf) {
      leaveRequest.value = null;
      previewPdfData.value = null;
      return;
    }

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
      contactAddress: pdf.contact_address,
      email: pdf.email,
      phone: pdf.phone,
      substituteName: pdf.substitute_name,
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
    };

    if (lr.member_id !== me.id) {
      addToast(
        "error",
        "ไม่สามารถเข้าถึงข้อมูล",
        "คุณไม่มีสิทธิ์ดูรายละเอียดคำร้องนี้",
      );
      router.push("/teacher/dashboard");
      return;
    }

    const memberRes = await $fetch<any>(`${BASE}/member/${lr.member_id}`, {
      headers,
    });
    const member = (memberRes?.data ?? null) as ApiMember | null;
    if (!member) {
      leaveRequest.value = null;
      return;
    }

    const approverRes = lr.approved_by
      ? await $fetch<any>(`${BASE}/member/${lr.approved_by}`, {
          headers,
        }).catch(() => null)
      : null;
    const approver = (approverRes?.data ?? null) as ApiMember | null;

    const [
      prefixName,
      leaveTypeName,
      provinceName,
      districtName,
      subDistrictName,
      zipcodeName,
    ] = await Promise.all([
      resolveNameById("/system/prefix", member.prefix_id, headers),
      resolveNameById("/system/leave-type", lr.leave_type_id, headers),
      resolveNameById("/system/province", member.province_id, headers),
      resolveNameById("/system/district", member.district_id, headers),
      resolveNameById("/system/sub-district", member.sub_district_id, headers),
      resolveNameById("/system/zipcode", member.zipcode_id, headers),
    ]);

    const type = toLeaveTypeKey(leaveTypeName);
    const dateString =
      lr.start_date === lr.end_date
        ? formatDateBE(lr.start_date)
        : `${formatDateBE(lr.start_date)} - ${formatDateBE(lr.end_date)}`;

    leaveRequest.value = {
      id: lr.id,
      prefix: prefixName,
      firstName: member.firstname || "-",
      lastName: member.lastname || "",
      position: member.role === "director" ? "ผู้อำนวยการ" : "ครู",
      email: member.email || "-",
      department: member.department || "-",
      type,
      leaveTypeName,
      startDate: formatDateLongBE(lr.start_date),
      endDate: formatDateLongBE(lr.end_date),
      dateString,
      totalDays: Number(lr.total_days || 0),
      location: `${subDistrictName} ${districtName} ${provinceName}`,
      province: provinceName,
      district: districtName,
      subDistrict: subDistrictName,
      zipcode: zipcodeName,
      reason: lr.reason,
      status: lr.status,
      approvedByName: approver
        ? `ผอ.${(approver.firstname || "").trim()} ${(approver.lastname || "").trim()}`.trim()
        : "",
      actionTime: formatDateTimeBE(lr.approved_at || lr.updated_at),
      rejectReason: lr.reject_reason || "",
      attachmentUrl: lr.attachment_url || "",
    };
  } catch {
    leaveRequest.value = null;
    previewPdfData.value = null;
    addToast(
      "error",
      "โหลดข้อมูลไม่สำเร็จ",
      "ไม่สามารถดึงรายละเอียดคำร้องลาได้ กรุณาลองใหม่",
    );
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadDetail();
});
</script>
