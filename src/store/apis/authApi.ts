import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Signup } from "../../models/Signup.model";

export const authApi = createApi({
    reducerPath: "Auth",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/auth/"
    }),
    endpoints: (builder) => {
        return {
            registerUser: builder.mutation<{status: boolean, message: string}, Signup>({
                query: (signupData: Signup) => {
                    return {
                        url: "register",
                        method: "POST",
                        body: signupData
                    }
                }
            })
        }
    }
})

export const { useRegisterUserMutation } = authApi;