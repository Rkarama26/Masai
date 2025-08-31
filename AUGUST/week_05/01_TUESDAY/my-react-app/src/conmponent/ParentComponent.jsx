import React from 'react';

const ParentComponent = () => {

    const [count, setcount] = useState();

    return (
        <>
               <ChildComponent count={count} setcount={setcount}/>
        </>
    );
}

import React from 'react';

const ChildComponent = ({count , setcount}) => {

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setcount(count + 1)}>Increament</button>
        </div>
    );
}

