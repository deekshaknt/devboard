import { h } from '../utils/dom.js';

// Built once. sync() only updates text and attributes, so keyboard focus is never lost.
export function Tabs({ onChange }) {
  const browseTab = h('button', { class: 'tab', type: 'button', onclick: () => onChange('browse'), text: 'All events' });
  const countEl = h('span', { class: 'tab__count', text: '0' });
  const savedTab = h('button', { class: 'tab', type: 'button', onclick: () => onChange('saved') }, 'Saved ', countEl);

  const element = h('nav', { class: 'tabs', 'aria-label': 'Event views' }, browseTab, savedTab);

  function sync(view, savedCount) {
    countEl.textContent = String(savedCount);
    for (const [tab, name] of [[browseTab, 'browse'], [savedTab, 'saved']]) {
      if (view === name) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
    }
  }

  return { element, sync };
}
