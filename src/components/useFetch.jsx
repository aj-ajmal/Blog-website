import { useState , useEffect } from "react";

const useFetch = (url) => {

    const [data, setdata] = useState(null);
    const [isPending, setIspending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setError('No URL provided to useFetch');
            setIspending(false);
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        // small delay for UX only; keep a reference so we can clear it on cleanup
        const timer = setTimeout(() => {
            fetch(url, { signal })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Could not fetch data (status ${res.status})`);
                    }
                    return res.json();
                })
                .then(payload => {
                    setdata(payload);
                    setIspending(false);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError') return; // fetch aborted, ignore
                    setError(err.message || 'An unknown error occurred while fetching');
                    setIspending(false);
                });
        }, 300);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [url]);

    return { data, isPending, error };
};

export default useFetch ;