import { createError, readBody, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; password?: string }>(event)
  const email = body?.email?.trim()
  const password = body?.password

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'invalid-request' })
  }

  const config = useRuntimeConfig()

  try {
    const response = await $fetch<any>(`${config.public.BASE_API}/public/auth/login`, {
      method: 'POST',
      body: {
        email,
        password
      }
    })

    const data = response?.data
    const accessToken = data?.access_token
    const expiresAt = Number(data?.expires_at || 0)

    if (!accessToken || !expiresAt) {
      throw createError({ statusCode: 500, statusMessage: 'invalid-auth-response' })
    }

    const maxAge = Math.max(60, expiresAt - Math.floor(Date.now() / 1000))
    setCookie(event, 'smartleave_access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge
    })

    return {
      data: {
        access_token: accessToken,
        member: data?.member || null,
        expires_at: expiresAt,
        token_type: data?.token_type || 'Bearer'
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || error?.response?.status || 401,
      statusMessage: error?.data?.message || error?.statusMessage || 'login-failed'
    })
  }
})
