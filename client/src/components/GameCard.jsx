

export default function GameCard({game}){
    return (
        <div>
            <img src={game.image_url} alt={game.title}/>
            <h2>{game.title}</h2>
        </div>
    )
}