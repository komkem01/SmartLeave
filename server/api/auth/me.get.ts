import { createError, deleteCookie, getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'smartleave_access_token')
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'unauthorized' })
  }

  const config = useRuntimeConfig()

  try {
    return await $fetch(`${config.public.BASE_API}/member/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error: any) {
    if ((error?.statusCode || error?.response?.status) === 401) {
      deleteCookie(event, 'smartleave_access_token', { path: '/' })
    }

    throw createError({
      statusCode: error?.statusCode || error?.response?.status || 401,
      statusMessage: error?.data?.message || error?.statusMessage || 'unauthorized'
    })
  }
})
