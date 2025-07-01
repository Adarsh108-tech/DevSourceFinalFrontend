import GroupCard from "@/components/groupCard";
import Nav from "@/components/navbar";

function Groups() {
    const DescData = [
        {
            title: "Web Development Group",
            desc: "The Web Group of DevSource makes projects on MongoDB, React.js, Express.js, and Node.js—a simple MERN stack—so that students can learn standard production-level web projects. We also try to incorporate new technologies in each new project we undertake.",
            background: "/webVideo.mp4",
        },
        {
            title: "Android Development Group",
            desc: "The Android group of DevSource creates projects using Kotlin, Flutter, Dart, and more. For the backend, we use Firebase for testing frontend-backend integration, while the main server is built with Express.js and MongoDB or PostgreSQL as the database.",
            background: "/androidVideo.mp4",
        },
        {
            title: "Game Development Group",
            desc: "The Game Developer group is the most unique group in DevSource and ACM. Here, we make games and explore different game engines like Godot, Unity, and Blender Game Engine. Our final project involves building a game engine from scratch, adding an out-of-the-box project to group members' résumés.",
            background: "/video.mp4",
        },
    ];

    return (
        <div>
            <Nav />
            {DescData.map((group, index) => (
                <GroupCard
                    key={index} // Key is only for React, not a prop
                    title={group.title}
                    desc={group.desc}
                    background={group.background}
                />
            ))}
        </div>
    );
}

export default Groups;
