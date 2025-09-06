import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchImages } from "../slice/gallerySlice";

export default function GalleryList() {
  const { images, loading, error } = useSelector((state) => state.gallery);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");


  // Fetching iamges
  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  // Debouncing the search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.toLowerCase());
    }, 300); // 300ms delay

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Filter images by title or tags
  // im usign use memo here so it only envoked when th images or search input changes, sort
  const filteredAndSortedImages = useMemo(() => {
    let result = images;

    // Filtering
    if (debouncedSearch) {
      result = result.filter((img) => {
        const titleMatch = img.title?.toLowerCase().includes(debouncedSearch);
        const tagMatch = img.tags?.some((t) =>
          t.toLowerCase().includes(debouncedSearch)
        );
        return titleMatch || tagMatch;
      });
    }

    // Sorting
    return [...result].sort((a, b) => {
      const titleA = a.title?.toLowerCase() || "";
      const titleB = b.title?.toLowerCase() || "";

      if (sortOrder === "asc") return titleA.localeCompare(titleB);
      if (sortOrder === "desc") return titleB.localeCompare(titleA);
      return 0;
    });
  }, [images, debouncedSearch, sortOrder]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="px-4">
      {/* Search bar to search images */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by title or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* Sort dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="asc">Sort by Title (A → Z)</option>
          <option value="desc">Sort by Title (Z → A)</option>
        </select>
      </div>




      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredAndSortedImages .length > 0 ? (
          filteredAndSortedImages .map((img) => (
            <div
              key={img.id}
              className="relative rounded-lg overflow-hidden shadow-md group"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-40 object-cover"
              />
              {img.title && (
                <p className="text-center text-sm font-medium mt-1">
                  {img.title}
                </p>
              )}
              {img.tags && (
                <p className="text-xs text-gray-500 text-center">
                  {img.tags.join(", ")}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No images found
          </p>
        )}
      </div>
    </div>
  );
}
