import React, { FC, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import './styles.scss';

const App: FC = () => {

  useEffect(() => {
    const socket = socketIOClient(process.env.SOCKET_ENDPOINT as string);
    socket.on('from', (data) => console.log(data));

    return () => {
      socket.disconnect();
    };
  }, []);

  return <h1>socket app</h1>;
};

export default App;
