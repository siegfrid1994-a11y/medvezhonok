import { Button } from '../../components/Button/Button';
import { finalText, games } from '../../data/texts';
import { getProgress, isQuestCompleted, resetProgress } from '../../progress';

export function FinalPage({ navigate }) {
  const progress = getProgress();
  const completed = isQuestCompleted(progress);
  const code = games.map((game) => progress[game.id] || '•').join('');

  const restart = () => {
    resetProgress();
    navigate('/');
  };

  return (
    <section className="final page-card fade-up">
      <p className="eyebrow">Финал</p>
      <h1>{completed ? finalText.title : 'Не все ключи найдены'}</h1>
      <p>{completed ? finalText.subtitle : 'Вернись к испытаниям и собери недостающие буквы.'}</p>
      <div className="code-word glow" aria-label="Кодовое слово">{code}</div>
      <div className="actions-row">
        <Button onClick={() => navigate(completed ? '/' : games.find((game) => !progress[game.id])?.path || '/') }>
          {completed ? 'На главную' : 'Продолжить квест'}
        </Button>
        <Button variant="ghost" onClick={restart}>Начать заново</Button>
      </div>
    </section>
  );
}
