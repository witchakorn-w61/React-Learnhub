import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useContent from "../hooks/useContent";
import ReactPlayer from "react-player";
import { useAuth } from "../providers/AuthProvider";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContentDetail = () => {
  const ratingStyle = {
    itemShapes: ThinRoundedStar,
    activeFillColor: "#3d4c63",
    inactiveFillColor: "#aeb5bf",
  };
  const notify = () => toast("Wow so easy!");
  const navigate = useNavigate();
  const { id } = useParams();
  const { content } = useContent(id);
  const { isLoggedIn, username, token } = useAuth();
  const [editToggle, setEditToggle] = useState(false);
  const [newTextInput, setNewTextInput] = useState("");
  const [newStarInput, setNewStarInput] = useState(0);

  const [text, setText] = useState(
    "Here is the data you want to show in your textarea"
  );

  const handleEditToggle = (e) => {
    e.preventDefault;
    setEditToggle(!editToggle);
    console.log(editToggle);
    setNewTextInput(comment);
    setNewStarInput(rating);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://api.learnhub.thanayut.in.th/content/${id}`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment: newTextInput,
            rating: newStarInput,
          }),
        }
      );
      const data = res.json();
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://api.learnhub.thanayut.in.th/content/${id}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (!content) {
    // Render loading state or return null
    return <p className="">Loading...</p>;
  }

  const {
    videoTitle,
    videoUrl,
    comment,
    rating,
    thumbnailUrl,
    creatorName,
    creatorUrl,
    postedBy,
    createdAt,
    updatedAt,
  } = content;

  return (
    <div className="flex flex-col items-center py-8 gap-2 mt-24">
      {username === postedBy.username && (
        <button
          onClick={handleDelete}
          type="button"
          className="text-red-500 font-medium underline"
        >
          Delete
        </button>
      )}
      <div
        key={id}
        className="w-96 my-2 border-2 rounded-3xl p-8 flex flex-col gap-1"
      >
        <p>
          post by:{" "}
          <span className="font-bold text-xl">{postedBy.username}</span>
        </p>
        <ReactPlayer width={320} height={180} url={videoUrl} />
        <h2 className="text-xl font-medium">{videoTitle}</h2>
        <p>{creatorName}</p>
        {!editToggle && (
          <>
            <p className="text-slate-500">{comment}</p>
            <Rating
              style={{ maxWidth: 96 }}
              value={rating}
              readOnly={true}
              itemStyles={ratingStyle}
            />
          </>
        )}

        {editToggle && (
          <form onSubmit={handleEditSubmit}>
            <>
              <TextareaAutosize
                className="bg-slate-300 rounded-md"
                minRows={3}
                maxRows={6}
                style={{ width: "300px" }}
                value={newTextInput} // Bind the 'text' state to the value of the textarea
                onChange={(e) => {
                  setNewTextInput(e.target.value);
                  console.log(newTextInput);
                }}
              />
              <Rating
                style={{ maxWidth: 128 }}
                value={newStarInput}
                onChange={setNewStarInput}
              />
              <input
                className="button-grey my-2"
                type="Submit"
                value="Confirm"
              />
            </>
          </form>
        )}
      </div>
      {username === postedBy.username && (
        <>
          <button
            onClick={handleEditToggle}
            type="button"
            className={
              editToggle
                ? " bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-3 rounded w-32"
                : "button-grey"
            }
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default ContentDetail;
