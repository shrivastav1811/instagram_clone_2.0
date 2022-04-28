import { useSession,signOut } from "next-auth/react";
import React from "react";

const Miniprofile = () => {

  const {data: session}= useSession();
  console.log(session)
  return (
    <>
      <div className="flex items-center justify-between mt-14 ml-10">
        <img
          src={session?.user?.image}
          className="h-16 w-16 rounded-full border  p-[2px]"
          alt=""
        />

        <div className="flex-1 mx-4">
          <h2 className="font-bold">{session?.user?.username}</h2>
          <h3 className="text-sm text-gray-400">Welcome To Instagram Community</h3>
        </div>

        <button onClick={signOut } className="font-semibold text-blue-400 text-sm">Sign Out</button>
      </div>
    </>
  );
};

export default Miniprofile;
