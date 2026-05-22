<script setup Dok>
defineProps({
  // ทิศทางการแสดงผล: true = เต็มหน้าจอ, false = เฉพาะจุดที่นำไปวาง
  fullscreen: {
    type: Boolean,
    default: false,
  },
  // ปรับขนาดของตัวหมุน (สไตล์สปินเนอร์)
  size: {
    type: String,
    default: "md", // ตัวเลือก: 'sm' | 'md' | 'lg'
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  // ข้อความที่จะให้แสดงใต้ไอคอนโหลด
  text: {
    type: String,
    default: "กำลังโหลดข้อมูล...",
  },
});
</script>

<template>
  <div
    :class="[
      'flex flex-col items-center justify-center transition-all duration-300',
      fullscreen
        ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] w-screen h-screen'
        : 'w-full py-8',
    ]"
  >
    <div class="relative flex items-center justify-center">
      <div
        :class="[
          'border-2 border-gray-100 border-t-blue-600 rounded-full animate-spin',
          size === 'sm' ? 'w-8 h-8 border-[2px]' : '',
          size === 'md' ? 'w-14 h-14 border-[3px]' : '',
          size === 'lg' ? 'w-20 h-20 border-[4px]' : '',
        ]"
      ></div>

      <div
        :class="[
          'absolute rounded-full bg-blue-500/10 animate-ping',
          size === 'sm' ? 'w-4 h-4' : '',
          size === 'md' ? 'w-8 h-8' : '',
          size === 'lg' ? 'w-12 h-12' : '',
        ]"
      ></div>
    </div>

    <div class="mt-4 text-center">
      <p class="text-xs font-bold tracking-widest text-blue-600 uppercase">
        SmartLeave
      </p>
      <p
        v-if="text"
        class="text-xs text-gray-400 mt-1 font-medium tracking-wide"
      >
        {{ text }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* คุณสามารถเขียน CSS ตกแต่งเพิ่มได้ที่นี่ แต่ตอนนี้ครอบคลุมด้วย Tailwind หมดแล้วครับ */
</style>
