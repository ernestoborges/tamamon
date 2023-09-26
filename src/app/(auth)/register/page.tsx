import { SignUp } from "@/components/Forms/Authentication/signup";

export default function Register() {
    return <>
        <div className="min-w-[30rem] flex flex-col items-center gap-10">
            <h2>Register</h2>
            <SignUp />
        </div>
    </>
}