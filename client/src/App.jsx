import { useState, useEffect } from "react";
import axios from "axios";

import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withXSRFToken = true;

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/user")
            .then((res) => {
                setUser(res.data);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {user ? <Dashboard user={user} /> : <Welcome />}
        </div>
    );
}

export default App;