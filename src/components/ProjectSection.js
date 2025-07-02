"use client";

import TaskCard from "./TaskCard";
import { useEffect, useState } from "react";

function ProjectSection() {
  const [projects, setProjects] = useState([]);
  const [selectedType, setSelectedType] = useState(1); // 1 = Web by default
  const [title, setTitle] = useState("Web Developers");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://devsourcebackend.onrender.com/getAllProjects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  const handleSwitch = (type) => {
    setSelectedType(type);
    switch (type) {
      case 1:
        setTitle("Web Developers");
        break;
      case 2:
        setTitle("Mobile Developers");
        break;
      case 3:
        setTitle("Game Developers");
        break;
      default:
        setTitle("");
    }
  };

  const filtered = projects.filter((p) => p.type === selectedType);

  return (
    <div className="h-[80vh] w-full overflow-auto overflow-x-hidden">
      <div className="flex w-full md:gap-10 gap-2 text-black justify-evenly rounded-lg mb-4">
        <button
          className="bg-emerald-600 md:text-xl text-xs text-white p-2 rounded-lg"
          onClick={() => handleSwitch(1)}
        >
          Web Members
        </button>
        <button
          className="bg-blue-600 md:text-xl text-xs text-white p-2 rounded-lg"
          onClick={() => handleSwitch(3)}
        >
          Game Members
        </button>
        <button
          className="bg-red-600 md:text-xl text-xs text-white p-2 rounded-lg"
          onClick={() => handleSwitch(2)}
        >
          Android Members
        </button>
      </div>

      {filtered.length > 0 ? (
        filtered.map((task, idx) => (
          <TaskCard
            key={idx}
            title={task.title}
            endDate={task.endDate || task.createdAt}
            images={task.images}
            description={task.description}
          />
        ))
      ) : (
        <div className="text-center text-white text-lg mt-10">
          No tasks available for {title}
        </div>
      )}
    </div>
  );
}

export default ProjectSection;
