import { games } from './data/texts';

const STORAGE_KEY = 'fourKeysProgress';

export function getProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return typeof saved === 'object' && saved !== null ? saved : {};
  } catch {
    return {};
  }
}

export function saveLetter(gameId, letter) {
  const nextProgress = { ...getProgress(), [gameId]: letter };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));
  window.dispatchEvent(new CustomEvent('quest-progress-change'));
  return nextProgress;
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('quest-progress-change'));
}

export function isGameCompleted(gameId, progress = getProgress()) {
  return Boolean(progress[gameId]);
}

export function getCompletedLetters(progress = getProgress()) {
  return games.map((game) => progress[game.id]).filter(Boolean);
}

export function isQuestCompleted(progress = getProgress()) {
  return games.every((game) => progress[game.id] === game.letter);
}

export function getNextGame(progress = getProgress()) {
  return games.find((game) => !isGameCompleted(game.id, progress)) || null;
}
