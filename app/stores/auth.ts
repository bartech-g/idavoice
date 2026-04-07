import { defineStore } from 'pinia'
import { computed } from 'vue'

import { authClient } from '~~/utils/auth-client'

export const useAuthStore = defineStore('useAuthStore', () => {
    const session = authClient.useSession();
    const loading = computed(() => session.value.isPending || session.value.isRefetching)
    const user = computed(() => session.value.data?.user)

    async function signUp(firstName: string, lastName: string, email: string, password: string) {
        await authClient.signUp.email({
            name: `${firstName} ${lastName}`,
            email: email,
            password: password,
            image: "",
            callbackURL: "/",
        });
    }

    return {
        loading,
        user,
        signUp
    }
})