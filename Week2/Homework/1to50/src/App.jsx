import { useState } from 'react';
import Header from './components/Header/Header';
import Game from './components/Game/Game';
import Ranking from './components/Ranking/Ranking';
import { useTimer } from './hooks/useTimer';
import { saveRecord } from './utils/storage';
import ResultModal from './components/ResultModal/ResultModal';

function App() {
  const [tab, setTab] = useState('game');
  const { time, start, stop, reset } = useTimer(); // 커스텀 훅 사용
  const [gameKey, setGameKey] = useState(0);
  const [level, setLevel] = useState(1);
  const [result, setResult] = useState(null);

  const handleTabChange = (nextTab) => {
    setTab(nextTab);
    reset();
  };

  const restart = () => {
    reset();
    setGameKey((prev) => prev + 1);
  };

  const handleLevelChange = (nextLevel) => {
    setLevel(nextLevel);
    restart();
  };

  // 게임 종료 -> 기록 저장 후 결과 모달 열기
  const handleFinish = () => {
    const finalTime = stop();
    saveRecord({ level: level, time: finalTime, playedAt: Date.now() });
    setResult({ level, time: finalTime });
  };

  // 모달 닫고 새 게임 시작
  const handleCloseModal = () => {
    setResult(null);
    restart();
  };

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
    {result && <ResultModal level={result.level} time={result.time} onClose={handleCloseModal} />}
    </>
  );
}

export default App;