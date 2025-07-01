"use client"
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-slate-800 text-white z-50 shadow-md">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="cursor-pointer">
                    <img src="/DevSourceLogo.png" className="h-12 w-12" alt="Logo" />
                </div>

                {/* Hamburger Menu (Mobile) */}
                <button 
                    className="md:hidden text-gray-300 focus:outline-none" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-8 TrialCondensedBold tracking-widest">
                    {["Home", "Members", "Groups", "Projects", "Blog", "Profile"].map((item) => (
                        <Link 
                            href={item === "Home" ? "/" : "/protected/pages/" + item.toLowerCase()} 
                            key={item}
                            className="text-lg uppercase relative text-gray-300 
                                before:content-[attr(data-text)] before:absolute before:text-red-500 
                                before:top-0 before:left-0 before:w-0 before:overflow-hidden 
                                before:transition-all before:duration-300 hover:before:w-full"
                            data-text={item}
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden flex flex-col items-center gap-4 pb-4 bg-slate-900">
                    {["Home", "Members", "Groups", "Projects", "Blog", "Profile"].map((item) => (
                        <Link 
                            href={item === "Home" ? "/" : "/pages/" + item.toLowerCase()} 
                            key={item}
                            className="text-lg text-gray-300 hover:text-red-500"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Nav;