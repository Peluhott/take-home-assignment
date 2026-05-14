export default function Sidebar(){
    return (
        <div className= "w-64 min-h-screen bg-gray-200 text-black space-y-4 p-4">
            <h1>Sidebar</h1>
            <ul className = "space-y-4">
                <li>View Games</li>
                <li>Create Game</li>
                
                <li>View Platforms</li>
                <li>Add Platform</li>
                <li>Profile</li>
                <li>Logout</li>
                
            </ul>
        </div>
    )
}