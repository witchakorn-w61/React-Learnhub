import React from "react";
import CreateContentForm from "./CreateContentForm";
import { useAuth } from "../providers/AuthProvider";

const Hero = () => {
  const { username, isLoggedIn } = useAuth();
  return (
    <>
      <div className="pt-24 bg-slate-500"></div>
      <div className="flex flex-row px-8 py-12 sm:p-32 bg-slate-500 text-white gap-12">
        {isLoggedIn ? (
          <>
            {/* <img src={youtubeImg} width={350} className="hidden lg:block" /> */}
            <div className=" w-full lg:mx-48">
              <h1 className="text-4xl w-full font-bold">Hello {username}!</h1>
              <CreateContentForm />
            </div>
          </>
        ) : (
          <div className="flex flex-col w-full items-center gap-8">
            <h1 className="text-6xl font-bold">LearnHub</h1>
            <p>
              <a className="text-blue-200 underline" href="/register">
                {" "}
                Create an account
              </a>{" "}
              to start sharing your favourite youtube video!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Hero;
