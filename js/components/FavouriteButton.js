import { h } from '../utils/dom.js';

// Used on every card and inside the details dialog.
export function FavouriteButton({ eventId, eventName, isFavourite, onClick, withLabel = false }) {
  return h(
    'button',
    {
      class: `fav-btn${withLabel ? ' fav-btn--labelled' : ''}${isFavourite ? ' is-active' : ''}`,
      type: 'button',
      'data-fav-id': eventId,
      // The icon-only version needs a name and a pressed state for screen readers.
      'aria-label': withLabel ? null : `Save ${eventName}`,
      'aria-pressed': withLabel ? null : String(isFavourite),
      onclick: onClick,
    },
    h('span', { 'aria-hidden': 'true', text: isFavourite ? '♥' : '♡' }),
    withLabel ? h('span', { text: isFavourite ? 'Saved' : 'Save event' }) : null
  );
}
