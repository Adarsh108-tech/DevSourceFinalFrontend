"use client";

import BlogCard from "@/components/BlogCard";
import Nav from "@/components/navbar";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/getAllBlogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch blogs");

      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchAllBlogs();
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/searchBlogs?q=${encodeURIComponent(searchTerm)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to search blogs");

      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full min-h-screen overflow-auto overflow-x-hidden bg-slate-800 relative">
      <Nav />

      {/* Search Bar */}
      <div className="w-full mt-28 px-10 flex items-center gap-4">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search blogs..."
          className="w-[80%] h-14 px-4 text-black bg-white border rounded-md"
        />
        <button onClick={handleSearch}>
          <FaSearch className="text-white w-8 h-8" />
        </button>
      </div>

      {/* Blog Cards */}
      <div className="w-full px-5 flex flex-col gap-2 pt-5 justify-center">
        <hr />
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div key={index}>
              <BlogCard blog={blog} />
              <hr />
            </div>
          ))
        ) : (
          <p className="text-white text-center pt-6">No blogs found.</p>
        )}
      </div>

      {/* Write Blog Button */}
      <Link
        href="/protected/pages/blog/write"
        className="fixed bottom-10 right-10 bg-blue-500 md:p-6 p-2 hover:bg-blue-300 transition duration-150 cursor-pointer text-white rounded-xl text-sm md:text-lg flex items-center gap-2"
      >
        Write Your Own Blog <span className="text-3xl">+</span>
      </Link>
    </div>
  );
}

export default Blogs;