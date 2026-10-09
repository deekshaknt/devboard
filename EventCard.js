import { h } from '../utils/dom.js';
import { formatLongDate, getDateParts } from '../utils/dates.js';
import { FavouriteButton } from './FavouriteButton.js';

export function EventCard(event, { isFavourite, onToggleFavourite, onOpen }) {
  const { day, month } = getDateParts(event.date);

  return h(
    'article',
    { class: 'card', 'data-category': event.category },
    // Decorative date block; the full date is available to screen readers below.
    h('div', { class: 'card__stub', 'aria-hidden': 'true' },
      h('span', { class: 'card__day', text: day }),
      h('span', { class: 'card__month', text: month })
    ),
    h('div', { class: 'card__body' },
      h('time', { class: 'sr-only', datetime: event.date, text: formatLongDate(event.date) }),
      h('div', { class: 'card__head' },
        h('span', { class: 'badge', text: event.category }),
        FavouriteButton({
          eventId: event.id,
          eventName: event.name,
          isFavourite,
          onClick: () => onToggleFavourite(event.id),
        })
      ),
      h('h3', { class: 'card__title', text: event.name }),
      h('p', { class: 'card__meta', text: event.time }),
      h('p', { class: 'card__meta', text: `${event.location} (${event.mode})` }),
      h('p', { class: 'card__desc', text: event.description }),
      h('button', {
        class: 'btn',
        type: 'button',
        'data-open-id': event.id,
        'aria-label': `View details for ${event.name}`,
        onclick: () => onOpen(event.id),
        text: 'View details',
      })
    )
  );
}
