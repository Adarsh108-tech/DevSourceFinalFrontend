import React, { useEffect, useState } from "react";
import LearningNav from "./learningNav";

// Function to extract video ID from YouTube URL
function extractVideoId(url) {
  const match = url.match(/(?:\?v=|\/embed\/|\/v\/|\/watch\?v=|\/\d+\/|\/vi\/|\/e\/|watch\?v=|&v=)([^#&?]*)/);
  return match && match[1] ? match[1] : null;
}

// Playlist data with YouTube video links
const WebData = [
  {link : "https://www.youtube.com/watch?v=BsDoLVMnmZs" , title : "Learn html with code with harry"},
  {link : "https://www.youtube.com/watch?v=wRNinF7YQqQ" , title : "CSS crash course"},
  {link : "https://www.youtube.com/watch?v=-g969furGik" , title : "Learn Tailwind css"},
  {link : "https://www.youtube.com/watch?v=mGN9-FPsX9o&list=PLUcsbZa0qzu0OrMJWIuhvibOPZm_IHGTl" , title : "html and tailwind css project"},
  {link : "https://www.youtube.com/watch?v=hKB-YGF14SY&t=3s" , title : "learn Javascript essentials"},
  {link : "https://www.youtube.com/watch?v=G0jO8kUrg-I" , title : "To do list application"},
  {link : "https://www.youtube.com/watch?v=MIYQR-Ybrn4&list=PLjwm_8O3suyOgDS_Z8AWbbq3zpCmR-WE9" , title : "weather app"},
  {link : "https://www.youtube.com/watch?v=ANzPM5-lwXc&list=PLu0W_9lII9aiQiOwthuSvinxoflmhRxM3" , title : "a full stack project"},
  {link : "https://www.youtube.com/watch?v=s2skans2dP4&t=50s" , title : "Intro to React js"},
  {link : "https://www.youtube.com/watch?v=0riHps91AzE&t=6585s" , title : "React js course"},
  {link : "https://www.youtube.com/watch?v=TTx7Y3a7EmA" , title : "React js project"},
  {link : "https://www.youtube.com/watch?v=ifOJ0R5UQOc" , title : "make your portfolio"},
  {link : "https://www.youtube.com/watch?v=L_eF8az2cSA" , title : "what is mern stack"},
  {link: "https://www.youtube.com/watch?v=J6mDkcqU_ZE&t=4792s" , title:"Learn mongo db" },
  {link : "https://www.youtube.com/watch?v=7H_QH9nipNs&t=661s" , title : "Learn express js" },
  {link : "https://www.youtube.com/watch?v=zQAdZYxbH14&list=PLI0saxAvhd_OdRWyprSe3Mln37H0u4DAp" , title:"mern stack app "}, 
  {link : "https://www.youtube.com/watch?v=MtTu-MuzXjw&list=PLI0saxAvhd_OdRWyprSe3Mln37H0u4DAp&index=2" , title : "mern stack app"},
  {link : "https://www.youtube.com/watch?v=mojWy4MpLWA&list=PLI0saxAvhd_OdRWyprSe3Mln37H0u4DAp&index=3" , title : "mern stack app"},
  {link : "https://www.youtube.com/watch?v=cFxHjg5RiC0&list=PLI0saxAvhd_OdRWyprSe3Mln37H0u4DAp&index=4" , title : "mern stack app"},
  {link : "https://www.youtube.com/watch?v=wLUCVbk4giM&list=PLI0saxAvhd_OdRWyprSe3Mln37H0u4DAp&index=5" , title : "mern stack app"},
  {link : "https://www.youtube.com/watch?v=CRFa9RbYAt0&list=PLI0saxAvhd_OdRWyprSe3Mln37H0u4DAp&index=6" , title : "mern stack app"},
  {link : "https://www.youtube.com/watch?v=Sonj_Mtmueo&list=PLI0saxAvhd_OdRWyprSe3Mln37H0u4DAp&index=7" , title : "mern stack app"},
  {link : "https://www.youtube.com/watch?v=QpDbn_oVmzQ&list=PLI0saxAvhd_OdRWyprSe3Mln37H0u4DAp&index=8" , title : "mern stack app"},
  {link : "https://www.youtube.com/watch?v=TQXSzHpfZMY&list=PLI0saxAvhd_OdRWyprSe3Mln37H0u4DAp&index=9" , title : "mern stack app"},
  {link : "https://www.youtube.com/watch?v=E0DEIcAwejk&list=PLI0saxAvhd_OdRWyprSe3Mln37H0u4DAp&index=10" , title : "mern stack app"},
  {link : "https://www.youtube.com/watch?v=JbsZjKhMAqY&list=PLI0saxAvhd_OdRWyprSe3Mln37H0u4DAp&index=11" , title : "mern stack app"},
  {link : "https://www.youtube.com/watch?v=iLng4XfiRm8&list=PLI0saxAvhd_OdRWyprSe3Mln37H0u4DAp&index=13" , title : "mern stack app"},
];

const AndroidData = [
  { link: "https://www.youtube.com/watch?v=fis26HvvDII", title: "Android Development for Beginners - freeCodeCamp" },
  { link: "https://www.youtube.com/watch?v=mXjZQX3UzOs", title: "Jetpack Compose Crash Course - Philipp Lackner" },
];

const GameData = [
  { link: "https://www.youtube.com/watch?v=qPxvmrtTQ_4", title: "Game Development roadmap" },
  { link: "https://www.youtube.com/watch?v=XtQMytORBmM&t=414s", title: "Unity Game Development - Brackeys" },
  { link: "https://www.youtube.com/watch?v=LOhfqjmasi0&t=503s", title: "Godot game Development for begginers" },
  { link: "https://www.youtube.com/watch?v=LOhfqjmasi0&t=503s", title: "Godot game Development for begginers" },
  { link: "https://www.youtube.com/watch?v=q7wlSvt0JIc&list=PL4cUxeGkcC9iHCXBpxbdsOByZ55Ez4bgF", title: "Godot Crash Course 1" },
  { link: "https://www.youtube.com/watch?v=8CrFk3tjsSY&list=PL4cUxeGkcC9iHCXBpxbdsOByZ55Ez4bgF&index=2", title: "Godot Crash Course 2" },
  { link: "https://www.youtube.com/watch?v=nBCcnPAMvBg&list=PL4cUxeGkcC9iHCXBpxbdsOByZ55Ez4bgF&index=3", title: "Godot Crash Course 3" },
  { link: "https://www.youtube.com/watch?v=MWE4d5Wtqbk&list=PL4cUxeGkcC9iHCXBpxbdsOByZ55Ez4bgF&index=4", title: "Godot Crash Course 4" },
  { link: "https://www.youtube.com/watch?v=MtKC5y1wK9Y&list=PL4cUxeGkcC9iHCXBpxbdsOByZ55Ez4bgF&index=5", title: "Godot Crash Course 5" },
  { link: "https://www.youtube.com/watch?v=_d5iunVxlk4&list=PL4cUxeGkcC9iHCXBpxbdsOByZ55Ez4bgF&index=6", title: "Godot Crash Course 6" },
  { link: "https://www.youtube.com/watch?v=sYsl6PqcZSs&list=PL4cUxeGkcC9iHCXBpxbdsOByZ55Ez4bgF&index=7", title: "Godot Crash Course 7" },
  { link: "https://www.youtube.com/watch?v=ZhVFoux2EzU&list=PL4cUxeGkcC9iHCXBpxbdsOByZ55Ez4bgF&index=8", title: "Godot Crash Course 8" },
  { link: "https://www.youtube.com/watch?v=R8y1xxxbfEg&list=PL4cUxeGkcC9iHCXBpxbdsOByZ55Ez4bgF&index=9", title: "Godot Crash Course 9" },
];

const AIData = [
  { link: "https://www.youtube.com/watch?v=aircAruvnKk", title: "Neural Networks Explained - 3Blue1Brown" },
  { link: "https://www.youtube.com/watch?v=7eh4d6sabA0", title: "Machine Learning Basics - Sentdex" },
];

const SystemDevData = [
  { link: "https://www.youtube.com/watch?v=Gxgl-VzAy5k", title: "Operating Systems Crash Course - MIT" },
  { link: "https://www.youtube.com/watch?v=lxjdvN32Hmo", title: "C++ System Programming - CppCon" },
];

const LowDev = [
  { link : "https://youtu.be/e_q7AemBFmM?si=6XJPgUMaNs89lmQm" , title:  "simple program"},
  { link : "https://youtu.be/8jLOx1hD3_o?si=lxjI_ax0smSxYUkA" , title:  "C++ pogram"}
]

const categories = [
  { id: 0, name: "Web Development", data: WebData },
  { id: 1, name: "Android Development", data: AndroidData },
  { id: 2, name: "Game Development", data: GameData },
  { id: 3, name: "Artificial Intelligence", data: AIData },
  { id: 4 , name:"Low level Development" , data:LowDev},
  { id: 5, name: "System Development", data: SystemDevData },
];

function LearnSection() {
  const [state, setState] = useState(0);
  const [data, setData] = useState(categories[0].data);

  useEffect(() => {
    setData(categories[state].data);
  }, [state]);

  return (
    <>
      <LearningNav setState={setState} state={state} />
      <div className="text-center flex flex-wrap justify-center items-center h-[75vh] md:gap-10 gap-5 overflow-x-hidden overflow-auto p-5">
        {data.map((item, index) => {
          const videoId = extractVideoId(item.link);
          return (
            <div key={index} className="flex flex-col items-center gap-2">
              {videoId && (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={item.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="rounded-lg shadow-lg md:h-max md:w-full h-[150px] w-[250px]"
                ></iframe>
              )}
              <h3 className="text-white font-semibold">{item.title}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default LearnSection;
