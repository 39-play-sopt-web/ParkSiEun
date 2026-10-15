import { useState } from 'react';
import Header from './components/Header/Header';
import Game from './components/Game/Game';
import Ranking from './components/Ranking/Ranking';
import { useTimer } from './hooks/useTimer';
import { saveRecord } from './utils/storage';

const LEVEL = 1;

function App() {
  const [tab, setTab] = useState('game');
  const { time, start, stop, reset } = useTimer(); // 커스텀 훅 사용
  const [gameKey, setGameKey] = useState(0);

  const handleTabChange = (nextTab) => {
    setTab(nextTab);
    reset();
  }

  const restart = () => {
    reset();
    setGameKey((prev) => prev + 1);
  };

  const handleFinish = () => {
    const finalTime = stop();
    saveRecord({ level: LEVEL, time: finalTime, playedAt: Date.now() });
    alert(`클리어! ${finalTime.toFixed(2)}초 걸렸어요!`);
    restart();
  }

  return (
    <>
    <Header tab={tab} onTabChange={handleTabChange} time={time} />
    <main>
      {tab === 'game' ? <Game key={gameKey} onStart={start} onFinish={handleFinish} /> : <Ranking />}
    </main>
    </>
  );
}

export default App;