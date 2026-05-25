export default defineNuxtRouteMiddleware(async () => {
  if (process.server) {
    return
  }

  const token = localStorage.getItem('smartleave:access_token')
  if (!token) {
    return navigateTo('/login')
  }

  const config = useRuntimeConfig()

  try {
    const meRes = await $fetch<any>(`${config.public.BASE_API}/member/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const role = String(meRes?.data?.role || '')
    if (role !== 'school_admin') {
      return navigateTo('/login')
    }
  } catch {
    localStorage.removeItem('smartleave:access_token')
    localStorage.removeItem('smartleave:token_type')
    localStorage.removeItem('smartleave:expires_at')
    return navigateTo('/login')
  }
})
