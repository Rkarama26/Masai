import { useState } from "react";


export default function Counter() {


    const [count, setcount] = useState<number>(0);
    return (
        <div>
            <h1>Counter {count}</h1>
            <button className="border-2 border-amber-400 p-2"
                onClick={() => setcount((prev) => prev + 1)}>Increment</button>
        </div>
    )
}
