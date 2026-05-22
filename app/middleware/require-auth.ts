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
    await $fetch(`${config.public.BASE_API}/member/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch {
    localStorage.removeItem('smartleave:access_token')
    localStorage.removeItem('smartleave:token_type')
    localStorage.removeItem('smartleave:expires_at')
    return navigateTo('/login')
  }
})
