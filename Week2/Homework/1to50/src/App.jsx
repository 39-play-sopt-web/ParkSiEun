import { useState } from 'react';
import Header from './components/Header/Header';
import Game from './components/Game/Game';
import Ranking from './components/Ranking/Ranking';
import { useTimer } from './hooks/useTimer';

function App() {
  const [tab, setTab] = useState('game');
  const { time, start, stop, reset } = useTimer(); // 커스텀 훅 사용

  const handleTabChange = (nextTab) => {
    setTab(nextTab);
    reset();
  }

  const handleFinish = () => {
    const finalTime = stop();
    alert(`클리어! ${finalTime.toFixed(2)}초 걸렸어요!`);
  }

  return (
    <>
    <Header tab={tab} onTabChange={handleTabChange} time={time} />
    <main>
      {tab === 'game' ? <Game onStart={start} onFinish={handleFinish} /> : <Ranking />}
    </main>
    </>
  );
}

export default App;