import axios from "axios";

export default function Sidebar({setActiveView}){
    async function handleLogout() {
        try {
            await axios.post("/user/logout");
            window.location.reload();
        } catch (error) {
            console.error("Error logging out:", error.response?.data || error);
        }
    }

    return (
        <div className= "w-64 min-h-screen bg-gray-200 text-black space-y-4 p-4">
            <ul className = "space-y-4">
                <li
                    onClick={() => setActiveView("viewGames")}
                    className = "cursor-pointer hover:text-blue-500"
                >View Games</li>
                <li
                    onClick={() => setActiveView("createGame")}
                    className = "cursor-pointer hover:text-blue-500"
                >Create Game</li>
                <li
                    onClick={() => setActiveView("viewPlatforms")}
                    className = "cursor-pointer hover:text-blue-500"
                >View Platforms</li>
                <li
                    onClick={() => setActiveView("viewGenres")}
                    className = "cursor-pointer hover:text-blue-500"
                >View By Genre</li>
                <li
                    onClick={() => setActiveView("viewProfile")}
                    className = "cursor-pointer hover:text-blue-500"
                >Profile</li>
                <li
                    onClick={handleLogout}
                className ="cursor-pointer hover:text-blue-500"
                >Logout</li>
                
            </ul>
        </div>
    )
}
