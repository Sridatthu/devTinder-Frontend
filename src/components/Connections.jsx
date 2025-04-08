import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return <h1 className="text-center mt-10 text-lg">No Connections Found</h1>;

  return (
    <div className="my-10 px-4">
      <h1 className="text-center text-3xl font-bold text-white mb-6">
        Connections
      </h1>

      <div className="flex flex-col gap-4 items-center">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="w-full max-w-2xl bg-base-300 p-4 rounded-lg flex flex-col sm:flex-row items-center text-center sm:text-left shadow-md"
            >
              <img
                alt="profile"
                className="w-20 h-20 rounded-full object-cover mb-2 sm:mb-0"
                src={photoUrl}
              />
              <div className="sm:ml-4">
                <h2 className="font-bold text-xl">{firstName} {lastName}</h2>
                {age && gender && <p className="text-sm">{age}, {gender}</p>}
                <p className="text-sm">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
