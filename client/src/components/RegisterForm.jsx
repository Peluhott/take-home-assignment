import {useState} from 'react';
import axios from 'axios';

export default function RegisterForm({onSwitchToLogin}) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        // send request to backend to register user using axios
        try {
            await axios.post('/user/register', { email, name, password });
            // on success, reload the page to update the user state in App.jsx
            window.location.reload();
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please check your information and try again.');
        }
    }

    return (
        <div className = "flex flex-col items-center justify-center gap-4 p-8 border rounded-lg shadow-lg bg-white">
            <div>
                <h2>
                    Register for an account
                </h2>
            </div>
            <form className ="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input className = "border p-2 rounded"
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input className = "border p-2 rounded"
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input className = "border p-2 rounded"
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Register
            </button>
            <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={onSwitchToLogin}>
                Back to Login

            </button>
        </form>


        </div>
        
    );
}