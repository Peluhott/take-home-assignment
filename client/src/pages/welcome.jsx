import LoginForm from "../components/loginForm";
import Navbar from "../components/navbar";
import RegisterForm from "../components/registerForm";
import { useState } from "react";

export default function Welcome(){
    
    function switchToRegister(){
        setShowRegister(true);
    }

    function switchToLogin(){
        setShowRegister(false);
    }

    const [showRegister, setShowRegister] = useState(false);
    return (
        <div>
            <Navbar />
            {showRegister ? (
                <RegisterForm onSwitchToLogin={switchToLogin} />
            ) : (
                <LoginForm onSwitchToRegister={switchToRegister} />
            )}

        </div>
    )
}