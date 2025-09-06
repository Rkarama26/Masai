import React from 'react'
import GalleryForm from './GalleryForn'
import GalleryList from './GalleryList'
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";




export default function
    () {


    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside
                className={`fixed md:static inset-y-0 left-0 bg-white shadow-lg transform transition-transform duration-300 w-64 z-50 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
            >
                <div className="p-4 border-b flex justify-between items-center md:hidden">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button onClick={() => setIsOpen(false)}>
                        <RxCross1 />
                    </button>
                </div>
                <div className="p-4 overflow-y-auto">
                    <GalleryForm />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                {/* Top bar for small screens */}
                <div className="md:hidden flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <button onClick={() => setIsOpen(true)}>
                        <IoMdMenu />
                    </button>
                </div>

                {/* Desktop heading */}
                <h1 className="hidden md:block text-2xl font-bold mb-4">Dashboard</h1>

                <GalleryList />
            </main>
        </div>
    )
}
