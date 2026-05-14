import { useState } from "react";
import axios from "axios";

export default function UpdateGameForm({ game, onGameUpdated }) {
    const [title, setTitle] = useState(game?.title ?? "");
    const [rating, setRating] = useState(game?.rating ?? "");
    const [image, setImage] = useState(null);

    function handleRatingChange(e) {
        const value = e.target.value;

        if (value === "") {
            setRating("");
            return;
        }

        const number = Number(value);

        if (number >= 1 && number <= 10) {
            setRating(number);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (image) {
                const formData = new FormData();
                formData.append("title", title);
                if (rating !== "") {
                    formData.append("rating", Number(rating));
                }
                formData.append("image", image);
                formData.append("_method", "PUT");
                await axios.post(`/game/${game.id}`, formData);
            } else {
                await axios.put(`/game/${game.id}`, {
                    title,
                    rating: rating === "" ? null : Number(rating)
                });
            }

            if (onGameUpdated) {
                onGameUpdated();
            }
        } catch (error) {
            console.error("Error updating game:", error.response?.data || error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-bold text-center">
                    Update Game
                </h1>

                <input
                    type="text"
                    placeholder="Game Title"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3"
                />

                <input
                    type="number"
                    placeholder="Rating"
                    value={rating}
                    min="1"
                    max="10"
                    onChange={handleRatingChange}
                    className="w-full border border-gray-300 rounded-lg p-3"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700 file:bg-gray-300 file:text-gray-800 file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:cursor-pointer hover:file:bg-gray-400"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                >
                    Update Game
                </button>
            </form>
        </div>
    );
}
