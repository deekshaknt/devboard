import { h } from '../utils/dom.js';

// Grey placeholder cards shown while events load.
export function SkeletonList(count = 6) {
  return h(
    'ul',
    { class: 'event-grid', 'aria-hidden': 'true' },
    Array.from({ length: count }, () =>
      h('li', {},
        h('div', { class: 'card card--skeleton' },
          h('div', { class: 'card__stub' }),
          h('div', { class: 'card__body' },
            h('div', { class: 'skeleton-line skeleton-line--short' }),
            h('div', { class: 'skeleton-line' }),
            h('div', { class: 'skeleton-line' }),
            h('div', { class: 'skeleton-line skeleton-line--mid' })
          )
        )
      )
    )
  );
}
