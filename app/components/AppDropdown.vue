<template>
  <div ref="rootEl" class="relative mt-1">
    <button
      :id="id"
      type="button"
      :disabled="disabled"
      class="flex w-full items-center justify-between rounded-xl border border-slate-300 px-3 py-2.5 text-sm transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:cursor-not-allowed"
      @click="toggleDropdown"
    >
      <span :class="selectedOption ? 'text-slate-900' : 'text-slate-400'">
        {{ selectedOption?.label || placeholder }}
      </span>
      <svg
        class="h-4 w-4 text-slate-500 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div
      v-if="isOpen && !disabled"
      class="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg"
    >
      <div class="max-h-56 overflow-auto">
        <button
          v-for="option in paginatedOptions"
          :key="String(option.value)"
          type="button"
          class="block w-full px-3 py-2 text-left text-sm transition-colors"
          :class="[
            isSelected(option)
              ? 'bg-blue-50 text-blue-700 font-semibold'
              : 'text-slate-700 hover:bg-slate-50',
            option.disabled ? 'cursor-not-allowed opacity-50 hover:bg-transparent' : ''
          ]"
          :disabled="option.disabled"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </button>
      </div>

      <div v-if="options.length === 0" class="px-3 py-2 text-sm text-slate-400">
        ไม่พบข้อมูล
      </div>

      <div
        v-if="options.length > 0"
        class="border-t border-slate-100 px-3 py-2 text-xs"
      >
        <div v-if="totalPages > 1" class="flex items-center justify-between">
          <button
            type="button"
            class="rounded-md border border-slate-200 px-2 py-1 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="currentPage === 1"
            @click="goToPrevPage"
          >
            ก่อนหน้า
          </button>

          <span class="text-slate-500">
            หน้า {{ currentPage }} / {{ totalPages }}
          </span>

          <button
            type="button"
            class="rounded-md border border-slate-200 px-2 py-1 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="currentPage === totalPages"
            @click="goToNextPage"
          >
            ถัดไป
          </button>
        </div>

        <div
          v-if="allowPageSizeSelect"
          class="mt-2 flex items-center justify-end gap-2"
          :class="totalPages <= 1 ? 'mt-0' : ''"
        >
          <label class="text-slate-500">แสดงต่อหน้า</label>
          <select
            v-model.number="selectedPageSize"
            class="rounded-md border border-slate-200 bg-white px-2 py-1 text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option
              v-for="size in normalizedPageSizeOptions"
              :key="size"
              :value="size"
            >
              {{ size }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type DropdownValue = string | number

interface DropdownOption {
  label: string
  value: DropdownValue
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  modelValue: DropdownValue | ''
  options: DropdownOption[]
  placeholder?: string
  disabled?: boolean
  id?: string
  pageSize?: number
  allowPageSizeSelect?: boolean
  pageSizeOptions?: number[]
}>(), {
  placeholder: 'เลือกข้อมูล',
  disabled: false,
  id: undefined,
  pageSize: 8,
  allowPageSizeSelect: true,
  pageSizeOptions: () => [5, 8, 10, 20, 50],
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: DropdownValue): void
}>()

const rootEl = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const currentPage = ref(1)
const selectedPageSize = ref(8)

const normalizedPageSizeOptions = computed(() => {
  const source = props.pageSizeOptions.length > 0 ? props.pageSizeOptions : [5, 8, 10, 20, 50]
  const cleaned = source
    .map((size) => Number(size))
    .filter((size) => Number.isFinite(size) && size > 0)
    .map((size) => Math.floor(size))

  const options = Array.from(new Set(cleaned)).sort((a, b) => a - b)
  if (options.length === 0) return [8]
  return options
})

const effectivePageSize = computed(() => {
  if (!props.allowPageSizeSelect) {
    return Math.max(1, Math.floor(Number(props.pageSize) || 8))
  }

  return Math.max(1, Math.floor(Number(selectedPageSize.value) || 8))
})

const totalPages = computed(() => {
  const size = effectivePageSize.value
  return Math.max(1, Math.ceil(props.options.length / size))
})

const paginatedOptions = computed(() => {
  const size = effectivePageSize.value
  const start = (currentPage.value - 1) * size
  return props.options.slice(start, start + size)
})

const selectedOption = computed(() => {
  return props.options.find((option) => String(option.value) === String(props.modelValue))
})

const toggleDropdown = () => {
  if (props.disabled) return
  if (!isOpen.value) currentPage.value = 1
  isOpen.value = !isOpen.value
}

const selectOption = (option: DropdownOption) => {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const isSelected = (option: DropdownOption) => {
  return String(option.value) === String(props.modelValue)
}

const handleClickOutside = (event: MouseEvent) => {
  if (!rootEl.value) return
  if (!rootEl.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

const goToPrevPage = () => {
  if (currentPage.value <= 1) return
  currentPage.value -= 1
}

const goToNextPage = () => {
  if (currentPage.value >= totalPages.value) return
  currentPage.value += 1
}

watch(() => props.disabled, (disabled) => {
  if (disabled) isOpen.value = false
})

watch(() => props.pageSize, (size) => {
  const parsed = Math.max(1, Math.floor(Number(size) || 8))
  selectedPageSize.value = parsed
}, { immediate: true })

watch(normalizedPageSizeOptions, (sizes) => {
  if (!sizes.includes(selectedPageSize.value)) {
    selectedPageSize.value = sizes[0]
  }
}, { immediate: true })

watch(selectedPageSize, () => {
  currentPage.value = 1
})

watch(() => props.options, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }
}, { deep: true })

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
