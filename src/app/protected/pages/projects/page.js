"use client";
import LearnSection from "@/components/LearnSection";
import Nav from "@/components/navbar";
import ProjectSection from "@/components/ProjectSection";
import { useState } from "react";

function Projects() {
  const [mode, setMode] = useState(0);

  const renderContent = () => {
    switch (mode) {
      case 0:
        return <LearnSection />;
      case 3:
        return <ProjectSection />;
      default:
        return <h1 className="text-white">Choose any option from the left</h1>;
    }
  };

  return (
    <div className="bg-slate-800 h-screen overflow-hidden">
      <Nav />
      <div className="flex">
        {/* Sidebar */}
        <div className="md:mt-28 mt-28 md:w-[18%] md:m-2 ml-2 gap-10 flex flex-col">
          <button
            className="w-[100%] md:p-5 p-2 bg-green-700 text-white md:text-2xl text-xs md:rounded-lg rounded-sm hover:bg-green-600"
            onClick={() => {
              setMode(0);
            }}
          >
            Learn
          </button>

          {/* You can add these back later */}
          {/* <button className="..." onClick={() => setMode(1)}>Practice</button>
          <button className="..." onClick={() => setMode(2)}>Leader board</button> */}

          <button
            className="w-[100%] md:p-5 p-2 bg-green-700 text-white md:text-2xl text-xs md:rounded-lg rounded-sm hover:bg-green-600"
            onClick={() => {
              setMode(3);
            }}
          >
            Build a project
          </button>
        </div>

        <div className="w-2 h-screen bg-gray-400 mx-2"></div>

        {/* Main Content */}
        <div className="md:w-[82%] w-[80%] pt-28">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Projects;
