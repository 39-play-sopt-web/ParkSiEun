import { useState } from 'react';
import Header from './components/Header/Header';
import Game from './components/Game/Game';
import Ranking from './components/Ranking/Ranking';

export default function App() {
  const [tab, setTab] = useState('game');

  return (
    <>
      <Header tab={tab} onTabChange={setTab} />
      <main>
        {tab === 'game' ? <Game /> : <Ranking />}
      </main>
    </>
  );
}