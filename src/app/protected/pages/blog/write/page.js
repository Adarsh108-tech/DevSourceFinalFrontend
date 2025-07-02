"use client";

import Nav from "@/components/navbar";
import { useRef, useState } from "react";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { toast } from "react-toastify";

export default function BlogEditor() {
  const editorRef = useRef(null);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");

  const execCommand = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to submit your blog.");
      return;
    }

    const description = editorRef.current.innerHTML;

    if (!title || !description.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    try {
      const res = await fetch("https://devsourcebackend.onrender.com/addBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          image,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Blog published successfully!");
        setTitle("");
        editorRef.current.innerHTML = "";
        setImage("");
      } else {
        toast.error(data.message || "Failed to publish blog.");
      }
    } catch (err) {
      toast.error("Server error while publishing blog.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <Nav />
      <h1 className="text-3xl mt-28 font-semibold mb-6 text-gray-800">
        Write Your Blog
      </h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog Title"
        className="w-full max-w-3xl mb-4 p-3 text-lg rounded-md border bg-white shadow-sm text-gray-800"
      />

      {/* Toolbar */}
      <div className="w-full max-w-3xl bg-white p-4 shadow-md rounded-md flex gap-4 border">
        <button onClick={() => execCommand("bold")} className="p-2 text-gray-700 hover:text-black">
          <FaBold size={18} />
        </button>
        <button onClick={() => execCommand("italic")} className="p-2 text-gray-700 hover:text-black">
          <FaItalic size={18} />
        </button>
        <button onClick={() => execCommand("underline")} className="p-2 text-gray-700 hover:text-black">
          <FaUnderline size={18} />
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        placeholder="Start writing your blog here..."
        className="w-full max-w-3xl min-h-[300px] mt-4 p-4 bg-white shadow-md rounded-md border outline-none text-black"
        style={{ whiteSpace: "pre-wrap" }}
      ></div>

      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Paste image URL here (optional)"
        className="w-full max-w-3xl mt-4 p-3 text-md rounded-md border bg-white shadow-sm text-gray-800"
      />

      {image && (
        <div className="w-full max-w-3xl mt-4">
          <img
            src={image}
            alt="Blog Preview"
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Publish Blog
      </button>
    </div>
  );
}
