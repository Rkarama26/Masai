import React, { useCallback, useState } from 'react';


const Button = React.memo(({ click, label }) => {
    console.log("Button rendered")
    return <button onClick={click}>{label}</button>
        
})



const UsecallBack = () => {
    const [count, setcount] = useState(0);

    // after count change it triggers re-render
    // and a new refrence of funtion is created,

    // so we have to persist this function across re-renders

    const handleClick = useCallback(() => {
        console.log("Button clicked")
    }, []
    )

    return (
        <div>
            <h1>UseCallback</h1>
            <h3>without the useCallback</h3>
            <button onClick={() => setcount(prev => prev + 1)}>Increment {count}</button>

            {/* it looks the handleClick is constant,
            deep down each re-render  a
            new refrence is created for function */}
            <Button click={handleClick} label="Non Memoized function" />

        </div>
    );
}

export default UsecallBack;
