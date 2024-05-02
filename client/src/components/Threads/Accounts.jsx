import React from "react";

function Accounts({ accounts }) {
  const imageUrl = accounts.community_icon || "https://b.thumbs.redditmedia.com/uUkSuTDpTWhU4mW5-OXzca_pVR0RQKHkEq-x_eCQC9I.png";
  const pngIndex = imageUrl.indexOf(".png");
  const jpgIndex = imageUrl.indexOf(".jpg");
  const jpegIndex = imageUrl.indexOf(".jpeg");
  let filteredUrl = imageUrl;

  if (pngIndex !== -1) {
    filteredUrl = imageUrl.split(".png")[0] + ".png";
  } else if (jpgIndex !== -1) {
    filteredUrl = imageUrl.split(".jpg")[0] + ".jpg";
  } else if (jpegIndex !== -1) {
    filteredUrl = imageUrl.split(".jpeg")[0] + ".jpeg";
  }
  return (
    <div
      style={{ borderColor: accounts.banner_background_color || "#FF0000" }}
      className="h-auto text-white bg-[#2e2e2e] mt-4 p-2 mx-4 flex flex-row rounded-md border-b-4"
    >
      <img src={filteredUrl} style={{ width: "50px", height: "50px" }} />
      <a
        href={`https://www.reddit.com${accounts.url}`}
        className="text-md font-bold font-mono p-4 hover:underline hover:underline-offset-2"
        target="_blank"
      >
        {accounts.display_name_prefixed}
      </a>
    </div>
  );
}

export default Accounts;
