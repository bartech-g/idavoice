import { useAuthStore } from '~~/stores/auth'
import { auth } from '~~/server/lib/auth'

export default defineNuxtPlugin(async () => {
    const authStore = useAuthStore()
    const headers = useRequestHeaders(['cookie'])

    try {
        const session = await auth.api.getSession({ headers: new Headers(headers as Record<string, string>) })
        authStore.setSession(session ?? null)
    } catch {
        authStore.setSession(null)
    }
})