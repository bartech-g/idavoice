import { defineStore } from 'pinia'
import { authClient } from '~~/utils/auth-client'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<typeof authClient.$Infer.Session.user | null>(null)
    const errorMessage = ref('')
    const loading = ref(false)
    function setUser(data: { user: typeof authClient.$Infer.Session.user } | null) {
        user.value = data?.user ?? null
    }

    async function signUp(firstName: string, lastName: string, email: string, password: string) {
        errorMessage.value = ''
        const { error, data } = await authClient.signUp.email({
            name: `${firstName} ${lastName}`,
            email,
            password,
            image: '',
        })
        if (error) { errorMessage.value = error.message!; return }
        setUser(data)
        await navigateTo('/')
    }

    async function signIn(email: string, password: string) {
        loading.value = true
        const { csrf } = useCsrf()
        const headers = new Headers()
        headers.append("csrf-token", csrf)
        errorMessage.value = ''
        const { error, data } = await authClient.signIn.email({ email, password, fetchOptions: { headers } },)
        if (error) { errorMessage.value = error.message!; return }
        setUser(data)
        loading.value = false
        await navigateTo('/')
    }

    async function signOut() {
        const { csrf } = useCsrf()
        const headers = new Headers()
        headers.append("csrf-token", csrf)
        await authClient.signOut({ fetchOptions: { headers } })
        setUser(null)
        await navigateTo('/')
    }

    // Used by the SSR plugin — getSession DOES return { user, session }
    function setSession(data: { user: typeof authClient.$Infer.Session.user; session: typeof authClient.$Infer.Session.session } | null) {
        user.value = data?.user ?? null
    }

    const isLoggedIn = computed(() => user.value !== null)

    return { user, errorMessage, loading, isLoggedIn, setUser, setSession, signUp, signIn, signOut }
})