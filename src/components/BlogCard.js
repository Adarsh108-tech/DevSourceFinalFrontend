import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useEffect, useState } from "react";

function BlogCard({ blog }) {
  const [likes, setLikes] = useState(blog.likesCount);
  const [dislikes, setDislikes] = useState(blog.dislikesCount);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://devsourcebackend.onrender.com/blog/like/${blog._id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLikes(data.likes);
      setDislikes(data.dislikes);
      setLiked(!liked);
      setDisliked(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://devsourcebackend.onrender.com/blog/dislike/${blog._id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLikes(data.likes);
      setDislikes(data.dislikes);
      setDisliked(!disliked);
      setLiked(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col text-white bg-sky-800 p-5 rounded-lg overflow-auto relative">
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 border-b border-white/20">
        <div className="flex flex-col items-center text-center">
          <img
            src={
              blog.createdByProfile?.trim()
                ? blog.createdByProfile
                : "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png"
            }
            alt="User Avatar"
            className="h-16 w-16 rounded-full border-2 border-white shadow-md object-cover"
          />
          <div className="text-lg font-semibold mt-1">{blog.createdByName}</div>
        </div>
        <div className="flex gap-5">
          <span
            className="bg-blue-800 p-2 rounded-lg flex gap-2 h-min cursor-pointer"
            onClick={handleLike}
          >
            <AiFillLike className={liked ? "text-green-500 text-2xl" : "hover:text-green-500 text-2xl"} />
            <span className="text-gray-500">{likes}</span>
          </span>
          <span
            className="bg-blue-800 p-2 rounded-lg flex gap-2 h-min cursor-pointer"
            onClick={handleDislike}
          >
            <AiFillDislike className={disliked ? "text-red-500 text-2xl" : "hover:text-red-500 text-2xl"} />
            <span className="text-gray-500">{dislikes}</span>
          </span>
        </div>
      </div>

      <div className="flex-1 w-full flex-wrap mt-4">
        <h1 className="text-2xl font-bold">{blog.title}</h1>
        <div
          className="max-h-[10rem] w-full text-gray-200 overflow-auto mt-2"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>

      <div className="mt-4 w-full rounded-lg overflow-hidden shadow-md">
        <img
          src={blog.image || "https://cdn.wallpapersafari.com/49/94/xm1l4f.jpg"}
          alt="Blog Cover"
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default BlogCard;
