import { h } from '../utils/dom.js';

// One component for every empty / error / no-results screen.
export function StateMessage({ title, text, actionLabel, onAction }) {
  return h(
    'div',
    { class: 'state' },
    h('h2', { class: 'state__title', text: title }),
    h('p', { class: 'state__text', text }),
    actionLabel ? h('button', { class: 'btn btn--primary', type: 'button', onclick: onAction, text: actionLabel }) : null
  );
}
