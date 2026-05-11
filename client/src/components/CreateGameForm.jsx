import {useState} from 'react';

export default function CreateGameForm() {
    const [title, setTitle] = useState('');
    const [rating, setRating]= useState('');
    const [image, setImage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch('/api/game/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ title, rating, image }),
            })
            // add logic to handle a successful response
        } catch (error) {
            console.error('Game creation failed:', error);
        }
    }
    
    return (
        <div>
            <form onSubmit ={handleSubmit}>
                <input
                    type="text"
                    placeholder="Game Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <button type="submit">Create Game</button>
            </form>
        </div>
    )
}