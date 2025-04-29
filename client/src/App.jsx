import React from 'react';
import Sidebar from './component/Sidebar';
import Main from './component/Main';
import ContextProvider from './context/Context';

function App() {
  return (
    <ContextProvider>
      <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
        <Sidebar />
        <Main />
      </div>
    </ContextProvider>
  );
}

export default App;