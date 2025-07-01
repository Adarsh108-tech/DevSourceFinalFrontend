"use client"

import MemberList from "@/components/members";
import Nav from "@/components/navbar";
import { useState } from "react";
import { useEffect } from "react";

function Members() {
    const [title, setTitle] = useState("");
    const [i , setI] = useState(0);
    const setWeb = () =>{
        setTitle("Web Developers");
        setI(0);
    }
    const setApp = () =>{
        setTitle("Mobile Developers");
        setI(1);
    }
    const setGame = () =>{
        setTitle("Game Developers");
        setI(2);
    }
    const Data = [[
        "Vishesh (UI/UX)",
        "Anshu Kumar",
        "Arnav Gupta",
        "Mayank Suri",
        "Akash Das",
        "Adarsh Singh (UI/UX)",
        "Aman Kumar",
        "Vansh Kumar",
        "Utkarsh",
        "Sonu",
        "Khushi Bhaskar",
        "Aryan Thakur"
    ],
    [
        "Khush",
        "Anurag"
    ],
    [
        "Yash Mishra",
        "Aadi Jain"
    ]
    ]

    const [loading , setLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => setLoading(false), 500); // short delay for smoother UX
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    return ( 
        <div>

            <Nav />

            <div className="w-full">
                <div className="flex gap-10 mt-20 text-sm md:text-lg w-full bg-slate-500 p-2 justify-evenly rounded-b-lg">
                    <button className="bg-green-800 hover:border-green-400 border-2 border-gray-500 hover:bg-green-500 duration-300 hover:scale-125 md:text-xl text-white p-2 rounded-lg" onClick={() => setWeb()}>
                        Web Members
                    </button>
                    <button className="bg-pink-800 hover:border-pink-400 border-2 border-gray-500 text-white hover:bg-pink-600 duration-300 hover:scale-125 md:text-xl  p-2 rounded-lg" onClick={() => setGame()}>
                        Game Members
                    </button>                    
                    <button className="bg-sky-800 hover:border-sky-400 border-2 border-gray-500 text-white hover:bg-sky-600 duration-300 hover:scale-125 md:text-xl p-2 rounded-lg" onClick={() => setApp()}>
                        Mobile Members
                    </button>
                </div>
                {title && <MemberList title={title} data={Data[i]} />}
            </div>
        </div>
    );
}

export default Members;
