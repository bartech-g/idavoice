import { useAuthStore } from '~~/stores/auth'
import { authClient } from '~~/utils/auth-client'

export default defineNuxtPlugin(async () => {
    const authStore = useAuthStore()

    // Only fetch if we don't already have data from SSR
    if (!authStore.user) {
        const { data } = await authClient.getSession()
        authStore.setSession(data ?? null)
    }
})