import { defineStore } from 'pinia'
import { computed } from 'vue'
import { createAuthClient } from "better-auth/vue"

const authClient = createAuthClient();

export const useAuthStore = defineStore('useAuthStore', () => {
    const session = authClient.useSession();
    const loading = computed(() => session.value.isPending || session.value.isRefetching)
    const user = computed(() => session.value.data?.user)

    async function signUp(firstName: string, lastName: string, email: string, password: string) {
        await authClient.signUp.email({
            name: `${firstName} ${lastName}`, // required
            email: email, // required
            password: password, // required
            image: "",
            callbackURL: "/dashboard",
        });
    }
    return {
        //Computed
        loading,
        user,
        //Actions
        signUp
    }
})