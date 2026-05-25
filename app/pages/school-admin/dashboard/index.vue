<template>
  <div class="min-h-screen bg-slate-50 font-sans antialiased">
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div>
            <h1 class="text-lg font-bold text-slate-900">SmartLeave</h1>
            <p class="text-xs text-slate-500">แดชบอร์ดแอดมินโรงเรียน</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-right hidden sm:block">
              <p class="text-sm font-semibold text-slate-800">{{ displayName }}</p>
              <p class="text-3xs text-slate-500 uppercase tracking-wider">School Admin</p>
            </div>
            <AppLogoutButton />
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <section class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 class="text-lg font-bold text-slate-900">คำขอลงทะเบียนรออนุมัติ</h2>
            <p class="text-xs text-slate-500">เฉพาะแอดมินโรงเรียนเท่านั้นที่อนุมัติได้</p>
          </div>
          <button
            type="button"
            class="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            :disabled="isLoading"
            @click="fetchPendingMembers"
          >
            {{ isLoading ? 'กำลังโหลด...' : 'รีเฟรชรายการ' }}
          </button>
        </div>
      </section>

      <section v-if="pendingMembers.length === 0" class="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
        <p class="text-sm font-semibold text-slate-800">ไม่มีรายการรออนุมัติ</p>
        <p class="text-xs text-slate-500 mt-1">เมื่อมีครูลงทะเบียนใหม่ ระบบจะแสดงรายการในหน้านี้</p>
      </section>

      <section v-else class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                <th class="py-3 px-4">ชื่อ</th>
                <th class="py-3 px-4">อีเมล</th>
                <th class="py-3 px-4">กลุ่มสาระฯ</th>
                <th class="py-3 px-4">วันที่สมัคร</th>
                <th class="py-3 px-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
              <tr v-for="member in pendingMembers" :key="member.id">
                <td class="py-3 px-4 font-semibold text-slate-900">{{ member.firstname }} {{ member.lastname }}</td>
                <td class="py-3 px-4">{{ member.email }}</td>
                <td class="py-3 px-4">{{ member.department || '-' }}</td>
                <td class="py-3 px-4">{{ formatDisplayDateTime(member.created_at) }}</td>
                <td class="py-3 px-4">
                  <div class="flex justify-end gap-2">
                    <button
                      type="button"
                      class="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                      :disabled="actionLoadingID === member.id"
                      @click="openRejectModal(member)"
                    >
                      ปฏิเสธ
                    </button>
                    <button
                      type="button"
                      class="rounded-lg border border-emerald-200 bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                      :disabled="actionLoadingID === member.id"
                      @click="openApproveModal(member)"
                    >
                      {{ actionLoadingID === member.id ? 'กำลังบันทึก...' : 'อนุมัติ' }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isRejectModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeRejectModal"></div>

        <div class="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
            <h3 class="text-base font-bold text-slate-900">ยืนยันการปฏิเสธผู้สมัคร</h3>
            <p class="mt-1 text-xs text-slate-500">โปรดระบุเหตุผลก่อนยืนยันการปฏิเสธ</p>
          </div>

          <form class="space-y-4 p-6" @submit.prevent="confirmReject">
            <div class="text-sm text-slate-700">
              ผู้สมัคร:
              <span class="font-semibold text-slate-900">
                {{ rejectTarget?.firstname }} {{ rejectTarget?.lastname }}
              </span>
            </div>

            <div>
              <label for="rejectReason" class="block text-xs font-semibold text-slate-700">
                เหตุผลการปฏิเสธ <span class="text-rose-500">*</span>
              </label>
              <textarea
                id="rejectReason"
                v-model="rejectReason"
                rows="4"
                required
                placeholder="ระบุเหตุผล เช่น ข้อมูลเอกสารไม่ครบถ้วน"
                class="mt-1.5 block w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              ></textarea>
            </div>

            <div class="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                class="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200"
                @click="closeRejectModal"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                class="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700"
                :disabled="!rejectTarget || actionLoadingID === rejectTarget.id"
              >
                {{ rejectTarget && actionLoadingID === rejectTarget.id ? 'กำลังบันทึก...' : 'ยืนยันปฏิเสธ' }}
              </button>
            </div>
          </form>
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
      <div v-if="isApproveModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeApproveModal"></div>

        <div class="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
            <h3 class="text-base font-bold text-slate-900">ยืนยันการอนุมัติผู้สมัคร</h3>
            <p class="mt-1 text-xs text-slate-500">เมื่ออนุมัติแล้ว ผู้สมัครจะสามารถเข้าสู่ระบบได้ทันที</p>
          </div>

          <div class="space-y-4 p-6">
            <div class="text-sm text-slate-700">
              ผู้สมัคร:
              <span class="font-semibold text-slate-900">
                {{ approveTarget?.firstname }} {{ approveTarget?.lastname }}
              </span>
            </div>

            <div class="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                class="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200"
                @click="closeApproveModal"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                class="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                :disabled="!approveTarget || actionLoadingID === approveTarget.id"
                @click="confirmApprove"
              >
                {{ approveTarget && actionLoadingID === approveTarget.id ? 'กำลังบันทึก...' : 'ยืนยันอนุมัติ' }}
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

interface PendingMember {
  id: string
  firstname: string
  lastname: string
  email: string
  department?: string
  created_at: string
}

definePageMeta({
  middleware: ['require-school-admin'],
})

const config = useRuntimeConfig()
const BASE = config.public.BASE_API
const { addToast } = useToast()

const me = ref<any>(null)
const isLoading = ref(false)
const actionLoadingID = ref('')
const pendingMembers = ref<PendingMember[]>([])
const isRejectModalOpen = ref(false)
const rejectTarget = ref<PendingMember | null>(null)
const rejectReason = ref('')
const isApproveModalOpen = ref(false)
const approveTarget = ref<PendingMember | null>(null)

const displayName = computed(() => {
  const first = String(me.value?.firstname || '').trim()
  const last = String(me.value?.lastname || '').trim()
  const fullName = `${first} ${last}`.trim()
  return fullName || 'แอดมินโรงเรียน'
})

const formatDisplayDateTime = (dateText: string) => {
  const d = new Date(dateText)
  if (Number.isNaN(d.getTime())) return dateText
  return d.toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })
}

const authHeaders = () => {
  const token = process.client ? localStorage.getItem('smartleave:access_token') : ''
  return token ? { Authorization: `Bearer ${token}` } : undefined
}

const fetchCurrentUser = async () => {
  const res = await $fetch<any>(`${BASE}/member/me`, { headers: authHeaders() })
  me.value = res?.data ?? null
}

const fetchPendingMembers = async () => {
  isLoading.value = true
  try {
    const res = await $fetch<any>(`${BASE}/member/pending`, { headers: authHeaders() })
    pendingMembers.value = (res?.data ?? []) as PendingMember[]
  } catch {
    addToast('error', 'โหลดข้อมูลไม่สำเร็จ', 'ไม่สามารถดึงรายการรออนุมัติได้')
  } finally {
    isLoading.value = false
  }
}

const openRejectModal = (member: PendingMember) => {
  rejectTarget.value = member
  rejectReason.value = ''
  isRejectModalOpen.value = true
}

const closeRejectModal = () => {
  isRejectModalOpen.value = false
  rejectTarget.value = null
  rejectReason.value = ''
}

const openApproveModal = (member: PendingMember) => {
  approveTarget.value = member
  isApproveModalOpen.value = true
}

const closeApproveModal = () => {
  isApproveModalOpen.value = false
  approveTarget.value = null
}

const updateApproval = async (memberID: string, approved: boolean, reason?: string) => {
  if (!approved && !String(reason || '').trim()) {
    addToast('warning', 'ยังไม่กรอกเหตุผล', 'กรุณาระบุเหตุผลก่อนยืนยันการปฏิเสธ')
    return
  }

  actionLoadingID.value = memberID
  try {
    await $fetch(`${BASE}/member/${memberID}/approve`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: {
        approved,
        reject_reason: String(reason || '').trim(),
      },
    })

    addToast(
      approved ? 'success' : 'info',
      approved ? 'อนุมัติสำเร็จ' : 'ปฏิเสธสำเร็จ',
      approved ? 'ผู้สมัครสามารถเข้าใช้งานได้แล้ว' : 'ระบบบันทึกการปฏิเสธเรียบร้อยแล้ว',
    )

    if (approved) {
      closeApproveModal()
    }

    if (!approved) {
      closeRejectModal()
    }

    await fetchPendingMembers()
  } catch {
    addToast('error', 'บันทึกไม่สำเร็จ', 'ไม่สามารถอัปเดตผลการอนุมัติได้')
  } finally {
    actionLoadingID.value = ''
  }
}

const confirmReject = async () => {
  if (!rejectTarget.value) {
    return
  }

  await updateApproval(rejectTarget.value.id, false, rejectReason.value)
}

const confirmApprove = async () => {
  if (!approveTarget.value) {
    return
  }

  await updateApproval(approveTarget.value.id, true)
}

onMounted(async () => {
  await Promise.all([fetchCurrentUser(), fetchPendingMembers()])
})
</script>
