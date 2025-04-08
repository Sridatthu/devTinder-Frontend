import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL+"/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      // TODO: handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length === 0)
    return (
      <div className="flex justify-center items-center h-40 text-center text-lg text-gray-400">
        No new users found!
      </div>
    );

  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8 my-10">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;
