import { state, setState, subscribe, toggleFavourite } from './state.js';
import { fetchEvents } from './data/events.js';
import { filterEvents, sortEvents } from './utils/filters.js';
import { initThemeToggle } from './utils/theme.js';
import { Tabs } from './components/Tabs.js';
import { FilterBar } from './components/FilterBar.js';
import { EventList } from './components/EventList.js';
import { SkeletonList } from './components/SkeletonList.js';
import { StateMessage } from './components/StateMessage.js';
import { EventDialog } from './components/EventDialog.js';

const $ = (selector) => document.querySelector(selector);
const tabsSlot = $('#tabs-slot');
const filtersSlot = $('#filters-slot');
const statusEl = $('#status');
const contentEl = $('#content');
const dialogEl = $('#event-dialog');

// ---------- Build the parts that never get replaced ----------
const tabs = Tabs({ onChange: (view) => setState({ view }) });
const filterBar = FilterBar({
  onSearch: (query) => setState({ query }),
  onCategory: (category) => setState({ category }),
  onSort: (sort) => setState({ sort }),
});
tabsSlot.append(tabs.element);
filtersSlot.append(filterBar.element);
initThemeToggle($('#theme-toggle'));

const listActions = {
  onToggleFavourite: toggleFavourite,
  onOpen: (id) => setState({ selectedId: id }),
};

function clearFilters() {
  setState({ query: '', category: 'All' });
}

// ---------- Decide what to show in the main area ----------
function buildContent(filtered, savedEvents) {
  if (state.status === 'loading') return SkeletonList();

  if (state.status === 'error') {
    return StateMessage({
      title: 'Events could not be loaded',
      text: 'Check your internet connection and try again.',
      actionLabel: 'Try again',
      onAction: loadEvents,
    });
  }

  const listProps = { favourites: state.favourites, ...listActions };

  if (state.view === 'saved') {
    if (savedEvents.length === 0) {
      return StateMessage({
        title: 'No saved events yet',
        text: 'Tap the heart on any event to keep it here.',
        actionLabel: 'Browse events',
        onAction: () => setState({ view: 'browse' }),
      });
    }
    return EventList(savedEvents, listProps);
  }

  if (filtered.length === 0) {
    return StateMessage({
      title: 'No events match your search',
      text: 'Try a different keyword or category.',
      actionLabel: 'Clear filters',
      onAction: clearFilters,
    });
  }

  return EventList(filtered, listProps);
}

function getStatusText(filtered, savedEvents) {
  if (state.status === 'loading') return 'Loading events…';
  if (state.status === 'error') return '';
  if (state.view === 'saved') {
    return `${savedEvents.length} saved ${savedEvents.length === 1 ? 'event' : 'events'}`;
  }
  return `Showing ${filtered.length} of ${state.events.length} events`;
}

// ---------- Details dialog ----------
let lastOpenedId = null;

function renderDialog() {
  const event = state.events.find((item) => item.id === state.selectedId);

  if (!event) {
    if (dialogEl.open) dialogEl.close();
    return;
  }

  lastOpenedId = event.id;
  dialogEl.replaceChildren(
    EventDialog(event, {
      isFavourite: state.favourites.has(event.id),
      onToggleFavourite: toggleFavourite,
      onClose: () => dialogEl.close(),
    })
  );
  if (!dialogEl.open) dialogEl.showModal();
}

// Fires for the Close button, the Escape key, and clicks on the backdrop.
dialogEl.addEventListener('close', () => {
  if (state.selectedId !== null) setState({ selectedId: null });
  // Give focus back to the button that opened the dialog.
  contentEl.querySelector(`[data-open-id="${lastOpenedId}"]`)?.focus();
});

dialogEl.addEventListener('click', (event) => {
  if (event.target === dialogEl) dialogEl.close();
});

// ---------- Draw everything from the current state ----------
function render() {
  // Remember which heart had focus, because we are about to rebuild the list.
  const active = document.activeElement;
  const focusedFavId = active?.dataset?.favId;
  const focusScope = dialogEl.contains(active) ? dialogEl : contentEl;

  const filtered = sortEvents(filterEvents(state.events, state), state.sort);
  const savedEvents = sortEvents(state.events.filter((event) => state.favourites.has(event.id)), 'date-asc');
  const ready = state.status === 'ready';

  tabs.sync(state.view, ready ? savedEvents.length : state.favourites.size);
  filterBar.sync(state);
  filtersSlot.hidden = !(ready && state.view === 'browse');

  statusEl.textContent = getStatusText(filtered, savedEvents);
  contentEl.replaceChildren(buildContent(filtered, savedEvents));
  renderDialog();

  if (focusedFavId) {
    focusScope.querySelector(`[data-fav-id="${focusedFavId}"]`)?.focus();
  }
}

// ---------- Load data ----------
async function loadEvents() {
  setState({ status: 'loading' });
  try {
    const events = await fetchEvents();
    filterBar.setCategories(['All', ...new Set(events.map((event) => event.category))]);
    setState({ events, status: 'ready' });
  } catch {
    setState({ status: 'error' });
  }
}

subscribe(render);
render();
loadEvents();
