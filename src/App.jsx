import React, { useState } from 'react';
import Video from './components/Video';
import WeddingHome from './components/WeddingHome';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isIntroEnding, setIsIntroEnding] = useState(false);

  const handleStartTransition = () => {
    setIsIntroEnding(true);
  };

  const handleCompleteIntro = () => {
    setShowIntro(false);
    setIsIntroEnding(false);
  };

  const handleReplayIntro = () => {
    setIsIntroEnding(false);
    setShowIntro(true);
  };

  return (
    <main className="app-container">
      {/* WeddingHome is rendered underneath Video so all assets are pre-rendered */}
      <WeddingHome
        onReplayIntro={handleReplayIntro}
        isIntroActive={showIntro && !isIntroEnding}
      />

      {showIntro && (
        <Video
          isExiting={isIntroEnding}
          onStartTransition={handleStartTransition}
          onComplete={handleCompleteIntro}
        />
      )}
    </main>
  );
}

export default App;
