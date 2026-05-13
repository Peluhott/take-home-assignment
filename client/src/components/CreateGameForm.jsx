import {useState} from 'react';
import axios from 'axios';

export default function CreateGameForm() {
    const [title, setTitle] = useState('');
    const [rating, setRating]= useState('');
    const [image, setImage] = useState(null);

     async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('rating', rating);
    formData.append('image', image);

    await axios.post('/games', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Create Game</button>
            </form>
        </div>
    )
}