import { SignIn } from "@/components/Forms/Authentication/signin";

export default function Login() {
    return <>
        <div className="min-w-[30rem] flex flex-col items-center gap-10">
            <h2>Login</h2>
            <SignIn />
        </div>
    </>
}