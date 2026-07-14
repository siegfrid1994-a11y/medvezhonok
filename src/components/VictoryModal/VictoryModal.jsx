import { Button } from '../Button/Button';

export function VictoryModal({ letter, title = 'Ключ найден', text = 'Эта буква сохранена. Ещё один шаг — и тайна станет ближе.', onNext, nextLabel = 'Продолжить' }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Ключ найден">
      <div className="victory-modal fade-up">
        <div className="particles" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => (
            <span key={index} style={{ '--i': index }} />
          ))}
        </div>
        <p className="eyebrow">Ключ найден</p>
        <h2>{title}</h2>
        <div className="victory-letter glow">{letter}</div>
        <p>{text}</p>
        <Button onClick={onNext}>{nextLabel}</Button>
      </div>
    </div>
  );
}
