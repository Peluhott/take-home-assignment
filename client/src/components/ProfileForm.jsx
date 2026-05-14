import { useState } from "react";
import axios from "axios";

export default function ProfileForm({ user }) {
    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await axios.put("/user", {
                name,
                email,
                password
            });

            window.location.reload();
        } catch (error) {
            console.error("Error updating profile:", error.response?.data || error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-bold text-center">
                    User Profile
                </h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3"
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                >
                    Save Profile
                </button>
            </form>
        </div>
    );
}
