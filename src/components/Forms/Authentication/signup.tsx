'use client'

import { useForm, SubmitHandler } from "react-hook-form";

interface IForm {
    email: string
    username: string;
    password: string;
}

export function SignUp() {

    const { register, handleSubmit, formState: { errors } } = useForm<IForm>();

    const onSubmit: SubmitHandler<IForm> = async (data) => {

        try {
            await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...data })
            })
        } catch (error) {
            console.log(`Error trying to register: ${error}`)
        }

    }

    return <>

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-16"
        >
            <div className="flex flex-col gap-4">
                <label>
                    <div className="flex justify-between gap-4">
                        <span>Username</span>
                        <span className="text-red-600">{errors.username && "Username is required"}</span>
                    </div>
                    <input className="input" type="text" {...register("username", { required: true })} />
                </label>
                <label>
                    <div className="flex justify-between gap-4">
                        <span>Email</span>
                        <span className="text-red-600">{errors.email && "Email is required"}</span>
                    </div>
                    <input className="input" type="text" {...register("email", { required: true })} />
                </label>
                <label>
                    <div className="flex justify-between gap-4">
                        <span>Password</span>
                        <span className="text-red-600">{errors.password && "Password is required"}</span>
                    </div>
                    <input className="input" type="password" {...register("password", { required: true })} />
                </label>
            </div>
            <button type="submit" className="bg-slate-600 p-3 rounded-lg">
                Register
            </button>
        </form>
    </>
}