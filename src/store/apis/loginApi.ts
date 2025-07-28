import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Login } from "../../models/Login.model";


export const loginApi = createApi({
    reducerPath: "Login",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/auth/"
    }),
    endpoints: (builder) => {
        return {
            verifyLogin: builder.mutation<{status: boolean, message: string}, Login>({
                query: (login: Login) => {
                    return {
                        url: "login",
                        method: "POST",
                        body: login
                    }
                },
                async onQueryStarted(_queryArgument, {queryFulfilled}) {
                    try{
                        const { meta } = await queryFulfilled;
                        const token = meta?.response?.headers.get('X-Auth-Token');
                        if(token){
                           localStorage.setItem("authToken", token);
                        }
                    }catch(err){
                        console.log("Failed to read Response "+err);
                    }
                },
            })
        }
    }
})

export const { useVerifyLoginMutation } = loginApi;