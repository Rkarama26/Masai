import React, { useState } from 'react';


//wrap the child inside the memo 

const Child = React.memo(({ lable }) => {
    console.log("Child Rerender")
    return <p>{lable}</p>
}
)


const ReactMemo = () => {

    const [count, setcount] = useState(0);

    return (
        <div>
            <h2>Without React.Memo</h2>
            <button onClick={() => setcount(prev => prev + 1)}>Inrement Count</button>
            <p>{count}</p>
            {/* child should re-render, when props changes, btu it not happens so we use ReactMemo */}
            <Child lable={"I re-render every time "} />
        </div>
    );
}

export default ReactMemo;
