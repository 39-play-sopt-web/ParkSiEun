import { useState } from 'react';
import Header from './components/Header/Header';
import Game from './components/Game/Game';
import Ranking from './components/Ranking/Ranking';
import { useTimer } from './hooks/useTimer';
import { saveRecord } from './utils/storage';

function App() {
  const [tab, setTab] = useState('game');
  const { time, start, stop, reset } = useTimer(); // 커스텀 훅 사용
  const [gameKey, setGameKey] = useState(0);
  const [level, setLevel] = useState(1);

  const handleTabChange = (nextTab) => {
    setTab(nextTab);
    reset();
  }

  const restart = () => {
    reset();
    setGameKey((prev) => prev + 1);
  };

  const handleLevelChange = (nextLevel) => {
    setLevel(nextLevel);
    restart();
  }

  const handleFinish = () => {
    const finalTime = stop();
    saveRecord({ level: level, time: finalTime, playedAt: Date.now() });
    alert(`클리어! ${finalTime.toFixed(2)}초 걸렸어요!`);
    restart();
  }

  return (
    <>
    <Header tab={tab}
    onTabChange={handleTabChange}
    time={time}
    level={level}
    onLevelChange={handleLevelChange}
    />
    <main>
      {tab === 'game' ? <Game key={gameKey} level={level} onStart={start} onFinish={handleFinish} /> : <Ranking />}
    </main>
    </>
  );
}

export default App;