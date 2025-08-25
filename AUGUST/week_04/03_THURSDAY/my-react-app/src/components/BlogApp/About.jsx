import React from 'react';

const About = () => {
    return (
        <div className="max-w-3xl p-6 mx-auto mt-6 bg-white border border-gray-200 rounded-lg shadow">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">About This Blog App</h1>

            <p className="mb-4 text-gray-700">
                Welcome to our Blog App! Here you can read a variety of posts on topics like history,
                technology, and lifestyle. Each post comes with reactions, tags, and views to keep you informed
                about what’s trending.
            </p>

            <p className="mb-4 text-gray-700">
                This application is built using React and React Router for smooth navigation between pages.
                It demonstrates fetching data from an API, displaying posts dynamically, and navigating to
                detailed post pages.
            </p>

            <p className="text-gray-700">
                Our goal is to provide an easy-to-read and user-friendly interface for anyone interested
                in reading or learning more about different topics. Enjoy exploring the posts!
            </p>
        </div>
    );
}

export default About;
