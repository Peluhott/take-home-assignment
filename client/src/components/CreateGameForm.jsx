import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CreateGameForm({ onGameCreated }) {

    const [title, setTitle] = useState('');
    const [rating, setRating] = useState('');
    const [image, setImage] = useState(null);

    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');

    const [platforms, setPlatforms] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState('');

    useEffect(() => {
        async function fetchPlatforms() {
            try {
                const res = await axios.get('/game/platforms');
                setPlatforms(res.data);
            } catch (error) {
                console.error('Error fetching platforms:', error);
            }
        }

        fetchPlatforms();
    }, []);

    useEffect(() => {
        async function fetchTags() {
            try {
                const res = await axios.get('/game/tags');
                setTags(res.data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        }

        fetchTags();
    }, []);

   async function handleSubmit(e) {
    e.preventDefault();

    try {
        

        const formData = new FormData();

        formData.append('title', title);

        if (rating !== '') {
            formData.append('rating', Number(rating));
        }

        if (image) {
            formData.append('image', image);
        }

        if (selectedTag !== '') {
            formData.append('tagId', Number(selectedTag));
        }

        if (selectedPlatform !== '') {
            formData.append('platformId', Number(selectedPlatform));
        }

        await axios.post('/game', formData);

        onGameCreated();

        setTitle('');
        setRating('');
        setImage(null);
        setSelectedTag('');
        setSelectedPlatform('');
    } catch (error) {
        console.error('Laravel response:', error.response?.data);
    }
}

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
            >

                <h1 className="text-2xl font-bold text-center">
                    Create Game
                </h1>

                <input
                    type="text"
                    placeholder="Game Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3"
                />

                <input
                    type="number"
                    placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700 file:bg-gray-300 file:text-gray-800 file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:cursor-pointer hover:file:bg-gray-400"
                />

                <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 bg-white"
                >
                    <option value="">
                        Select Genre
                    </option>

                    {tags.map((tag) => (
                        <option
                            key={tag.id}
                            value={tag.id}
                        >
                            {tag.name}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 bg-white"
                >
                    <option value="">
                        Select Platform
                    </option>

                    {platforms.map((platform) => (
                        <option
                            key={platform.id}
                            value={platform.id}
                        >
                            {platform.name}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                >
                    Create Game
                </button>

            </form>
        </div>
    );
}
