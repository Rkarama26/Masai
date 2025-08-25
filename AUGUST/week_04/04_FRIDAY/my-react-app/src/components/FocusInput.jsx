import React, { useRef } from 'react';

const FocusInput = () => {

    const inputRef = useRef(null) // initialValue

    function focusInput(){
         console.log(inputRef.current)
         inputRef.current.focus()
         Object.assign(inputRef.current.style, {
            color: "red",
            backgroundColor: "blue",
            border: "2px blue solid"
         })

    }


    return (
        <div>
            <input ref={inputRef} type="text" placeholder='Type here...' />
            <button onClick={focusInput}>Focus Input</button>
        </div>
    );
}

export default FocusInput;
