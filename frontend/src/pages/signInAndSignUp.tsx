import { useState } from "react";
import SignUpSection from "../components/SignupAndSignin/SignUpSection";
import SignInSection from "../components/SignupAndSignin/SignInSection";
import RandomQuote from "../components/SignupAndSignin/RandomQuote";
import { SetToastContainer } from "../components/SignupAndSignin/ToastComponents";

export default function SignInAndSignUp() {
    const [isSignUpActive, setIsSignUpActive] = useState(true)

    const toggleForm = () => {
        setIsSignUpActive(c => !c)
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-gray-100">
            <SetToastContainer/>

            {/* Sign Up Section */}
            <div className={`border border-black w-full h-[100vh] md:w-1/2 p-8 flex items-center justify-center ${isSignUpActive ? '' : 'hidden md:flex bg-black'}`}>
                {isSignUpActive ? (
                    <SignUpSection toggleForm={toggleForm} />
                ) : (
                    <RandomQuote />
                )}
            </div>

            {/* Sign In Section */}
            <div className={`border border-black w-full h-[100vh] md:w-1/2 p-8 flex items-center justify-center ${isSignUpActive ? 'hidden md:flex bg-black' : ''}`}>
                {!isSignUpActive ? (
                    <SignInSection toggleForm={toggleForm} />
                ) : (
                    <RandomQuote />
                )}
            </div>
        </div>
    )
}