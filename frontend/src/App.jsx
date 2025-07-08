import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';

import { setOnlineUsers, setSocket, setUserData } from './redux/userSlice';
import { serverUrl } from './main';
import getOtherUsers from './customhooks/getOtherUsers'; // ✅ Custom hook

function App() {
  const dispatch = useDispatch();
  const { userData, socket } = useSelector((state) => state.user);

  // ✅ Load other users using custom hook
  getOtherUsers();

  // ✅ Establish and clean up socket connection
  useEffect(() => {
    if (userData) {
      const socketio = io(serverUrl, {
        query: { userId: userData._id },
        withCredentials: true,
      });

      dispatch(setSocket(socketio));

      socketio.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      return () => socketio.close();
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [userData]);

  // ✅ Get current user on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(res.data));
      } catch (err) {
        console.log("Error fetching current user", err?.response?.data || err.message);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/profile" />} />
      <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/signup" />} />
    </Routes>
  );
}

export default App;
