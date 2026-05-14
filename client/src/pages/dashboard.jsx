import {useState, useEffect} from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import GameCard from "../components/GameCard";
import PlatformCard from "../components/PlatformCard";
import CreateGameForm from "../components/CreateGameForm";
import UpdateGameForm from "../components/UpdateGameForm";
import ProfileForm from "../components/ProfileForm";

// try something simple for now, just a message
export default function DashBoard({ user }){
    const [games, setGames] = useState([]);
    const [activeView, setActiveView] = useState("viewGames");
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [createSuccessMessage, setCreateSuccessMessage] = useState("");
    const [platforms, setPlatforms] = useState([]);

    // fetch games from backend and store in state use axios
   async function fetchGames() {
        try {
            const res = await axios.get("/game");
            setGames(res.data);
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    }

    useEffect(() => {
        fetchGames();
    }, []);

    async function fetchUserPlatforms() {
        try {
            const res = await axios.get("/game/user-platforms");
            setPlatforms(res.data);
        } catch (error) {
            console.error("Error fetching user platforms:", error);
            setPlatforms([]);
        }
    }

    //create function to set active view to pass in sidebar
    // possible views are, viewGames,creatGames,viewPlatforms, createPlatforms, viewProfile
    function handleViewChange(view) {
        setCreateSuccessMessage("");
        setActiveView(view);

        if (view === "viewPlatforms") {
            fetchUserPlatforms();
        }
    }

    function handleGameClick(game) {
        setCreateSuccessMessage("");
        setSelectedGame(game);
        setActiveView("updateGame");
    }

    async function handleGameUpdated() {
        await fetchGames();
        await fetchUserPlatforms();
        setSelectedGame(null);
        setCreateSuccessMessage("");
        setActiveView("viewGames");
    }

    async function handleGameCreated() {
        await fetchGames();
        await fetchUserPlatforms();
        setSearched(false);
        setSearchResults([]);
        setCreateSuccessMessage("Game created successfully.");
        setActiveView("viewGames");
    }

    async function handleSearch(query) {
        if (!query.trim()) {
            setSearched(false);
            setSearchResults([]);
            fetchGames();
            return;
        }

        try {
            const res = await axios.get("/search", {
                params: { searchTerm: query }
            });
            setSearchResults(res.data);
            setSearched(true);
        } catch (error) {
            console.error("Error searching games:", error);
            setSearchResults([]);
            setSearched(true);
        }
    }

    const displayedGames = searched ? searchResults : games;

    function renderGames() {
        if (displayedGames.length === 0) {
            return <p>{searched ? "No results found." : "No games found."}</p>;
        }

        return displayedGames.map((game) => (
            <GameCard
                key={game.id}
                game={game}
                onClick={() => handleGameClick(game)}
            />
        ));
    }

    function renderPlatforms() {
        if (platforms.length === 0) {
            return <p>No platforms found.</p>;
        }

        return platforms.map((platform) => (
            <PlatformCard
                key={platform.id}
                platform={platform}
            />
        ));
    }

    return (
        
        <div>
            
           {/* nav bar and search bar will be together in one div */}
           <div className = "flex flex-col justify-center items-center">
            <Navbar/>
            <SearchBar onSearch={handleSearch}/>
           </div>
           {/* sidebar and main content will be together in one div */}
           <div className = "flex">
            <Sidebar setActiveView={handleViewChange}/>
            <div className = "flex-1 flex justify-center items-center">
                {/* main content will go here, such as game cards ,forms etc */}
              {activeView === "viewGames" && (
            <div className="w-full px-6 py-8">
                {createSuccessMessage && (
                    <div className="mb-6 mx-auto max-w-3xl rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
                        {createSuccessMessage}
                    </div>
                )}
                <div className="grid grid-cols-3 gap-4 justify-items-center">
                    {renderGames()}
                </div>
            </div>
        )}
                {activeView === "createGame" && (
                    <CreateGameForm onGameCreated={handleGameCreated} />
                )}
                {activeView === "updateGame" && selectedGame && (
                    <UpdateGameForm
                        game={selectedGame}
                        onGameUpdated={handleGameUpdated}
                    />
                )}
                {activeView === "viewPlatforms" && (
                    <div className="w-full px-6 py-8">
                        <div className="grid grid-cols-3 gap-4 justify-items-center">
                            {renderPlatforms()}
                        </div>
                    </div>
                )}
                {activeView === "createPlatform" && (
                    <p>Add platforms will go here</p>
                )}
                {activeView === "viewProfile" && (
                    <ProfileForm user={user} />
                )}
            </div>
           </div>
        </div>)
}
