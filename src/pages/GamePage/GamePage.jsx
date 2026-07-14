import { useState } from 'react';
import { GameHeader } from '../../components/GameHeader/GameHeader';
import { VictoryModal } from '../../components/VictoryModal/VictoryModal';
import { Button } from '../../components/Button/Button';
import { CatsGame } from '../../games/CatsGame/CatsGame';
import { CrystalGame } from '../../games/CrystalGame/CrystalGame';
import { FlowerGame } from '../../games/FlowerGame/FlowerGame';
import { ThreadsGame } from '../../games/ThreadsGame/ThreadsGame';
import { games } from '../../data/texts';
import { getProgress, isGameCompleted, saveLetter } from '../../progress';

const gameComponents = { ThreadsGame, FlowerGame, CatsGame, CrystalGame };

export function GamePage({ gameNumber, navigate }) {
  const game = games.find((item) => item.number === gameNumber);
  const [progress, setProgress] = useState(getProgress);
  const [victory, setVictory] = useState(null);

  if (!game) {
    return (
      <section className="page-card fade-up">
        <h1>Такого испытания нет</h1>
        <Button onClick={() => navigate('/')}>На главную</Button>
      </section>
    );
  }

  const CurrentGame = gameComponents[game.component];
  const completed = isGameCompleted(game.id, progress);

  const completeGame = (letter, modal = {}) => {
    const nextProgress = saveLetter(game.id, letter);
    setProgress(nextProgress);
    setVictory({ letter, ...modal });
  };

  const goNext = () => {
    if (victory) {
      localStorage.setItem(game.id, 'true');
      localStorage.setItem(`letter${game.number}`, victory.letter);
    }
    const nextGame = games.find((item) => !nextProgressHas(item.id));
    navigate(nextGame ? nextGame.path : '/final');
  };

  const nextProgressHas = (gameId) => Boolean(getProgress()[gameId]);

  return (
    <div className="game-page">
      <GameHeader game={game} completed={completed} />
      <CurrentGame game={game} onComplete={completeGame} />
      <Button variant="ghost" onClick={() => navigate('/')}>Вернуться на главную</Button>
      {victory && (
        <VictoryModal
          letter={victory.letter}
          title={victory.title}
          text={victory.text}
          onNext={goNext}
          nextLabel={game.number === 4 ? 'К финалу' : 'К следующему ключу'}
        />
      )}
    </div>
  );
}
