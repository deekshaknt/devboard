import { h } from '../utils/dom.js';

// Built once so the search box keeps focus while you type.
export function FilterBar({ onSearch, onCategory, onSort }) {
  const searchInput = h('input', {
    id: 'search',
    class: 'input',
    type: 'search',
    placeholder: 'Search by name or keyword',
    autocomplete: 'off',
    oninput: (event) => onSearch(event.target.value),
  });

  const sortSelect = h('select', { id: 'sort', class: 'input', onchange: (event) => onSort(event.target.value) },
    h('option', { value: 'date-asc', text: 'Soonest first' }),
    h('option', { value: 'date-desc', text: 'Latest first' }),
    h('option', { value: 'category', text: 'By category' })
  );

  const chips = h('div', { class: 'chips', role: 'group', 'aria-label': 'Filter by category' });

  const element = h('div', { class: 'filters', role: 'search' },
    h('div', { class: 'field field--search' }, h('label', { for: 'search', text: 'Search events' }), searchInput),
    h('div', { class: 'field' }, h('label', { for: 'sort', text: 'Sort by' }), sortSelect),
    chips
  );

  function setCategories(categories) {
    chips.replaceChildren(
      ...categories.map((category) =>
        h('button', {
          class: 'chip',
          type: 'button',
          'data-category-chip': category,
          'aria-pressed': 'false',
          onclick: () => onCategory(category),
          text: category,
        })
      )
    );
  }

  function sync(state) {
    if (searchInput.value !== state.query) searchInput.value = state.query;
    sortSelect.value = state.sort;
    chips.querySelectorAll('.chip').forEach((chip) => {
      chip.setAttribute('aria-pressed', String(chip.dataset.categoryChip === state.category));
    });
  }

  return { element, setCategories, sync };
}
