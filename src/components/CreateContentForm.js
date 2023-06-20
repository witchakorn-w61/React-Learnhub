import React, { useState } from "react";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
const CreateContentForm = () => {
  const ratingStyle = {
    itemShapes: ThinRoundedStar,
    activeFillColor: "#e6cb53",
    inactiveFillColor: "#aeb5bf",
  };
  const navigate = useNavigate();
  const [urlInput, setUrlInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [starInput, setStarInput] = useState(5);
  const { token } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token);
    try {
      const res = await fetch("https://api.learnhub.thanayut.in.th/content", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          videoUrl: urlInput,
          comment: commentInput,
          rating: starInput,
        }),
      });
      location.reload();
      const newContentData = await res.json();

      if (newContentData.statusCode === 401) {
        console.log(newContentData.statusCode);
        throw new Error(newContentData.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl pb-4">Share your new Youtube content</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="url">Video URL</label>
        <input
          onChange={(e) => {
            setUrlInput(e.target.value);
            console.log(urlInput);
          }}
          className="bg-slate-200 text-black w-full rounded-sm"
          type="text"
          id="url"
          name="url"
          required
        />
        <label>Comment</label>
        <input
          htmlFor="comment"
          className="bg-slate-200 text-black w-full rounded-sm"
          type="text"
          onChange={(e) => {
            setCommentInput(e.target.value);
            console.log(commentInput);
          }}
          required
        />
        <Rating
          style={{ maxWidth: 160 }}
          value={starInput}
          onChange={setStarInput}
          itemStyles={ratingStyle}
        />
        <input
          type="submit"
          value="Submit"
          className="button-grey"
          id="comment"
          name="comment"
        />
      </form>
    </div>
  );
};

export default CreateContentForm;
