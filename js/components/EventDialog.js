import { h } from '../utils/dom.js';
import { formatLongDate } from '../utils/dates.js';
import { FavouriteButton } from './FavouriteButton.js';

// Content of the details pop-up. The <dialog> element itself lives in index.html.
export function EventDialog(event, { isFavourite, onToggleFavourite, onClose }) {
  const rows = [
    ['Date', formatLongDate(event.date)],
    ['Time', event.time],
    ['Location', `${event.location} (${event.mode})`],
    ['Hosted by', event.organizer],
  ];

  return h(
    'div',
    { class: 'dialog__inner', 'data-category': event.category },
    h('div', { class: 'dialog__head' },
      h('span', { class: 'badge', text: event.category }),
      h('button', { class: 'btn btn--small', type: 'button', onclick: onClose, text: 'Close' })
    ),
    h('h2', { id: 'dialog-title', class: 'dialog__title', text: event.name }),
    h('dl', { class: 'details' },
      rows.flatMap(([label, value]) => [h('dt', { text: label }), h('dd', { text: value })])
    ),
    h('p', { class: 'dialog__desc', text: event.description }),
    h('ul', { class: 'tags', 'aria-label': 'Topics' }, event.tags.map((tag) => h('li', { text: tag }))),
    h('div', { class: 'dialog__actions' },
      FavouriteButton({
        eventId: event.id,
        eventName: event.name,
        isFavourite,
        onClick: () => onToggleFavourite(event.id),
        withLabel: true,
      })
    )
  );
}
