import { createAuthClient } from "better-auth/vue"

export const authClient = createAuthClient({
    sessionOptions: {
        refetchInterval: 0,
        refetchOnWindowFocus: false,
    }
})