import Button from "@mui/material/Button";
import Link from "../../Link";
import React from "react";

const FacebookLogin = () => {
  return (
    <Button
      component={Link}
      href={`${process.env.NEXT_PUBLIC_API_URL}/api/connect/facebook`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="inline w-4 h-4 mr-3 text-gray-900 fill-current"
        viewBox="0 0 48 48"
        width="48px"
        height="48px"
      >
        <path fill="#3f51b5" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z" />
        <path
          fill="#fff"
          d="M29.368,24H26v12h-5V24h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H30v4h-2.287 C26.104,16,26,16.6,26,17.723V20h4L29.368,24z"
        />
      </svg>
      Login via Facebook
    </Button>
  );
};

export default FacebookLogin;
