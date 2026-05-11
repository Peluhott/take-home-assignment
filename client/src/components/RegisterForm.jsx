import {useState} from 'react';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, name, password }),
            });
            // if response is successful let user know 
        }
        catch (error) {
            console.error('Registration failed:', error);
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
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input className = "border p-2 rounded"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input className = "border p-2 rounded"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Register
            </button>
        </form>


        </div>
        
    );
}