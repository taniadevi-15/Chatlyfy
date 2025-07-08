import React from 'react';
import SideBar from '../components/SideBar';
import MessageArea from '../components/MessageArea';
import getMessage from '../customhooks/getMessages';

function Home() {
  getMessage();

  return (
    <div className="w-full h-screen flex bg-gradient-to-br from-sky-200 via-blue-100 to-cyan-200 dark:from-zinc-900 dark:to-zinc-800 transition-all">
      <SideBar />
      <MessageArea />
    </div>
  );
}

export default Home;
