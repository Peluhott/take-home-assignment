export default function PlatformCard({ platform }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-72">
            <img
                src={platform.image_url || "/defaultgame.avif"}
                alt={platform.name}
                className="w-full h-56 object-cover"
            />

            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">
                    {platform.name}
                </h2>
            </div>
        </div>
    );
}
