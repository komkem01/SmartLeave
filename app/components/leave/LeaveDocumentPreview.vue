<template>
  <div
    class="a4-page font-sarabun text-[14pt] leading-snug text-black max-w-[210mm] mx-auto p-10 bg-white"
    ref="documentRef"
  >
    <!-- Header -->
    <div
      class="flex justify-center items-center mb-6 w-full font-bold text-[18pt]"
    >
      แบบฟอร์มการลา
    </div>

    <div class="text-right mb-4 flex justify-end">
      <div class="w-2/3 max-w-[350px] text-left text-[14pt]">
        <div class="flex items-baseline">
          <span class="shrink-0">เขียนที่</span>
          <span class="dotted-line flex-grow text-center ml-2">{{
            data.writtenAt || "&nbsp;"
          }}</span>
        </div>
        <div class="flex items-baseline mt-1">
          <span class="shrink-0">วันที่</span>
          <span class="dotted-line flex-grow text-center ml-2">{{
            formattedDate
          }}</span>
        </div>
      </div>
    </div>

    <!-- Title -->
    <div class="mb-4 text-[14pt]">
      <div class="flex items-baseline">
        <b class="shrink-0 w-16 font-bold">เรื่อง</b>
        <span>{{ subjectText }}</span>
      </div>
      <div class="flex items-baseline mt-1">
        <b class="shrink-0 w-16 font-bold">เรียน</b>
        <span>{{ data.to || "ผู้อำนวยการ" }}</span>
      </div>
    </div>

    <!-- Body -->
    <div class="flex items-baseline mb-4 leading-relaxed pl-12 text-[14pt]">
      <span class="shrink-0">ข้าพเจ้า</span>
      <span class="dotted-line flex-grow text-center mx-2">{{
        data.name || "&nbsp;"
      }}</span>
      <span class="shrink-0">ตำแหน่ง</span>
      <span class="dotted-line flex-grow text-center mx-2">{{
        data.position || "&nbsp;"
      }}</span>
      <span class="shrink-0">สังกัด</span>
      <span class="dotted-line flex-grow text-center ml-2">{{
        data.department || "&nbsp;"
      }}</span>
    </div>

    <!-- Vacation Specific -->
    <div
      v-if="data.type === 'vacation'"
      class="mb-4 leading-relaxed text-[14pt]"
    >
      <div class="flex items-baseline pl-12">
        <span class="shrink-0">มีวันลาพักผ่อนสะสม</span>
        <span class="dotted-line flex-grow text-center mx-2">{{
          data.accumulatedDays || "-"
        }}</span>
        <span class="shrink-0">วันทำการ</span>
        <span class="shrink-0 mx-2"
          >มีสิทธิลาพักผ่อนประจำปีนี้อีก 10 วันทำการ</span
        >
        <span class="shrink-0">รวมเป็น</span>
        <span class="dotted-line flex-grow text-center mx-2">{{
          data.accumulatedDays ? Number(data.accumulatedDays) + 10 : "-"
        }}</span>
        <span class="shrink-0">วันทำการ</span>
      </div>
      <div class="flex items-baseline pl-12 mt-1">
        <span class="shrink-0">ขอลาพักผ่อนตั้งแต่วันที่</span>
        <span class="dotted-line flex-grow text-center mx-2">{{
          formatThaiDate(data.startDate)
        }}</span>
        <span class="shrink-0">ถึงวันที่</span>
        <span class="dotted-line flex-grow text-center mx-2">{{
          formatThaiDate(data.endDate)
        }}</span>
        <span class="shrink-0">มีกำหนด</span>
        <span class="dotted-line flex-grow text-center mx-2">{{
          data.totalDays || "-"
        }}</span>
        <span class="shrink-0">วัน</span>
      </div>
    </div>

    <!-- Sick/Personal/Maternity Specific -->
    <div v-else class="mb-4 leading-relaxed text-[14pt]">
      <div class="flex items-baseline flex-wrap pl-12 gap-y-1">
        <span class="shrink-0">ขอลา</span>
        <span class="inline-flex items-center ml-4 shrink-0 select-none">
          <span
            class="w-4 h-4 border border-black inline-flex items-center justify-center mr-1 text-[10pt] font-bold"
          >
            <span v-if="data.type === 'sick'">✓</span>
          </span>
          ป่วย
        </span>
        <span class="inline-flex items-center ml-4 shrink-0 select-none">
          <span
            class="w-4 h-4 border border-black inline-flex items-center justify-center mr-1 text-[10pt] font-bold"
          >
            <span v-if="data.type === 'personal'">✓</span>
          </span>
          กิจส่วนตัว
        </span>
        <span class="inline-flex items-center ml-4 shrink-0 select-none">
          <span
            class="w-4 h-4 border border-black inline-flex items-center justify-center mr-1 text-[10pt] font-bold"
          >
            <span v-if="data.type === 'maternity'">✓</span>
          </span>
          คลอดบุตร
        </span>
        <span class="shrink-0 ml-4">เนื่องจาก</span>
        <span class="dotted-line flex-grow text-center ml-2">{{
          data.reason || "&nbsp;"
        }}</span>
      </div>

      <div class="flex items-baseline pl-12 mt-1">
        <span class="shrink-0">ตั้งแต่วันที่</span>
        <span class="dotted-line flex-grow text-center mx-2">{{
          formatThaiDate(data.startDate)
        }}</span>
        <span class="shrink-0">ถึงวันที่</span>
        <span class="dotted-line flex-grow text-center mx-2">{{
          formatThaiDate(data.endDate)
        }}</span>
        <span class="shrink-0">มีกำหนด</span>
        <span class="dotted-line flex-grow text-center mx-2">{{
          data.totalDays || "-"
        }}</span>
        <span class="shrink-0">วัน</span>
      </div>

      <div class="flex items-baseline pl-12 mt-1">
        <span class="shrink-0">ข้าพเจ้าได้ลา</span>
        <span class="inline-flex items-center ml-4 shrink-0 select-none">
          <span
            class="w-4 h-4 border border-black inline-flex items-center justify-center mr-1 text-[10pt] font-bold"
          >
            <span v-if="data.lastLeaveType === 'sick'">✓</span>
          </span>
          ป่วย
        </span>
        <span class="inline-flex items-center ml-4 shrink-0 select-none">
          <span
            class="w-4 h-4 border border-black inline-flex items-center justify-center mr-1 text-[10pt] font-bold"
          >
            <span v-if="data.lastLeaveType === 'personal'">✓</span>
          </span>
          กิจส่วนตัว
        </span>
        <span class="inline-flex items-center ml-4 shrink-0 select-none">
          <span
            class="w-4 h-4 border border-black inline-flex items-center justify-center mr-1 text-[10pt] font-bold"
          >
            <span v-if="data.lastLeaveType === 'maternity'">✓</span>
          </span>
          คลอดบุตร
        </span>
      </div>

      <div class="flex items-baseline pl-12 mt-1">
        <span class="shrink-0">ครั้งสุดท้ายตั้งแต่วันที่</span>
        <span class="dotted-line flex-grow text-center mx-2">{{
          formatThaiDate(data.lastLeaveStartDate)
        }}</span>
        <span class="shrink-0">ถึงวันที่</span>
        <span class="dotted-line flex-grow text-center mx-2">{{
          formatThaiDate(data.lastLeaveEndDate)
        }}</span>
        <span class="shrink-0">มีกำหนด</span>
        <span class="dotted-line flex-grow text-center mx-2">{{
          data.lastLeaveTotalDays || "-"
        }}</span>
        <span class="shrink-0">วัน</span>
      </div>
    </div>

    <!-- Contact Info -->
    <div class="mb-6 leading-relaxed pl-12 space-y-1 text-[14pt]">
      <div class="flex items-baseline w-full">
        <span class="shrink-0">สถานที่ </span>
        <span class="dotted-line flex-grow text-center ml-2">{{
          data.location || data.contactAddress || "&nbsp;"
        }}</span>
      </div>
      <div class="grid grid-cols-4 gap-3 w-full">
        <div class="flex items-baseline">
          <span class="shrink-0">จังหวัด</span>
          <span class="dotted-line flex-grow text-center ml-1">{{
            data.province || "&nbsp;"
          }}</span>
        </div>
        <div class="flex items-baseline">
          <span class="shrink-0">อำเภอ</span>
          <span class="dotted-line flex-grow text-center ml-1">{{
            data.district || "&nbsp;"
          }}</span>
        </div>
        <div class="flex items-baseline">
          <span class="shrink-0">ตำบล</span>
          <span class="dotted-line flex-grow text-center ml-1">{{
            data.subDistrict || "&nbsp;"
          }}</span>
        </div>
        <div class="flex items-baseline">
          <span class="shrink-0">รหัสไปรษณีย์</span>
          <span class="dotted-line flex-grow text-center ml-1">{{
            data.zipcode || "&nbsp;"
          }}</span>
        </div>
      </div>
      <!-- Personal Contact Info -->
      <div class="w-full">
        <p class="text-[14pt]">ข้อมูลติดต่อส่วนตัว</p>
        <div class="flex gap-4 w-full mt-1">
          <div class="flex items-baseline flex-grow">
            <span class="shrink-0">อีเมล</span>
            <span class="dotted-line flex-grow text-center ml-2">{{
              data.email || "&nbsp;"
            }}</span>
          </div>
          <div class="flex items-baseline w-[280px]">
            <span class="shrink-0">เบอร์โทรศัพท์</span>
            <span class="dotted-line flex-grow text-center ml-2">{{
              data.phone || "&nbsp;"
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Signatures -->
    <div class="flex justify-end mb-6 text-[14pt]">
      <div class="text-center w-1/2">
        <p>ขอแสดงความนับถือ</p>
        <div class="mt-3 h-[48px] flex items-end justify-center">
          <img
            v-if="data.teacherSignatureUrl"
            :src="data.teacherSignatureUrl"
            alt="Teacher signature"
            class="h-[42px] max-w-[180px] object-contain"
            crossorigin="anonymous"
          />
        </div>
        <p class="mt-6">
          (ลงชื่อ)........................................................
        </p>
        <p class="mt-1 flex justify-center items-baseline">
          <span>(</span>
          <span class="dotted-line w-[160px] text-center mx-1">{{
            data.name || "&nbsp;"
          }}</span>
          <span>)</span>
        </p>
      </div>
    </div>

    <!-- Footer Stats & Commander -->
    <div
      class="grid grid-cols-2 gap-6 text-[12pt] border-t border-gray-300 pt-4"
    >
      <!-- Left Column: Stats Table -->
      <div>
        <p class="font-bold underline mb-2 text-center">
          สถิติการลาในปีงบประมาณนี้
        </p>

        <!-- Table for Vacation -->
        <table
          v-if="data.type === 'vacation'"
          class="w-full border-collapse border border-black text-center text-[11pt]"
        >
          <thead>
            <tr class="bg-gray-50">
              <th class="border border-black p-1 font-bold">
                ลามาแล้ว<br />(วันทำการ)
              </th>
              <th class="border border-black p-1 font-bold">
                ลาครั้งนี้<br />(วันทำการ)
              </th>
              <th class="border border-black p-1 font-bold">
                รวมเป็น<br />(วันทำการ)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-black p-1 h-8">
                {{ data.stats?.vacation?.taken || "-" }}
              </td>
              <td class="border border-black p-1">
                {{ data.stats?.vacation?.thisTime || "-" }}
              </td>
              <td class="border border-black p-1">
                {{ data.stats?.vacation?.total || "-" }}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Table for Other Types -->
        <table
          v-else
          class="w-full border-collapse border border-black text-center text-[11pt]"
        >
          <thead>
            <tr class="bg-gray-50">
              <th class="border border-black p-1 font-bold">ประเภทการลา</th>
              <th class="border border-black p-1 font-bold">ลามาแล้ว</th>
              <th class="border border-black p-1 font-bold">ลาครั้งนี้</th>
              <th class="border border-black p-1 font-bold">รวมเป็น</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-black p-1 text-left pl-2">ลาป่วย</td>
              <td class="border border-black p-1">
                {{ data.stats?.sick?.taken || "-" }}
              </td>
              <td class="border border-black p-1">
                {{ data.stats?.sick?.thisTime || "-" }}
              </td>
              <td class="border border-black p-1">
                {{ data.stats?.sick?.total || "-" }}
              </td>
            </tr>
            <tr>
              <td class="border border-black p-1 text-left pl-2">
                ลากิจส่วนตัว
              </td>
              <td class="border border-black p-1">
                {{ data.stats?.personal?.taken || "-" }}
              </td>
              <td class="border border-black p-1">
                {{ data.stats?.personal?.thisTime || "-" }}
              </td>
              <td class="border border-black p-1">
                {{ data.stats?.personal?.total || "-" }}
              </td>
            </tr>
            <tr>
              <td class="border border-black p-1 text-left pl-2">ลาคลอดบุตร</td>
              <td class="border border-black p-1">
                {{ data.stats?.maternity?.taken || "-" }}
              </td>
              <td class="border border-black p-1">
                {{ data.stats?.maternity?.thisTime || "-" }}
              </td>
              <td class="border border-black p-1">
                {{ data.stats?.maternity?.total || "-" }}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Approvers flow under stats -->
        <div class="mt-4 space-y-1 text-[11pt]">
          <p>
            (ลงชื่อ)........................................................
            ผู้ตรวจสอบ
          </p>
          <p>ตำแหน่ง........................................................</p>
          <p>
            วันที่............./.........................../.................
          </p>
        </div>

        <div
          v-if="data.substituteName"
          class="mt-4 border-t border-dashed border-gray-300 pt-3 text-[11pt]"
        >
          <p>ระหว่างลาข้าพเจ้าขอมอบงานให้</p>
          <p class="flex items-baseline">
            <span class="dotted-line flex-grow text-center mr-1">{{
              data.substituteName
            }}</span>
            <span>ผู้ปฏิบัติหน้าที่แทน</span>
          </p>
          <p class="mt-3">
            (ลงชื่อ)........................................................
            ผู้รับมอบ
          </p>
          <p class="mt-0.5 text-center">( {{ data.substituteName }} )</p>
          <p class="mt-3">
            (ลงชื่อ)........................................................
            ผู้อำนวยการกลุ่ม
          </p>
          <p class="mt-0.5 text-center">
            (........................................................)
          </p>
        </div>
      </div>

      <!-- Right Column: Commander Opinion -->
      <div class="border-l border-gray-300 pl-6 text-[12pt]">
        <p class="font-bold underline mb-3 text-center">
          ความเห็นผู้บังคับบัญชา
        </p>
        <div class="space-y-3">
          <p class="border-b border-dotted border-black w-full h-5"></p>
          <p class="border-b border-dotted border-black w-full h-5"></p>
        </div>
        <div class="text-center mt-4 space-y-1 text-[11pt]">
          <div class="h-[40px] flex items-end justify-center">
            <img
              v-if="data.directorSignatureUrl"
              :src="data.directorSignatureUrl"
              alt="Director signature"
              class="h-[34px] max-w-[170px] object-contain"
              crossorigin="anonymous"
            />
          </div>
          <p>
            (ลงชื่อ)........................................................
          </p>
          <p>(........................................................)</p>
          <p>ตำแหน่ง........................................................</p>
          <p>
            วันที่............./.........................../.................
          </p>
        </div>

        <p class="font-bold underline mt-6 text-center">คำสั่ง</p>
        <div class="flex justify-center gap-6 mt-3 select-none">
          <label class="flex items-center gap-2 cursor-pointer">
            <span class="w-4 h-4 border border-black inline-block"></span>
            อนุญาต
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <span class="w-4 h-4 border border-black inline-block"></span>
            ไม่อนุญาต
          </label>
        </div>

        <p class="border-b border-dotted border-black w-full mt-4 h-5"></p>

        <div class="text-center mt-4 space-y-1 text-[11pt]">
          <p>
            (ลงชื่อ)........................................................
          </p>
          <p>(........................................................)</p>
          <p>ตำแหน่ง........................................................</p>
          <p>
            วันที่............./.........................../.................
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface LeaveStats {
  taken?: number | string;
  thisTime?: number | string;
  total?: number | string;
}

interface LeaveData {
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
  totalDays?: number | string;
  reason?: string;
  lastLeaveType?: string;
  lastLeaveStartDate?: string;
  lastLeaveEndDate?: string;
  lastLeaveTotalDays?: number | string;
  contactAddress?: string;
  location?: string;
  province?: string;
  district?: string;
  subDistrict?: string;
  zipcode?: string;
  email?: string;
  phone?: string;
  substituteName?: string;
  teacherSignatureUrl?: string;
  directorSignatureUrl?: string;
  stats?: {
    vacation?: LeaveStats;
    sick?: LeaveStats;
    personal?: LeaveStats;
    maternity?: LeaveStats;
  };
}

const props = defineProps<{
  data: LeaveData;
}>();

const subjectText = computed(() => {
  const titles = {
    vacation: "ขอลาพักผ่อน",
    sick: "ขอลาป่วย",
    personal: "ขอลากิจส่วนตัว",
    maternity: "ขอลาคลอดบุตร",
  };
  return titles[props.data.type] || "ขอลา";
});

const thaiMonths = [
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

const formatThaiDateFull = (dateStr?: string) => {
  if (!dateStr)
    return "........................................................";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return `${date.getDate()} เดือน ${thaiMonths[date.getMonth()]} พ.ศ. ${date.getFullYear() + 543}`;
};

const formattedDate = computed(() => formatThaiDateFull(props.data.date));

const formatThaiDate = (dateStr?: string) => {
  if (!dateStr) return "......................................";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${date.getFullYear() + 543}`;
};
</script>

<style scoped>
.dotted-line {
  display: inline-block;
  border-bottom: 1px dotted #000;
  min-height: 1.4em;
  padding: 0 4px;
  vertical-align: bottom;
  color: #1e40af; /* Deep blue text */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media print {
  .dotted-line {
    color: #000000;
  }
  .a4-page {
    padding: 0;
    max-width: 100%;
  }
}
</style>
