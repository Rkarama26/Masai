import { useEffect, useState } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // a custom hook to fetch data from a URL
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error("Failed to fetch");
                const json = await res.json();
                if (isMounted) {
                    setData(json);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false; // cleanup
        };
    }, [url]);

    return { data, loading, error };
}
