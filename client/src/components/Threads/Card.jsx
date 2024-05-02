import React from "react";

function Card({ data }) {
  return (
    <div
      className="h-auto text-white bg-[#2e2e2e] mt-4 p-2 mx-4 flex flex-col md:flex-row rounded-md shadow-2xl hover-scale"
      style={{ boxShadow: "5px 5px 0px 0px #FF0000" }}
    >
      <div className="flex-1">
        <a
          href={`https://www.reddit.com${data.permalink}`}
          target="_blank"
          className="text-2xl text-[#FF0000]  mb-2 underline font-semibold"
        >
          {data.title}
        </a>
        <h1 className="text-xl my-2 font-mono">Author: u/{data.author}</h1>
        {data.selftext.length <= 1000 && (
          <p className="font-mono">{data.selftext ? (data.selftext.split(" ").slice(0, 80).join(" ")):""}</p>
        )}
      </div>
      <div className="flex">
        <img
          className="object-cover p-2"
          src={
            data.thumbnail &&
            (data.thumbnail.endsWith(".jpg") ||
              data.thumbnail.endsWith(".png") ||
              data.thumbnail.endsWith(".gif"))
              ? `${data.thumbnail}`
              : "https://i1.feedspot.com/200/4432117.jpg?t=1610374398"
          }
          style={{ width: "200px", height: "200px", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}

export default Card;
