"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

const Home = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get("/api/session");

        setSession(response.data.session);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    fetchSession();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="font-extrabold text-3xl">Home</h1>
      <h2 className="text-xl">Welcome {session?.user?.name}</h2>
      {/* Logout-Button */}
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default Home;
