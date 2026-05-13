import {useState} from 'react';

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onSearch(query);
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
                type="text"
                placeholder="Search games..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border p-2 rounded"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Search
            </button>
        </form>
    )
}