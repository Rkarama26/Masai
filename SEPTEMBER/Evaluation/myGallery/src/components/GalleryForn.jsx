import { useState } from "react";
import { addImage } from "../slice/gallerySlice";
import { useDispatch } from "react-redux";

export default function GalleryForm() {
    const getRandomImage = () =>
        `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`;

    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setMessage(" Title is required");
            return;
        }

        try {
            await dispatch(
                addImage({
                    url: url.trim() || getRandomImage(),
                    title,
                    tags: tags
                        .split(",")
                        .map((t) => t.trim())
                        .filter((t) => t.length > 0),
                })
            ).unwrap();

            setMessage(" Image uploaded successfully!");
            setUrl(getRandomImage());
            setTitle("");
            setTags("");
        } catch (err) {
            setMessage(" Failed to upload image");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto mb-6"
        >
            <h2 className="text-lg font-semibold mb-4">Add Image</h2>
            <input
                type="text"
                placeholder="Image URL"
                name="imageUrl"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <span className="text-gray-400">By default a random imageUrl will be uploaded</span>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring focus:ring-blue-300"
            />

            <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring focus:ring-blue-300"
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
            >
                Add
            </button>

            {/*  Message Section */}
            {message && (
                <p className="mt-3 text-sm text-center font-medium text-gray-700">
                    {message}
                </p>
            )}
        </form>
    );
}
