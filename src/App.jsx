import React, { useState } from 'react';
import Video from './components/Video';
import WeddingHome from './components/WeddingHome';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="app-container">
      {showIntro ? (
        <Video onComplete={() => setShowIntro(false)} />
      ) : (
        <WeddingHome onReplayIntro={() => setShowIntro(true)} />
      )}
    </main>
  );
}

export default App;
