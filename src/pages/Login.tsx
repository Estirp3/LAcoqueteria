import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin123") {
            localStorage.setItem("isAdminLoggedIn", "true");
            navigate("/admin");
        } else {
            alert("Contraseña incorrecta");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
                <h1 className="text-2xl font-light tracking-widest text-center mb-8">ADMINISTRACIÓN</h1>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="w-full border border-gray-300 rounded px-4 py-3 mb-4 outline-none focus:border-black transition-colors"
                />
                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors tracking-widest text-sm"
                >
                    INGRESAR
                </button>
            </form>
        </div>
    );
}
