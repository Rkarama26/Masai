import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const QuoteGenerator = () => {

    const [data, setdata] = useState(null);

    async function fetchData() {
        const response = await fetch("https://dummyjson.com/quotes/random");
        const result = await response.json()
        console.log(result)
        setdata(result)

    }
    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();

        }, 30000)

        return () => {
            clearInterval(interval)
        }
    }, [])


    return (
        <div className="">


            {data ? (
                <>
                    <h1 className="">"{data.quote}"</h1>
                    <p className="text-red-600">— {data.author}</p>
                    <button onClick={fetchData}>
                        New Quote
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )

            }


        </div>
    );
}

export default QuoteGenerator;
