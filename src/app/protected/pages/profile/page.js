"use client";
import LogoutButton from "@/components/logout";
import Nav from "@/components/navbar";
import { useEffect, useState } from "react";
import { FaCamera, FaMapMarkerAlt, FaUserEdit, FaTrash } from "react-icons/fa";

function ProfilePage() {
  const [image, setImage] = useState("/default-profile.png");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userBlogs, setUserBlogs] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const parsedId = JSON.parse(atob(token.split(".")[1])).id;
      setUserId(parsedId);

      const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/user/${parsedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await userRes.json();
      setName(user.name);
      setImage(user.profilePicture || "/default-profile.png");
      setBio(user.description || "");
      setLocation(user.address || "");

      const blogsRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/user/${parsedId}/blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const blogs = await blogsRes.json();
      setUserBlogs(blogs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleProfileImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("profilePicture", file);
  
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/upload/profile-picture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const result = await res.json(); // ✅ parse only ONCE
  
      if (!res.ok) throw new Error(result.message || "Failed to upload image");
  
      console.log(result); // Optional debug
      setImage(result.user.profilePicture); // ✅ Update profile image
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };
  

  const handleDeleteBlog = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/deleteBlog/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserBlogs(userBlogs.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Failed to delete blog", err);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/user/profile-info`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description: bio, address: location }),
      });

      if (!res.ok) throw new Error("Failed to update profile info");

      await res.json();
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile info", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <div className="p-6 mt-20 flex flex-col md:flex-row gap-10 items-start justify-center">
        {/* Profile Section */}
        <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-gray-300"
            />
            <label
              className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
            >
              <FaCamera size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </label>
          </div>
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={name}
                className="w-full px-4 py-2 border rounded-md text-black"
                disabled
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-black resize-none"
                placeholder="Description"
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-black"
                placeholder="Address"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
              <p className="text-gray-600">{bio}</p>
              <p className="text-gray-500 flex items-center justify-center gap-2">
                <FaMapMarkerAlt /> {location}
              </p>
            </div>
          )}
          <button
            onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2 mx-auto"
          >
            <FaUserEdit /> {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
          <LogoutButton />
        </div>

        {/* User Blogs */}
        <div className="flex-1 w-full max-w-2xl">
          <h2 className="text-4xl text-black text-center font-bold mb-4">Your Blogs</h2>
          {userBlogs.length > 0 ? (
            userBlogs.map((blog) => (
              <div key={blog._id} className="bg-white p-4 mb-4 rounded shadow relative">
                <h3 className="text-lg font-semibold text-black">{blog.title}</h3>
                <div
                  className="text-gray-700 mt-2 max-h-32 overflow-auto"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                />
                <button
                  onClick={() => handleDeleteBlog(blog._id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
