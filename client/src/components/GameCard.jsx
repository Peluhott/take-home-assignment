
export default function GameCard({game, onClick}){
    return (
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden w-72 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={onClick}
      >

    <img
        src={game.image_url || "/defaultgame.avif"}
        alt={game.title}
        className="w-full h-[18.5rem] object-cover"
    />

    <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">
            {game.title}
        </h2>

        <p className="text-gray-600 mt-2">
            Rating: {game.rating ?? "No rating"}
        </p>
    </div>
</div>
    )
}
