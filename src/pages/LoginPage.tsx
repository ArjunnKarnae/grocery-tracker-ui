import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginPageSchema } from "../schemas/loginPage.schema";
import type { LoginPageSchemaType } from "../types/loginPageSchema.type";
import { useVerifyLoginMutation } from "../store/apis/loginApi";
import type { Login } from "../models/Login.model";
import { useNavigate } from "react-router";
import { useEffect } from "react";


export const LoginPage = () => {

    const {register, formState: {errors, isSubmitting}, handleSubmit, reset} = useForm<LoginPageSchemaType>({resolver: zodResolver(loginPageSchema)});
    const [verifyLogin, results] = useVerifyLoginMutation();
    const navigate = useNavigate();

    useEffect(() => {
         if(results.isSuccess){
            navigate("/home");
        }
    }, [results.isSuccess, navigate])

    const onSubmit = (data: LoginPageSchemaType) => {
        const loginData: Login = {
            userName: data.userName,
            password: data.password
        }
        reset();
        verifyLogin(loginData);
        
    }

    return( 
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to My Pantry</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">UserName</label>
                    <input {...register("userName")} type="text" id="userName" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="User Name" />
                    {errors && errors.userName && <p className="text-red-600 text-sm mt-1">{errors.userName.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input {...register("password")} type="password" id="password" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="********" />
                    {errors && errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <div className="flex justify-end">
                    <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                </div>
                <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold cursor-pointer">
                   {isSubmitting ? "Submitting..." : "Login"} 
                </button>
                 {results.isError && <p className="text-center text-md text-red-600 mt-6">Please Enter valid Username/Password</p> }
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account?
                <button onClick={() => navigate("/signup")} className="text-blue-600 hover:underline focus:outline-none cursor-pointer">
                    Sign Up
                </button>
            </p>
        </div>
    )
}