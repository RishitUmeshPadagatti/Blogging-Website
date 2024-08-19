import { signUpParams, signUpSchema } from "@rishit1275/blogging-website-package"
import { useRef, useState } from "react"
import { errorToast } from "../ToastComponents"
import axios from "axios"
import { useRecoilValue } from "recoil"
import { serverLocationAtom } from "../../atom/atoms"
import { useNavigate } from "react-router-dom"
import { capitalizedName } from "../../functions/capitalizedName"

export default function SignUpSection({ toggleForm }: { toggleForm: () => void }) {
    const serverLocation = useRecoilValue(serverLocationAtom)
    const navigate = useNavigate()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const receivedSignUpInput: signUpParams = {
            name: capitalizedName(nameRef.current?.value || ""),
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || ""
        }

        const parsingResult = signUpSchema.safeParse(receivedSignUpInput)
        if (!parsingResult.success){
            parsingResult.error.errors.map((element) => {
                errorToast(element.message)
            })
            setIsSubmitting(false)
            return;
        }

        try {
            const result = await axios.post(`${serverLocation}/user/signup`, receivedSignUpInput)
            localStorage.setItem("Authorization", `Bearer ${result.data.token}`);
            localStorage.setItem("UserDetails", JSON.stringify({
                id: result.data.user.id,
                name: result.data.user.name,
                email: result.data.user.email
            }))
            localStorage.setItem("serverLocation", serverLocation)
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
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <p className="mb-6 text-gray-600">Enter your details to create an account</p>
            <form onSubmit={(e) => {
                e.preventDefault()
                if(!isSubmitting){handleSubmit()}
            }}>
                <input ref={nameRef} type="text" placeholder="Name" className="w-full p-3 mb-4 border rounded outline-none capitalize" />

                <input ref={emailRef} type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded outline-none" />

                <input ref={passwordRef} type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded outline-none" />

                <button className="w-full bg-black text-white p-3 mb-3 rounded text-center cursor-pointer">{isSubmitting ? "Signing Up..." : "Sign Up"}</button>

                <p className="w-full text-center text-gray-600 text-sm">Already have an account? <a className="underline cursor-pointer" onClick={toggleForm}>Sign in</a></p>
            </form>
        </div>
    )
}