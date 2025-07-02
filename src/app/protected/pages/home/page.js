"use client";

import Nav from "@/components/navbar";
import About from "@/components/about";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import "../../../font.css";
import TechTool from "@/components/techTool";
import { useRef, useState, useEffect } from "react";
import Spinner from "@/components/spinner";

export default function Home() {
  const elementRef = useRef(null);
  const [Leftoffset, SetLeftOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  console.log(process.env.NEXT_PUBLIC_API_BASE);
  const TechStack = [
    { name: "React js", link: "https://pluspng.com/img-png/react-logo-png-img-react-logo-png-react-js-logo-png-transparent-png-1142x1027.png" },
    { name: "Mongo DB", link: "/TechStackLogos/mongodb.png" },
    { name: "Unity", link: "/TechStackLogos/unity.png" },
    { name: "Blender", link: "/TechStackLogos/blender.png" },
    { name: "node js", link: "/TechStackLogos/nodejs.png" },
    { name: "Git HUB", link: "/TechStackLogos/github.png" },
    { name: "Git", link: "/TechStackLogos/git.png" },
    { name: "Kotlin", link: "/TechStackLogos/kotlin-logo.png" },
    { name: "Flutter", link: "/TechStackLogos/flutter-logo.png" },
    { name: "Android Studio", link: "/TechStackLogos/AndroidStudio.png" },
    { name: "FireBase", link: "/TechStackLogos/firebase.png" },
  ];

  useEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current;
      SetLeftOffset(element.offsetLeft);
    }

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

  if (loading) return <Spinner />;

  return (
    <div className="bg-slate-800 w-[100vw] overflow-hidden">
      <Nav />
      <div className="mt-22 relative my-10 bg-gradient-to-r rounded-lg z-5 flex md:flex-row flex-col-reverse justify-center items-center w-full h-[100vh] p-3">
        <div className="absolute inset-0 -z-9 overflow-hidden pointer-events-none">
          <img className="h-fit w-fit" src="/back.jpg" alt="Background" />
        </div>

        <div className="md:w-[50%] text-2xl flex flex-col justify-center">
          <motion.h1
            className="text-8xl z-10 font-bold tracking-wider text-center text-transparent inline-block bg-clip-text"
            animate={{ backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              backgroundImage: "linear-gradient(to top, orange, yellow, red)",
              backgroundSize: "auto 200%",
            }}
          >
            DevSource
          </motion.h1>
          <p className="text-center z-10">
            The Most Unique and diverse Club in USICT ACM
          </p>

          <button className="mt-4 px-6 mx-auto text-white font-bold text-lg uppercase tracking-wider bg-red-600 hover:bg-red-700 transition-all duration-300 border-2 border-red-800 w-[50%] rounded-md shadow-md transform hover:scale-105 active:scale-95">
            Surprise me
          </button>
        </div>
        <div className="p-10">
          <motion.img
            src="/DevSourceLogo.png"
            className="w-40 h-40 md:h-fit md:w-fit object-cover rounded-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            alt="Logo"
          />
        </div>
      </div>

      <About />

      <div className="w-full h-full mt-10">
        <h1 className="p-5 text-5xl text-center">Tech Stack</h1>
        <div className="md:flex xs:flex-col md:flex-row flex-wrap md:gap-10 p-10 justify-center">
          {TechStack.map((data, index) => (
            <motion.div
              key={index}
              className="overflow-hidden md:w-[40%] h-full rounded-lg shadow-lg"
              ref={elementRef}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <TechTool src={data.link} name={data.name} index={index} />
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
