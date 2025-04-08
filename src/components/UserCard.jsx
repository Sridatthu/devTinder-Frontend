import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useLocation } from "react-router-dom";

const UserCard = ({ user }) => {
  const [tool, setTool] = useState(true);
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const location = useLocation();

  // UseEffect to check if we are on /profile route
  useEffect(() => {
    if (location.pathname === "/profile") {
      setTool(false); // or true depending on your logic
    } else {
      setTool(true);
    }
  }, [location.pathname]); // dependency ensures it runs on route change

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      // Handle error here if needed
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-base-300 rounded-xl shadow-md overflow-hidden">
      <div className="w-full h-60 sm:h-72 overflow-hidden">
        <img
          src={photoUrl}
          alt={`${firstName}'s photo`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 sm:p-6 text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-1">
          {firstName + " " + lastName}
        </h2>
        {age && gender && (
          <p className="text-sm text-gray-400 mb-1">
            {age}, {gender}
          </p>
        )}
        <p className="text-sm text-gray-200 mb-4">{about}</p>
        {tool && (
          <div className="flex flex-col sm:flex-row justify-center gap-2 mt-2">
            <button
              className="btn btn-outline btn-error btn-sm sm:btn-md"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-outline btn-success btn-sm sm:btn-md"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
