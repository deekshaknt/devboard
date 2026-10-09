import { h } from '../utils/dom.js';
import { EventCard } from './EventCard.js';

export function EventList(events, { favourites, onToggleFavourite, onOpen }) {
  return h(
    'ul',
    { class: 'event-grid' },
    events.map((event) =>
      h('li', {},
        EventCard(event, {
          isFavourite: favourites.has(event.id),
          onToggleFavourite,
          onOpen,
        })
      )
    )
  );
}
