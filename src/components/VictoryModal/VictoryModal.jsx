import { Button } from '../Button/Button';

export function VictoryModal({ letter, onNext, nextLabel = 'Продолжить' }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Ключ найден">
      <div className="victory-modal fade-up">
        <div className="particles" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => (
            <span key={index} style={{ '--i': index }} />
          ))}
        </div>
        <p className="eyebrow">Ключ найден</p>
        <div className="victory-letter glow">{letter}</div>
        <p>Эта буква сохранена. Ещё один шаг — и тайна станет ближе.</p>
        <Button onClick={onNext}>{nextLabel}</Button>
      </div>
    </div>
  );
}
