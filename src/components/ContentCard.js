import React from "react";
import useData from "../hooks/useData";
import { Link } from "react-router-dom";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";

const ContentCard = () => {
  const ratingStyle = {
    itemShapes: ThinRoundedStar,
    activeFillColor: "#3d4c63",
    inactiveFillColor: "#aeb5bf",
  };
  const { data, setData } = useData();
  if (!data) {
    // Render loading state or return null
    return <p className="">Loading...</p>;
  }
  return (
    <div className="flex flex-row flex-wrap justify-center gap-4 my-16">
      {data &&
        data.map((d) => {
          const {
            id,
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
          } = d;
          return (
            <div
              key={id}
              className="w-80 h-auto overflow-hidden border-2 rounded-xl"
            >
              {" "}
              <Link to={`/content/${id}`}>
                <img src={thumbnailUrl}></img>
                {/* <ReactPlayer width={320} height={180} url={videoUrl} /> */}
                <div className="flex flex-col justify-between p-4">
                  <div className="h-32">
                    <h2 className="text-xl font-bold">{videoTitle}</h2>
                    <p>{creatorName}</p>
                    <p className="text-slate-500">{comment}</p>
                  </div>
                  <div className="flex flex-row justify-between pt-12">
                    <p>{postedBy.username}</p>
                    <Rating
                      style={{ maxWidth: 96 }}
                      value={rating}
                      readOnly={true}
                      itemStyles={ratingStyle}
                    />
                  </div>
                </div>{" "}
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default ContentCard;
