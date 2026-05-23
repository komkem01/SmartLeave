<template>
  <div
    class="min-h-screen flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 antialiased bg-slate-50"
  >
    <!-- ส่วนหัวเพื่อระยะห่างที่สมมาตร -->
    <div class="hidden sm:block"></div>

    <div class="sm:mx-auto w-full max-w-md">
      <!-- โลโก้แบรนดิ้งระบบ SmartLeave สะอาดประชาสรรค์ -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 mb-4 transition-transform hover:scale-105 duration-300"
        >
          <svg
            class="w-8 h-8"
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
        <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">
          SmartLeave
        </h2>
        <p class="mt-2 text-sm text-slate-500">
          ระบบบริหารจัดการการลางานดิจิทัล
          <span
            class="block mt-0.5 font-semibold text-slate-700 text-xs tracking-wider uppercase"
          >
            โรงเรียนสะอาดประชาสรรพ์
          </span>
        </p>
      </div>

      <!-- บล็อกฟอร์มหลัก (Login Card) -->
      <div
        class="bg-white py-8 px-6 shadow-sm border border-slate-200/60 rounded-2xl sm:px-10"
      >
        <form @submit.prevent="handleLogin" class="space-y-5">
          <AppInput
            id="email"
            v-model="email"
            label="อีเมล"
            type="text"
            required
            placeholder="user@example.com"
            :error="emailError"
          />

          <div>
            <AppInput
              id="password"
              v-model="password"
              label="รหัสผ่าน"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
              :error="passwordError"
            >
              <template #right>
                <button
                  type="button"
                  class="text-slate-400 hover:text-slate-600 focus:outline-none"
                  :aria-label="showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'"
                  @click="showPassword = !showPassword"
                >
                  <svg
                    v-if="showPassword"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                    />
                  </svg>
                </button>
              </template>
            </AppInput>
          </div>

          <!-- กล่องข้อมูลแนะนำรหัสผ่านสำหรับเดโม
          <div
            class="rounded-lg bg-blue-50/60 p-3 border border-blue-100 text-xs text-slate-600 space-y-1"
          >
            <span class="font-bold text-blue-800">ทดสอบเข้าสู่ระบบ:</span>
            <p>
              ครู:
              <code
                class="bg-blue-100/80 px-1 py-0.5 rounded text-blue-900 font-semibold"
                >somchai@saard.ac.th</code
              >
            </p>
            <p>
              ผอ.:
              <code
                class="bg-blue-100/80 px-1 py-0.5 rounded text-blue-900 font-semibold"
                >director@saard.ac.th</code
              >
            </p>
            <p>
              รหัสผ่าน:
              <code
                class="bg-blue-100/80 px-1 py-0.5 rounded text-blue-900 font-semibold"
                >123456</code
              >
            </p>
          </div> -->

          <!-- ปุ่มส่งข้อมูล (Submit Button) -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="isLoading || !!emailError || !!passwordError"
              class="relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span
                v-if="isLoading"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <svg
                  class="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </span>
              {{ isLoading ? "กำลังยืนยันตัวตน..." : "เข้าสู่ระบบ" }}
            </button>
          </div>

          <div class="relative pt-2">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-slate-200"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="bg-white px-2 text-xs text-slate-400">หรือ</span>
            </div>
          </div>

          <NuxtLink
            to="/register"
            class="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors duration-200"
          >
            ลงทะเบียนเข้าใช้งาน
          </NuxtLink>
        </form>
      </div>
    </div>

    <!-- ส่วนท้ายด้านล่าง -->
    <div class="mt-8 text-center">
      <p class="text-xs text-slate-400 tracking-wide">
        &copy; 2026 โรงเรียนสะอาดประชาสรรพ์. สงวนลิขสิทธิ์ระบบสารสนเทศภายใน
      </p>
    </div>
  </div>
</template>

<script setup>
const { addToast } = useToast();

// useHead({
//   title: "SmartLeave - เข้าสู่ระบบ",
//   link: [
//     { rel: "preconnect", href: "https://fonts.googleapis.com" },
//     { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
//     {
//       rel: "stylesheet",
//       href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sarabun:wght@300;400;500;600;700;800&display=swap",
//     },
//   ],
// });

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const isLoading = ref(false);
const config = useRuntimeConfig();

const emailError = ref("");
const passwordError = ref("");

const validateEmail = () => {
  emailError.value = "";
  const currentEmail = email.value.trim();

  if (!currentEmail) {
    emailError.value = "กรุณากรอกอีเมล";
    return;
  }

  if (!currentEmail.includes("@")) {
    emailError.value = "อีเมลต้องมีเครื่องหมาย @";
  }
};

const validatePassword = () => {
  passwordError.value = "";

  if (!password.value) {
    passwordError.value = "กรุณากรอกรหัสผ่านเข้าใช้งาน";
    return;
  }

  if (password.value.length < 6) {
    passwordError.value = "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษรขึ้นไป";
  }
};

const handleLogin = async () => {
  validateEmail();
  validatePassword();

  if (emailError.value || passwordError.value) {
    addToast(
      "error",
      "ข้อมูลเข้าสู่ระบบไม่ถูกต้อง",
      emailError.value || passwordError.value,
    );
    return;
  }

  isLoading.value = true;

  try {
    const loginResponse = await $fetch(`${config.public.BASE_API}/public/auth/login`, {
      method: "POST",
      body: {
        email: email.value.trim(),
        password: password.value,
      },
    });

    const accessToken = loginResponse?.data?.access_token;
    const tokenType = loginResponse?.data?.token_type || "Bearer";
    const expiresAt = loginResponse?.data?.expires_at;

    if (process.client && accessToken) {
      localStorage.setItem("smartleave:access_token", accessToken);
      localStorage.setItem("smartleave:token_type", tokenType);
      if (expiresAt) {
        localStorage.setItem("smartleave:expires_at", String(expiresAt));
      }
    }

    if (!accessToken) {
      throw new Error("ไม่พบข้อมูล token");
    }

    const meResponse = await $fetch(`${config.public.BASE_API}/member/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const account = meResponse?.data;
    if (!account) {
      throw new Error("ไม่พบข้อมูลผู้ใช้งาน");
    }

    const isDirector = account.role === "director";
    const redirectTo = isDirector ? "/director/dashboard" : "/teacher/dashboard";
    const roleName = isDirector ? "ผู้อำนวยการ" : "ครู";
    const displayName = `${account.firstname || ""} ${account.lastname || ""}`.trim();

    addToast(
      "success",
      "เข้าสู่ระบบสำเร็จ",
      `ยินดีต้อนรับ${roleName}${displayName} สู่ระบบ SmartLeave`,
    );
    await navigateTo(redirectTo);
  } catch (error) {
    const statusCode =
      typeof error === "object" && error !== null
        ? Number(error?.statusCode || error?.data?.statusCode || 0)
        : 0;
    const message =
      statusCode === 401
        ? "อีเมลหรือรหัสผ่านไม่ถูกต้อง"
        : "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง";

    addToast(
      "error",
      "เข้าสู่ระบบไม่สำเร็จ",
      message,
    );
  } finally {
    isLoading.value = false;
  }
};

watch(email, validateEmail);
watch(password, validatePassword);
</script>

<style scoped>
:global(body) {
  font-family: "Inter", "Sarabun", sans-serif;
}
</style>
