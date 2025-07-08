// src/hooks/useOtherUsers.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../main";
import { setOtherUsers } from "../redux/userSlice";

const getOtherUsers = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/user/others`, {
          withCredentials: true, // Important for sending cookies
        });
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.error("Error fetching other users:", error?.response?.data || error.message);
      }
    };

    if (userData) fetchUsers();
  }, [userData, dispatch]);
};

export default getOtherUsers;
