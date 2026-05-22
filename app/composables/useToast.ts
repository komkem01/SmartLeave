import { reactive } from "vue";

export type ToastType = "success" | "info" | "warning" | "error";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

// สร้าง State ที่เป็น Reactive เพื่อเก็บรายการแจ้งเตือนทั้งหมด
const toasts = reactive<ToastItem[]>([]);

export function useToast() {
  const addToast = (
    type: ToastType,
    title: string,
    message: string,
    duration = 4000,
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    toasts.push({ id, type, title, message, duration });

    // สั่งลบอัตโนมัติเมื่อครบเวลา
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string) => {
    const index = toasts.findIndex((t) => t.id === id);
    if (index !== -1) toasts.splice(index, 1);
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
}
