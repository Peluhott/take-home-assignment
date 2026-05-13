import {useState} from 'react';
import axios from 'axios';



export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        // send csrf token request to backend to set cookie
        await axios.get('/sanctum/csrf-cookie');
        // send login request to backend
        try {
            await axios.post('/user/login', { email, password });
            // on success, reload the page to update the user state in App.jsx
            window.location.reload();
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    }

    return (
        <div className = "flex flex-col items-center justify-center gap-4 p-8 border rounded-lg shadow-lg bg-white">
            <div>
                <h2>
                    Login to your account
                </h2>
            </div>
        <form className ="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input className = "border p-2 rounded"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input className = "border p-2 rounded"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
            </button>
        </form>
        </div>
    );


}