import React from "react";
import Hero from "../components/Hero";
import ContentCard from "../components/ContentCard";
import { useAuth } from "../providers/AuthProvider";
const Home = () => {
  const { isLoggedIn, login, logout, username } = useAuth();
  return (
    <div className="text-slate-600">
      <Hero />
      <ContentCard />
    </div>
  );
};

export default Home;
