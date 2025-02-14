import { useState } from "react";

function TaskCard({ title, endDate, images, description }) {
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <div className="bg-slate-800 shadow-lg rounded-lg p-4 w-[100%] border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-white">{title}</h2>

            <p className="text-sm text-gray-400">Starting Date: {endDate}</p>

            {images.length > 0 && (
                <div className="relative h-56 w-full mt-2">
                    <img
                        src={images[currentImage]}
                        alt={`Task Image ${currentImage + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    {images.length > 1 && (
                        <>
                            <button
                                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
                                onClick={() => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                            >
                                ◀
                            </button>
                            <button
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
                                onClick={() => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                            >
                                ▶
                            </button>
                        </>
                    )}
                </div>
            )}
            <p className="mt-2  text-sm md:text-2xl text-gray-200">{description}</p>
        </div>
    );
}

export default TaskCard;
