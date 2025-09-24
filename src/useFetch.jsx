import { useState , useEffect } from "react";

const useFetch = (url) => {

    const [data, setdata] = useState(null);
    const [isPending, setIspending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw Error("could not fetch the data for that resources check the connect....!")
                    }
                    return res.json()
                })
                .then(data => {
                    setdata(data)
                    setIspending(false)
                    setError(null)
                })
                .catch(err => {
                    setError(err.message)
                    setIspending(false)
                })
        }, 500)
    }, [url])
   return {data , isPending , error}
}

export default useFetch ;