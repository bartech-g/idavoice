import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { navigateTo } from '#app'
// import { createAuthClient } from "better-auth/vue"

// export const authClient = createAuthClient({
//     sessionOptions: {
//         refetchInterval: 0,
//         refetchOnWindowFocus: false,
//     }
// })
import { authClient } from '~~/utils/auth-client'

export const useAuthStore = defineStore('useAuthStore', () => {
    const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);
    async function init() {
        const data = await authClient.useSession(useFetch);
        session.value = data
    }
    const loading = computed(() => session.value?.isPending)
    const user = computed(() => session.value?.data?.user)
    const errorMessage = ref("")

    async function signUp(firstName: string, lastName: string, email: string, password: string) {
        const { error } = await authClient.signUp.email({
            name: `${firstName} ${lastName}`,
            email: email,
            password: password,
            image: "",
        })

        if (error) {
            errorMessage.value = error.message!
            return
        }

        await navigateTo('/')
    }

    async function signIn(email: string, password: string) {
        const { error } = await authClient.signIn.email({
            email: email,
            password: password,
        })

        if (error) {
            errorMessage.value = error.message!
            return
        }

        await navigateTo('/')
    }

    async function signOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    navigateTo('/')
                },
            },
        })
    }

    return {
        init,
        loading,
        user,
        errorMessage,
        signUp,
        signIn,
        signOut,
    }
})