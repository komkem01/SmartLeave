export const useAuthSession = () => {
  const clearLocalTokens = () => {
    if (!process.client) return

    localStorage.removeItem('smartleave:access_token')
    localStorage.removeItem('smartleave:token_type')
    localStorage.removeItem('smartleave:expires_at')
  }

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // Even if API logout fails, local tokens must be cleared.
    }

    clearLocalTokens()
    await navigateTo('/login')
  }

  return {
    clearLocalTokens,
    logout,
  }
}
