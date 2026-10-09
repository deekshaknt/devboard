// One shared object holds everything the UI needs. Change it with setState().
const FAVOURITES_KEY = 'devboard:favourites';

function loadFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVOURITES_KEY) || '[]');
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    return new Set();
  }
}

function saveFavourites(favourites) {
  try {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify([...favourites]));
  } catch {
    // Ignore: favourites still work for this visit.
  }
}

export const state = {
  events: [],
  status: 'loading', // 'loading' | 'ready' | 'error'
  query: '',
  category: 'All',
  sort: 'date-asc',
  view: 'browse', // 'browse' | 'saved'
  favourites: loadFavourites(), // a Set of event ids
  selectedId: null, // event shown in the details dialog
};

const listeners = new Set();

export function subscribe(listener) {
  listeners.add(listener);
}

export function setState(changes) {
  Object.assign(state, changes);
  listeners.forEach((listener) => listener(state));
}

// A Set can only hold each id once, so duplicates are impossible by design.
export function toggleFavourite(id) {
  const next = new Set(state.favourites);
  if (next.has(id)) next.delete(id);
  else next.add(id);

  saveFavourites(next);
  setState({ favourites: next });
}
