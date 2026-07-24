const STORAGE_KEY = "rainboard-history";
const MAX = 8;

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function save(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function addToHistory(city) {
  const list = load();
  const filtered = list.filter((c) => c.toLowerCase() !== city.toLowerCase());
  filtered.unshift(city);
  if (filtered.length > MAX) filtered.pop();
  save(filtered);
}

export function removeFromHistory(city) {
  const list = load().filter((c) => c !== city);
  save(list);
  return list;
}

export function getHistory() {
  return load();
}
