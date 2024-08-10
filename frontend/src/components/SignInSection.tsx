import { signInParams, signInSchema } from "@rishit1275/blogging-website-package"
import { useRef, useState } from "react"
import { errorToast } from "./ToastComponents"
import axios from "axios"
import { useRecoilValue } from "recoil"
import { serverLocationAtom } from "../atom/atoms"
import { useNavigate } from "react-router-dom"

export default function SignInSection({ toggleForm }: { toggleForm: () => void }) {
    const serverLocation = useRecoilValue(serverLocationAtom)
    const navigate = useNavigate()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    
    const handleSubmit = async () => {
        setIsSubmitting(true);

        const receivedSignInInput: signInParams = {
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || ""
        }

        const parsingResult = signInSchema.safeParse(receivedSignInInput)
        if (!parsingResult.success){
            parsingResult.error.errors.map((element) => {
                errorToast(element.message)
            })
            setIsSubmitting(false)
            return;
        }

        try {
            const result = await axios.post(`${serverLocation}/user/signin`, receivedSignInInput)
            localStorage.setItem("Authorization", `Bearer ${result.data.token}`)
            localStorage.setItem("UserDetails", JSON.stringify({
                id: result.data.user.id,
                name: result.data.user.name,
                email: result.data.user.email
            }))
            setIsSubmitting(false)
            navigate("/")
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                errorToast(error.response.data.msg)
            } else {
                errorToast("Unexpected Error")
                console.error('Unexpected error:', error);
            }
            setIsSubmitting(false)
        }
    };

    return (
        <div className="w-full max-w-md cursor-default">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <p className="mb-6 text-gray-600">Welcome back! Please enter your details.</p>
            <form onSubmit={(e) => {
                e.preventDefault()
                if(!isSubmitting){handleSubmit()}
            }}>
                <input ref={emailRef} type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded outline-none" />

                <input ref={passwordRef} type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded outline-none" />

                <button className="w-full bg-black text-white p-3 mb-3 rounded text-center cursor-pointer">{isSubmitting ? "Signing In..." : "Sign In"}</button>

                <p className="w-full text-center text-gray-600 text-sm">Dont't have an account yet? <a className="underline cursor-pointer" onClick={toggleForm}>Sign up</a></p>
            </form>
        </div>
    )
}