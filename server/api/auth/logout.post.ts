import { deleteCookie } from 'h3'

export default defineEventHandler(async (event) => {
  deleteCookie(event, 'smartleave_access_token', { path: '/' })
  return { data: true }
})
