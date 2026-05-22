<script setup lang="ts">
import { computed, useSlots } from "vue";

// กำหนด Props สำหรับปรับแต่ง Input จากภายนอก
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text", // รองรับ text, password, email, tel
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substring(2, 9)}`,
  },
  error: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

// กำหนด Emit เพื่อส่งค่ากลับไปหา v-model ของตัวแม่
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const slots = useSlots();
const hasRightSlot = computed(() => Boolean(slots.right));
</script>

<template>
  <div class="w-full flex flex-col gap-1.5 mb-4">
    <label
      v-if="label"
      :for="id"
      class="text-sm font-medium text-gray-700 flex items-center gap-0.5"
    >
      {{ label }}
      <span v-if="required" class="text-rose-500 font-bold">*</span>
    </label>

    <div class="relative rounded-md shadow-sm">
      <input
        :id="id"
        v-model="value"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        class="block w-full rounded-lg border px-4 py-2.5 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
        :class="[
          hasRightSlot ? 'pr-11' : '',
          error
            ? 'border-rose-400 text-rose-900 placeholder-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
            : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20',
        ]"
      />

      <div
        v-if="hasRightSlot"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <slot name="right" />
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="transform -translate-y-1 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-1 opacity-0"
    >
      <p v-if="error" class="text-xs text-rose-500 font-medium mt-0.5">
        {{ error }}
      </p>
    </Transition>
  </div>
</template>
