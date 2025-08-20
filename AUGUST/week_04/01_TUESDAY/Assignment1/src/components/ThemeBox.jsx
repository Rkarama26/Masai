import React from 'react';

const ThemeBox = ({ theme, title }) => {



    return (
        <div
            className={` mt-5 p-6 rounded-2xl shadow-md transition-all duration-400 
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-200 text-black"}`}
        >

            <p className='font-bold'>{title}</p>
        </div>
    );
}

export default ThemeBox;
