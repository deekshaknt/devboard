// Pure functions: same input always gives the same output, so they are easy to test.

export function filterEvents(events, { query, category }) {
  const search = query.trim().toLowerCase(); // lowercase both sides = case-insensitive

  return events.filter((event) => {
    const matchesCategory = category === 'All' || event.category === category;

    const searchableText = [
      event.name,
      event.category,
      event.description,
      event.location,
      event.organizer,
      ...event.tags,
    ]
      .join(' ')
      .toLowerCase();

    const matchesSearch = search === '' || searchableText.includes(search);

    // Both must be true, so search and category always work together.
    return matchesCategory && matchesSearch;
  });
}

export function sortEvents(events, sort) {
  const sorted = [...events]; // copy so we never change the original array

  if (sort === 'date-desc') {
    sorted.sort((a, b) => b.date.localeCompare(a.date));
  } else if (sort === 'category') {
    sorted.sort((a, b) => a.category.localeCompare(b.category) || a.date.localeCompare(b.date));
  } else {
    sorted.sort((a, b) => a.date.localeCompare(b.date)); // 'date-asc' (default)
  }

  return sorted;
}
