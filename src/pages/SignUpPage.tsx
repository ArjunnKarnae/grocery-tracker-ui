import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useForm } from "react-hook-form";
import { SignupSchema } from "../schemas/Signup.schema";
import type { SignupSchemaType } from "../types/SignupSchema.type";
import { useRegisterUserMutation } from "../store/apis/authApi";
import type { Signup } from "../models/Signup.model";
import { useEffect } from "react";
import { useNavigate } from "react-router";


export const SignUpPage = () => {
    const {register, formState: {errors, isSubmitting}, handleSubmit, reset} = useForm<SignupSchemaType>({resolver: zodResolver(SignupSchema)});
    const [registerUser, results] = useRegisterUserMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if(results.isSuccess){
            navigate("/login");
        }
    }, [results.isSuccess, navigate]);

    const onSubmit = (data: SignupSchemaType) => {
        const userData: Signup = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            userName: data.userName,
            password: data.password
        }
        registerUser(userData);
        reset();
    }

    return (
         <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">FirstName:</label>
                    <input {...register("firstName")} type="text" id="firstName" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., John" />
                    {errors && errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">LastName:</label>
                    <input {...register("lastName")} type="text" id="lastName" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Doe" />
                    {errors && errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                    <input {...register("email")} type="email" id="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your@example.com" />
                    {errors && errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">UserName:</label>
                    <input {...register("userName")} type="text" id="userName" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Choose a username" />
                    {errors && errors.userName && <p className="text-red-600 text-sm mt-1">{errors.userName.message}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
                    <input {...register("password")} type="password" id="password" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="At least 8 characters" />
                    {errors && errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
                </div>
                 <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password:</label>
                    <input {...register("confirmPassword")} type="password" id="confirmPassword" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Re-enter password" />
                    {errors && errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>
                 <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold cursor-pointer">
                   {isSubmitting ? "Submitting..." : "Sign Up"} 
                </button>
            </form>
         </div>
    );
}